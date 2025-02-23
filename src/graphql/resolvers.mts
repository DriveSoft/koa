import { GraphQLError } from "graphql"; //ExpressContext
import { addContact, createToken, getUser, getUserByToken, getUserContact, getUsers, login, registerUser } from "../controllers/users.controller.mjs";

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
			console.log('context', context)
			return await getUsers();
		},
		user: async (parent: any, args: any, context: any, info: any) => {			
			return await getUser(args.id)
		},
		contacts: async () => await getUsers(),
		contact: async (parent: any, args: any, context: any, info: any) => {
			return await getUser(args.id)
		},
		me: async (parent: any, args: any, context: any, info: any) => {
			const refreshToken = context.koaCtx.cookies.get('refreshToken');
			console.log('refreshToken me', refreshToken)
			const user = await getUserByToken(refreshToken)
			if(user === null) return;
			console.log('me context user', user)
			const accessToken = createToken(user.id, '1d');
			return {
				accessToken,
				user
			};
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

			context.koaCtx.cookies.set('refreshToken', loginResult.refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 1000 * 60 * 60 * 24 * 30 // 7 days
			 });	

			return {
				user: loginResult.user,
				accessToken: loginResult.accessToken
			}
		},
		logout: async (_: any, args: any, context: any) => {
			context.koaCtx.cookies.set('refreshToken', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				expire: 'Thu, 01 Jan 1970 00:00:00 GMT' 
			 });	

			return true
		}		
	},

	User: {
		contacts: (parent: any) => {
			return getUserContact(parent.id)
		}
	}

};

