import Router from "koa-router";
import { getPersons, addPerson } from "./controllers/events.controllers.mjs";

const router = new Router();

router.get("/persons_list", getPersons);
router.post("/add_person", addPerson);

export default router;