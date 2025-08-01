import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site-config";
import { getOrdersByEmail } from "@/lib/lemonsqueezy";
import { logger } from "@/lib/logger";
import { auth } from "@/server/auth";
import { getLatestReleaseFile } from "@/server/services/github/github-download-service";

/**
 * Route handler for file downloads.
 * Streams the file directly to the client using Node.js streams.
 *
 * @param request - The incoming request
 * @returns NextResponse with the file stream or a redirect
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const email = searchParams.get("email");
	const orderId = searchParams.get("orderId");
	const session = await auth();

	if (!email && !orderId && !session?.user?.id) {
		logger.warn("Invalid download request");
		return NextResponse.redirect(new URL(routes.auth.signIn, siteConfig.url));
	}

	if (email && orderId) {
		const orders = await getOrdersByEmail(email as string);
		const order = orders?.find((order) => order.attributes.identifier === orderId);

		if (!order) {
			logger.warn("Invalid order");
			return NextResponse.redirect(new URL(routes.auth.signIn, siteConfig.url));
		}

		if (order.attributes.status !== "paid") {
			logger.warn("Order is not paid");
			return NextResponse.redirect(new URL(routes.auth.signIn, siteConfig.url));
		}
	} else if (!session?.user?.id) {
		logger.warn("Unauthorized download attempt");
		return NextResponse.redirect(new URL(routes.auth.signIn, siteConfig.url));
	}

	try {
		const filePath = await getLatestReleaseFile();
		const stats = await stat(filePath);

		// Create a ReadableStream from the file stream
		const stream = createReadStream(filePath);
		const readableStream = new ReadableStream({
			start(controller) {
				stream.on("data", (chunk: string | Buffer) => {
					controller.enqueue(chunk);
				});
				stream.on("end", () => controller.close());
				stream.on("error", (error) => controller.error(error));
			},
			cancel() {
				stream.destroy();
			},
		});

		// Return the file as a response
		return new NextResponse(readableStream, {
			headers: {
				"Content-Type": "application/zip",
				"Content-Length": stats.size.toString(),
				"Content-Disposition": `attachment; filename="shipkit.zip"`,
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		logger.error("Error serving download", {
			error,
			userId: session?.user?.id,
		});

		return NextResponse.redirect(new URL(`${routes.docs}?error=download-failed`, siteConfig.url));
	}
}
