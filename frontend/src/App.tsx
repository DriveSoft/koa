import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/LoginForm/LoginForm";

const GET_USERS = gql(/* GraphQL */ `
	query Users {
		users {
			id
			firstName
			lastName
			email
			dob
		}
	}
`);

function App() {
	const { loading, error, data } = useQuery(GET_USERS);
	console.log("data", data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<LoginForm />
				</DialogContent>
			</Dialog>

			{data &&
				data.users.map((user) => (
					<div>{`${user.firstName} ${user.lastName} `}</div>
				))}
		</>
	);
}

export default App;
