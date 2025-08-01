"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function DemoShareDocument() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Share this document</CardTitle>
				<CardDescription>Anyone with the link can view this document.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex space-x-2">
					<Input value="http://example.com/link/to/document" readOnly />
					<Button variant="secondary" className="shrink-0">
						Copy Link
					</Button>
				</div>
				<Separator className="my-4" />
				<div className="space-y-4">
					<div className="text-sm font-medium">People with access</div>
					<div className="grid gap-6">
						<div className="flex items-center justify-between space-x-4">
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/03.png" />
									<AvatarFallback>OM</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium leading-none">Olivia Martin</p>
									<p className="text-sm text-muted-foreground">m@example.com</p>
								</div>
							</div>
							<Select defaultValue="edit">
								<SelectTrigger className="ml-auto w-[110px]">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="edit">Can edit</SelectItem>
									<SelectItem value="view">Can view</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between space-x-4">
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/05.png" />
									<AvatarFallback>IN</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium leading-none">Isabella Nguyen</p>
									<p className="text-sm text-muted-foreground">b@example.com</p>
								</div>
							</div>
							<Select defaultValue="view">
								<SelectTrigger className="ml-auto w-[110px]">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="edit">Can edit</SelectItem>
									<SelectItem value="view">Can view</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between space-x-4">
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/01.png" />
									<AvatarFallback>SD</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium leading-none">Sofia Davis</p>
									<p className="text-sm text-muted-foreground">p@example.com</p>
								</div>
							</div>
							<Select defaultValue="view">
								<SelectTrigger className="ml-auto w-[110px]">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="edit">Can edit</SelectItem>
									<SelectItem value="view">Can view</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
