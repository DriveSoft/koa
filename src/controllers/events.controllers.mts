import { Context } from "koa";
import Person from "../models/Person.mjs";

export const getPersons = async (ctx: Context) => {
   const persons = await Person.query().select("id", "firstName", "lastName", "dob");
   ctx.body = persons;
   ctx.status = 201;   
};

export const addPerson = async (ctx: Context) => {
   try {
      const newPerson = await Person.query().insert(ctx.request.body as object);
      ctx.body = newPerson;
      ctx.status = 201;
   } catch(error) {
      ctx.body = error;
      ctx.status = 400;
   }
};