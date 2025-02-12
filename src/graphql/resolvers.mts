import { addContact, getUser, getUserContact, getUsers, login, registerUser } from "../controllers/users.controller.mjs";

export const resolvers = {
	Query: {
		users: async () => await getUsers(),
		user: async (parent: any, args: any, context: any, info: any) => {
			return await getUser(args.id)
		},
		contacts: async () => await getUsers(),
		contact: async (parent: any, args: any, context: any, info: any) => {
			return await getUser(args.id)
		}		
	},

	Mutation: {
		createUser: async (_: any, args: any, context: any) => {
			return await registerUser(args.input);
		},
		createContact: async (_: any, args: any, context: any) => {
			return await addContact(args.input);
		},
		login: async (_: any, args: any) => {
			const { email, password } = args;
			return await login(email, password);
		}			
	},

	User: {
		contacts: (parent: any) => {
			return getUserContact(parent.id)
		}
	}

};

