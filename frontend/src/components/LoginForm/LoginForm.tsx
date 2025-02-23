import { useRef } from "react";
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

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
	onSubmitLogin: ({
		email,
		password,
	}: {
		email: string | null;
		password: string | null;
	}) => void;
	onShowSignupForm: () => void;
}

export function LoginForm({
	className,
	onSubmitLogin,
	onShowSignupForm,
	...props
}: LoginFormProps) {
	const loginInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");
		console.log("onSubmitLogin", onSubmitLogin)
		onSubmitLogin({ email: email as string, password: password as string });
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									ref={loginInputRef}
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									ref={passwordInputRef}
									id="password"
									name="password"
									type="password"
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<a
								href="#"
								className="underline underline-offset-4"
								onClick={() => onShowSignupForm()}
							>
								Sign up
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
