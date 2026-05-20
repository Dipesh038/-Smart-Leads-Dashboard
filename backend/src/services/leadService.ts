import { Parser } from "json2csv";
import { Lead, type LeadDoc } from "../models/Lead";

type ListFilters = {
  status?: string;
  source?: string;
  search?: string;
  sort?: "latest" | "oldest";
  page: number;
};

const buildFilters = (filters: ListFilters) => {
  const query: Record<string, unknown> = {};
  if (filters.status) query.status = filters.status;
  if (filters.source) query.source = filters.source;
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { email: { $regex: filters.search, $options: "i" } }
    ];
  }
  return query;
};

export const listLeads = async (filters: ListFilters) => {
  const limit = 10;
  const skip = (filters.page - 1) * limit;
  const query = buildFilters(filters);
  const sort = filters.sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

  const [totalRecords, leads] = await Promise.all([
    Lead.countDocuments(query),
    Lead.find(query).sort(sort).skip(skip).limit(limit)
  ]);

  const totalPages = Math.max(1, Math.ceil(totalRecords / limit));

  return {
    leads,
    meta: {
      totalRecords,
      totalPages,
      currentPage: filters.page,
      hasNextPage: filters.page < totalPages,
      hasPrevPage: filters.page > 1
    }
  };
};

export const getLeadById = async (id: string) => {
  return Lead.findById(id);
};

export const createLead = async (payload: Omit<LeadDoc, "createdAt" | "updatedAt" | "createdBy"> & { createdBy: string }) => {
  return Lead.create(payload);
};

export const updateLead = async (id: string, payload: Partial<LeadDoc>) => {
  return Lead.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteLead = async (id: string) => {
  return Lead.findByIdAndDelete(id);
};

export const exportLeadsCsv = async (filters: Omit<ListFilters, "page">) => {
  const query = buildFilters({ ...filters, page: 1 });
  const sort = filters.sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };
  const leads = await Lead.find(query).sort(sort);
  const parser = new Parser({ fields: ["name", "email", "status", "source", "createdAt"] });
  return parser.parse(leads);
};
