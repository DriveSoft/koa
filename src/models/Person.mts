import { Model, Modifiers } from 'objection'
import Contact from './Contact.mjs'

export default class Person extends Model {
  id!: number
  firstName!: string
  lastName!: string
  dob!: string

  static get tableName() {
    return 'persons';
  }  

  static relationMappings = {
    contacts: {
      relation: Model.HasManyRelation,
      modelClass: Contact,
      join: {
        from: 'persons.id',
        to: 'contacts.personId'
      }
    }
  };  

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "dob"],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },        
        dob: { type: 'string', minLength: 10, maxLength: 10 },
      }
    }
  }
}