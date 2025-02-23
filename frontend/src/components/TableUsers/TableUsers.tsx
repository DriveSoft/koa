import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { gql } from "../../../src/__generated__/gql";
import { useQuery } from "@apollo/client";

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

export function TableUsers() {
   const { loading, error, data } = useQuery(GET_USERS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;   

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">ID</TableHead>
					<TableHead>Firstname</TableHead>
					<TableHead>Lastname</TableHead>
					<TableHead>Email</TableHead>
               <TableHead>DOB</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data && data.users.map((user) => (
					<TableRow key={user.id}>
						<TableCell className="font-medium">
							{user.id}
						</TableCell>
						<TableCell>{user.firstName}</TableCell>
						<TableCell>{user.lastName}</TableCell>
						<TableCell>{user.email}</TableCell>
                  <TableCell>{user.dob}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
