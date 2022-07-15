import { db } from "../db/mongo.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function register(req, res) {
  const { email, password } = req.body;

  try {
    const cryptPassword = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ email, password: cryptPassword });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function login(_, res) {
  try {
    const { user } = res.locals;

    const token = uuid();

    await db.collection("session").findOneAndUpdate(
      { idUser: user._id },
      { $set: { idUser: user._id, token } },
      {
        upsert: true
      }
    );

    return res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
