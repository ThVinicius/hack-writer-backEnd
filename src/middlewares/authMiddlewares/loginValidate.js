import { db } from "../../db/mongo.js";
import bcrypt from "bcrypt";
import loginSchema from "../../schemas/loginSchma.js";

export default async function loginValidate(req, res, next) {
  const { error } = loginSchema.validate(req.body);

  if (error) return res.sendStatus(400);

  try {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (user === null) return res.sendStatus(401);

    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) return res.sendStatus(401);

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
