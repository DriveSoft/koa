import Contact from "../models/Contact.mjs";
import User from "../models/User.mjs";

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
			return await addUser(args.input);
		},
		createContact: async (_: any, args: any, context: any) => {
			return await addContact(args.input);
		}		
	},

	User: {
		contacts: (parent: any) => {
			return getUserContact(parent.id)
		}
	}

};

async function getUsers() {
	return await User.query().select("id", "firstName", "lastName", "dob")
}

async function getUser(id: number) {
	return await User.query().select("id", "firstName", "lastName", "dob").findById(id);
}

async function getContacts() {
	return await Contact.query().select("id", "phone", "userId")
}

async function getContact(id: number) {
	return await Contact.query().select("id", "phone", "userId").findById(id);
}

async function getUserContact(userId: number) {
	return await Contact.query().select("id", "phone", "userId").where("userId", userId);
}

async function addUser(data: any) {
		const newUser = await User.query().insert(data);
		return newUser;
};

async function addContact(data: any) {
	const newContact = await Contact.query().insert(data);
	return newContact;
};