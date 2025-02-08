import Contact from "../models/Contact.mjs";
import Person from "../models/Person.mjs";

export const resolvers = {
	Query: {
		persons: async () => await getPersons(),
		person: async (parent: any, args: any, context: any, info: any) => {
			return await getPerson(args.id)
		},
		contacts: async () => await getPersons(),
		contact: async (parent: any, args: any, context: any, info: any) => {
			return await getPerson(args.id)
		}		
	},

	Mutation: {
		createPerson: async (_: any, args: any, context: any) => {
			return await addPerson(args.input);
		},
		createContact: async (_: any, args: any, context: any) => {
			return await addContact(args.input);
		}		
	},

	Person: {
		contacts: (parent: any) => {
			return getPersonContact(parent.id)
		}
	}

};

async function getPersons() {
	return await Person.query().select("id", "firstName", "lastName", "dob")
}

async function getPerson(id: number) {
	return await Person.query().select("id", "firstName", "lastName", "dob").findById(id);
}

async function getContacts() {
	return await Contact.query().select("id", "phone", "personId")
}

async function getContact(id: number) {
	return await Contact.query().select("id", "phone", "personId").findById(id);
}

async function getPersonContact(personId: number) {
	return await Contact.query().select("id", "phone", "personId").where("personId", personId);
}

async function addPerson(data: any) {
		const newPerson = await Person.query().insert(data);
		return newPerson;
};

async function addContact(data: any) {
	const newContact = await Contact.query().insert(data);
	return newContact;
};