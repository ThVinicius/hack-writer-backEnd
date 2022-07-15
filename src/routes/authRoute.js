import { Router } from "express";
import { register, login } from "../controllers/authControllers.js";
import registerValidate from "../middlewares/authMiddlewares/registerValidate.js";
import loginValidate from "../middlewares/authMiddlewares/loginValidate.js";

const router = Router();

router.post("/register", registerValidate, register);
router.post("/login", loginValidate, login);

export default router;
