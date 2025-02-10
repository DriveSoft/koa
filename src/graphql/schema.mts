import { gql } from "apollo-server";

export const typeDefs = gql`
   type User {      
      id: Int
      firstName: String
      lastName: String
      email: String
      dob: String   
      contacts: [Contact!]!
   }

   type Contact {      
      id: Int
      phone: String
      userId: Int 
   }   

   input CreateUserInput {
      firstName: String!
      lastName: String!
      dob: String!  
      email: String! 
      password: String!
   } 

   input CreateContactInput {
      userId: Int!
      phone: String!
   }   
   
   type Query {
      users: [User]
      user(id: ID!): User
      contacts: [Contact]
      contact(id: ID!): Contact
   }

   type Mutation {
      createUser(input: CreateUserInput!): User!
      createContact(input: CreateContactInput!): Contact!
   } 
`;