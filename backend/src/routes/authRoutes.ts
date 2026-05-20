import { Router } from "express";
import { login, me, register } from "../controllers/authController";
import { validateBody } from "../validators/validate";
import { loginSchema, registerSchema } from "../validators/authValidators";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", requireAuth, me);

export default router;
