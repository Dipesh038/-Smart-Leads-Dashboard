import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/errors";
import { createLead, deleteLead, exportLeadsCsv, getLeadById, listLeads, updateLead } from "../services/leadService";

export const getLeads = asyncHandler(async (req, res) => {
  const { status, source, search, sort, page } = req.query as Record<string, string | undefined>;
  const data = await listLeads({
    status,
    source,
    search,
    sort: sort === "oldest" ? "oldest" : "latest",
    page: page ? Number(page) : 1
  });

  res.status(200).json({
    success: true,
    data: data.leads,
    meta: data.meta
  });
});

export const getLead = asyncHandler(async (req, res) => {
  const lead = await getLeadById(req.params.id);
  if (!lead) throw new ApiError(404, "Lead not found");

  res.status(200).json({
    success: true,
    data: lead
  });
});

export const createLeadHandler = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const lead = await createLead({
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    source: req.body.source,
    createdBy: req.user.id
  });

  res.status(201).json({
    success: true,
    data: lead
  });
});

export const updateLeadHandler = asyncHandler(async (req, res) => {
  const lead = await updateLead(req.params.id, req.body);
  if (!lead) throw new ApiError(404, "Lead not found");

  res.status(200).json({
    success: true,
    data: lead
  });
});

export const deleteLeadHandler = asyncHandler(async (req, res) => {
  const lead = await deleteLead(req.params.id);
  if (!lead) throw new ApiError(404, "Lead not found");

  res.status(200).json({
    success: true,
    data: { id: lead._id.toString() }
  });
});

export const exportLeads = asyncHandler(async (req, res) => {
  const { status, source, search, sort } = req.query as Record<string, string | undefined>;
  const csv = await exportLeadsCsv({
    status,
    source,
    search,
    sort: sort === "oldest" ? "oldest" : "latest"
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  res.status(200).send(csv);
});
