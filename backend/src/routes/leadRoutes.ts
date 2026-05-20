import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { createLeadHandler, deleteLeadHandler, exportLeads, getLead, getLeads, updateLeadHandler } from "../controllers/leadController";
import { validateBody, validateQuery } from "../validators/validate";
import { createLeadSchema, listLeadQuerySchema, updateLeadSchema } from "../validators/leadValidators";

const router = Router();

router.get("/", requireAuth, validateQuery(listLeadQuerySchema), getLeads);
router.get("/export", requireAuth, validateQuery(listLeadQuerySchema), exportLeads);
router.get("/:id", requireAuth, getLead);
router.post("/", requireAuth, validateBody(createLeadSchema), createLeadHandler);
router.put("/:id", requireAuth, validateBody(updateLeadSchema), updateLeadHandler);
router.delete("/:id", requireAuth, requireRole("admin"), deleteLeadHandler);

export default router;
