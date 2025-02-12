import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import { GraphQLError } from "graphql";
import Contact from "../models/Contact.mjs";

export async function registerUser(data: any) {
   const { email, password } = data;

   const emailExists = await User.query().where('email', email).first() !== undefined;
   if (emailExists) {
      throw new GraphQLError('User with such email already exists', {
         extensions: {
            code: 'EMAIL_EXISTS',
         }
      });
   }

   const saltRounds = 10;
   const salt = await bcrypt.genSalt(saltRounds);
   const hashedPassword = await bcrypt.hash(password, salt);
   const userWithHashedPassword = { ...data, password: hashedPassword };

   const newUser = await User.query().insert(userWithHashedPassword);
   return newUser;
};

export async function getUsers() {
   return await User.query().select("id", "firstName", "lastName", "dob")
}

export async function getUser(id: number) {
   return await User.query().select("id", "firstName", "lastName", "dob").findById(id);
}

export async function getContacts() {
   return await Contact.query().select("id", "phone", "userId")
}

export async function getContact(id: number) {
   return await Contact.query().select("id", "phone", "userId").findById(id);
}

export async function getUserContact(userId: number) {
   return await Contact.query().select("id", "phone", "userId").where("userId", userId);
}

export async function addContact(data: any) {
   const newContact = await Contact.query().insert(data);
   return newContact;
};

export async function login(email: string, password: string) {
   const user = await User.query().select("id", "password").where("email", email).first();

   if (user === undefined) {
      throw new GraphQLError('User with such email does not exist', {
         extensions: {
            code: 'UNAUTHENTICATED',
         }
      });
   }

   const valid = await bcrypt.compare(password, user.password);
   if (!valid) {
      throw new GraphQLError('Wrong password', {
         extensions: {
            code: 'UNAUTHENTICATED',
         }
      });
   }

   const JWT_SECRET = process.env.JWT_SECRET as string;

   const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1d' }
   );

   return {
      token,
      user
   };
}