import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import EmptyState from "../components/EmptyState";
import LoadingBlock from "../components/LoadingBlock";
import Pagination from "../components/Pagination";
import LeadFormModal from "../components/LeadFormModal";
import LeadTable from "../components/LeadTable";
import { deleteLead, exportLeads, fetchLeads, createLead, updateLead } from "../api/leadsApi";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import type { Lead, LeadSource, LeadStatus, PaginationMeta } from "../utils/types";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/apiError";

const statusOptions = [
  { label: "All statuses", value: "" },
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Qualified", value: "Qualified" },
  { label: "Lost", value: "Lost" }
];

const sourceOptions = [
  { label: "All sources", value: "" },
  { label: "Website", value: "Website" },
  { label: "Instagram", value: "Instagram" },
  { label: "Referral", value: "Referral" }
];

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" }
];

const DashboardPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [exporting, setExporting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const debouncedSearch = useDebouncedValue(search, 400);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeads({
        status: status || undefined,
        source: source || undefined,
        search: debouncedSearch || undefined,
        sort: sort as "latest" | "oldest",
        page
      });
      setLeads(data.leads);
      setMeta(data.meta);
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Unable to load leads"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadLeads();
  }, [status, source, debouncedSearch, sort, page]);

  const canDelete = useMemo(() => user?.role === "admin", [user]);
  const canExport = useMemo(() => user?.role === "admin", [user]);

  const handleSaveLead = async (payload: { name: string; email: string; status: LeadStatus; source: LeadSource }) => {
    setActionError(null);
    if (editing) {
      await updateLead(editing._id, payload);
    } else {
      await createLead(payload);
    }
    await loadLeads();
  };

  const handleDelete = async (id: string) => {
    setActionError(null);
    setDeletingId(id);
    try {
      await deleteLead(id);
      await loadLeads();
    } catch (deleteError) {
      setActionError(getErrorMessage(deleteError, "Unable to delete this lead."));
    } finally {
      setDeletingId(null);
    }
  };

  const handleExport = async () => {
    setActionError(null);
    setExporting(true);
    try {
      const blob = await exportLeads({
        status: status || undefined,
        source: source || undefined,
        search: debouncedSearch || undefined,
        sort: sort as "latest" | "oldest"
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "smart-leads.csv";
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch (exportError) {
      setActionError(getErrorMessage(exportError, "Unable to export leads right now."));
    } finally {
      setExporting(false);
    }
  };

  const resetModal = () => {
    setEditing(null);
    setModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-ink-800 dark:bg-ink-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Leads overview</h2>
          <p className="text-sm text-ink-500 dark:text-ink-300">Stay ahead with real-time filtering and focused follow-ups.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {canExport ? (
            <Button variant="outline" onClick={handleExport} disabled={exporting}>
              {exporting ? "Exporting..." : "Export CSV"}
            </Button>
          ) : null}
          <Button onClick={() => setModalOpen(true)}>Add lead</Button>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-ink-800 dark:bg-ink-900 md:grid-cols-4">
        <InputField
          label="Search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
        />
        <SelectField
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={statusOptions}
        />
        <SelectField
          label="Source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
            setPage(1);
          }}
          options={sourceOptions}
        />
        <SelectField
          label="Sort"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}
          options={sortOptions}
        />
      </div>

      {actionError ? (
        <div className="rounded-2xl border border-ember-200 bg-ember-50 px-4 py-3 text-sm text-ember-700 dark:border-ember-800 dark:bg-ember-950/40 dark:text-ember-200">
          {actionError}
        </div>
      ) : null}

      {loading ? (
        <LoadingBlock label="Fetching lead insights" />
      ) : error ? (
        <div className="rounded-2xl border border-ember-200 bg-ember-50 px-4 py-3 text-sm text-ember-700 dark:border-ember-800 dark:bg-ember-950/40 dark:text-ember-200">
          {error}
        </div>
      ) : leads.length === 0 ? (
        <EmptyState title="No leads found" description="Try adjusting the filters or add your first lead." />
      ) : (
        <LeadTable
          leads={leads}
          onEdit={(lead) => {
            setEditing(lead);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          canDelete={canDelete}
        />
      )}

      {deletingId ? <div className="text-sm text-ink-500 dark:text-ink-300">Removing lead...</div> : null}

      {meta ? <Pagination meta={meta} onPageChange={setPage} /> : null}

      <LeadFormModal open={modalOpen} onClose={resetModal} onSubmit={handleSaveLead} initial={editing} />
    </div>
  );
};

export default DashboardPage;
