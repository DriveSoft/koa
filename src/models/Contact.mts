import { Model, Modifiers } from 'objection'

export default class Contact extends Model {
  id!: number
  phone!: string
  userId!: number

  static get tableName() {
    return 'contacts';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["phone", "userId"],

      properties: {
        id: { type: 'integer' },
        phone: { type: 'string', minLength: 1, maxLength: 255 },
        userId: { type: 'integer' },
      }
    }
  }
}