import { gql } from "apollo-server";

export const typeDefs = gql`
   type Person {      
      id: Int
      firstName: String
      lastName: String
      dob: String   
      contacts: [Contact!]!
   }

   type Contact {      
      id: Int
      phone: String
      personId: Int 
   }   

   input CreatePersonInput {
      firstName: String!
      lastName: String!
      dob: String!   
   } 

   input CreateContactInput {
      personId: Int!
      phone: String!
   }   
   
   type Query {
      persons: [Person]
   }

   type Query {
      person(id: ID!): Person
   }   

   type Query {
      contacts: [Contact]
   }

   type Query {
      contact(id: ID!): Contact
   }    

   type Mutation {
      createPerson(input: CreatePersonInput!): Person!
      createContact(input: CreateContactInput!): Contact!
   } 
`;