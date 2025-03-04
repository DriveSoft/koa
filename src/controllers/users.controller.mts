import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import { GraphQLError } from "graphql";
import Contact from "../models/Contact.mjs";
import { StringValue } from "ms";

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
   const users = await User.query().select("id", "firstName", "lastName", "dob", "email");
   return users.map(user => ({...user, dob: new Date(user.dob).toISOString().slice(0, 10)}));
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

   const accessToken = createToken(user.id, '1d');
   const refreshToken = createToken(user.id, '30d');

   return {
      accessToken,
      refreshToken,
      user
   };
}

export const getUserByToken = async (token: string) => {
   const JWT_SECRET = process.env.JWT_SECRET as string;
   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (typeof decoded === "object" && "userId" in decoded) {
         const user = await User.query().select("id", "firstName", "lastName", "dob").findById(decoded.userId) ?? null;
         return user;
      }
      return null;
      
   } catch (error) {
      return null;
   }
}

//getUserByToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTczOTM0ODk1NSwiZXhwIjoxNzM5NDM1MzU1fQ.B6MN3A8n2SL-jK8ausuArccytPLl1MOj5qlQSwAv_JA")

export const createToken = (userId: number, expiresIn: StringValue | number) => {
   const JWT_SECRET = process.env.JWT_SECRET as string;

   return jwt.sign(
      { userId: userId },
      JWT_SECRET,
      { expiresIn: expiresIn }
   );
}