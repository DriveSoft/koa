import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupFormProps extends React.ComponentPropsWithoutRef<"div"> {
	onShowLoginForm: () => void;
}

export function SignupForm({
	className,
	onShowLoginForm,
	...props
}: SignupFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign up</CardTitle>
					<CardDescription>
						Enter your email and password below to Signup
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>

								</div>
								<Input id="password" type="password" required />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password2">One more time</Label>

								</div>
								<Input id="password2" type="password" required />
							</div>							
							<Button type="submit" className="w-full">
								Sign up
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Have an account?{" "}
							<a
								href="#"
								className="underline underline-offset-4"
								onClick={() => onShowLoginForm()}
							>
								Login
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
