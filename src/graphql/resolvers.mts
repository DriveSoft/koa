import { GraphQLError } from "graphql"; //ExpressContext
import { addContact, getUser, getUserContact, getUsers, login, registerUser } from "../controllers/users.controller.mjs";

export const resolvers = {
	Query: {
		users: async (parent: any, args: any, context: any, info: any) => {
			// if (!context?.user?.id) {
			// 	throw new GraphQLError('Protected', {
			// 		extensions: {
			// 			code: 'UNAUTHENTICATED',
			// 		}
			// 	});
			// }
			return await getUsers();
		},
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
		login: async (_: any, args: any, context: any) => {
			const { email, password } = args;
			const loginResult = await login(email, password);

			context.res.cookie('refreshToken', loginResult.refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 1000 * 60 * 60 * 24 * 30 // 7 days
			});

			return {
				user: loginResult.user,
				accessToken: loginResult.accessToken
			}
		}
	},

	User: {
		contacts: (parent: any) => {
			return getUserContact(parent.id)
		}
	}

};

