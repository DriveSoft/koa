import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { SignupForm } from "@/components/SignupForm/SignupForm";
import { TableUsers } from "@/components/TableUsers/TableUsers";



function App() {
	const [openedDialog, setOpenedDialog] = useState<"LOGIN" | "SIGNUP" | null>(
		null
	);

	return (
		<>
			<div className="flex justify-center items-center w-full h-screen">
				<div className="p-1 basis-full sm:basis-1/2">
					<TableUsers />
				</div>

				{/* <Dialog
					open={openedDialog === "SIGNUP"}
					onOpenChange={(open) =>
						open ? setOpenedDialog("SIGNUP") : setOpenedDialog(null)
					}
				>
					<DialogTrigger>Open</DialogTrigger>
					<DialogContent>
						<SignupForm
							onShowLoginForm={() => setOpenedDialog("LOGIN")}
						/>
					</DialogContent>
				</Dialog>

				<Dialog
					open={openedDialog === "LOGIN"}
					onOpenChange={(open) =>
						open ? setOpenedDialog("LOGIN") : setOpenedDialog(null)
					}
				>
					<DialogTrigger>Open</DialogTrigger>
					<DialogContent>
						<LoginForm
							onShowSignupForm={() => setOpenedDialog("SIGNUP")}
						/>
					</DialogContent>
				</Dialog> */}
			</div>

			{/* {data &&
				data.users.map((user) => (
					<div>{`${user.firstName} ${user.lastName} `}</div>
				))} */}
		</>
	);
}

export default App;
