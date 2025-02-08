import { Model, Modifiers } from 'objection'

export default class Contact extends Model {
  id!: number
  phone!: string
  personId!: number

  static get tableName() {
    return 'contacts';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["phone", "personId"],

      properties: {
        id: { type: 'integer' },
        phone: { type: 'string', minLength: 1, maxLength: 255 },
        personId: { type: 'integer' },
      }
    }
  }
}