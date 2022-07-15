import { db } from "../../db/mongo.js";
import registerSchema from "../../schemas/registerSchema.js";

export default async function registerValidate(req, res, next) {
  const { error } = registerSchema.validate(req.body);

  if (error) return res.sendStatus(400);

  try {
    const findEmail = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (findEmail) return res.sendStatus(409);

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
}
