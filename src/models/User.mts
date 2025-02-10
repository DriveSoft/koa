import { Model, Modifiers } from 'objection'
import Contact from './Contact.mjs'

export default class User extends Model {
  id!: number
  firstName!: string
  lastName!: string
  dob!: string
  email!: string
  password!: string

  static get tableName() {
    return 'users';
  }  

  static relationMappings = {
    contacts: {
      relation: Model.HasManyRelation,
      modelClass: Contact,
      join: {
        from: 'users.id',
        to: 'contacts.userId'
      }
    }
  };  

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "dob", "email"],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },        
        dob: { type: 'string', minLength: 10, maxLength: 10 },
        email: { type: 'string', format: "email" }
      }
    }
  }
}