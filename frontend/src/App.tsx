import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";

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
			{data && data.users.map((user) => (
				<div>{`${user.firstName} ${user.lastName} `}</div>
			))}
		</>
	);
}

export default App;
