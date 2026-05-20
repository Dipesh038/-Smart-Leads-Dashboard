import apiClient from "./client";
import type { ApiResponse, Lead, PaginationMeta } from "../utils/types";

export type LeadFilters = {
  status?: string;
  source?: string;
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
};

export const fetchLeads = async (filters: LeadFilters) => {
  const { data } = await apiClient.get<ApiResponse<Lead[]>>("/leads", { params: filters });
  return { leads: data.data, meta: data.meta as PaginationMeta };
};

export const fetchLead = async (id: string) => {
  const { data } = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);
  return data.data;
};

export const createLead = async (payload: Partial<Lead>) => {
  const { data } = await apiClient.post<ApiResponse<Lead>>("/leads", payload);
  return data.data;
};

export const updateLead = async (id: string, payload: Partial<Lead>) => {
  const { data } = await apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, payload);
  return data.data;
};

export const deleteLead = async (id: string) => {
  const { data } = await apiClient.delete<ApiResponse<{ id: string }>>(`/leads/${id}`);
  return data.data;
};

export const exportLeads = async (filters: LeadFilters) => {
  const response = await apiClient.get("/leads/export", {
    params: filters,
    responseType: "blob"
  });

  return response.data as Blob;
};
