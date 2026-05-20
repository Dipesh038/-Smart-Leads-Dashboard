import { z } from "zod";

const statusEnum = z.enum(["New", "Contacted", "Qualified", "Lost"]);
const sourceEnum = z.enum(["Website", "Instagram", "Referral"]);

export const createLeadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  status: statusEnum.optional(),
  source: sourceEnum
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email().optional(),
  status: statusEnum.optional(),
  source: sourceEnum.optional()
});

export const listLeadQuerySchema = z.object({
  status: statusEnum.optional(),
  source: sourceEnum.optional(),
  search: z.string().min(1).optional(),
  sort: z.enum(["latest", "oldest"]).optional(),
  page: z.coerce.number().int().min(1).optional()
});
