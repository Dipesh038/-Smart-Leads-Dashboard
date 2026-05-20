import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingBlock from "../components/LoadingBlock";
import Badge from "../components/Badge";
import { fetchLead } from "../api/leadsApi";
import type { Lead } from "../utils/types";
import { formatDate } from "../utils/formatDate";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLead = async () => {
      if (!id) return;
      try {
        const data = await fetchLead(id);
        setLead(data);
      } catch {
        setError("Lead details not available");
      } finally {
        setLoading(false);
      }
    };
    void loadLead();
  }, [id]);

  if (loading) {
    return <LoadingBlock label="Loading lead" />;
  }

  if (error || !lead) {
    return (
      <div className="rounded-2xl border border-ember-200 bg-ember-50 px-4 py-3 text-sm text-ember-700 dark:border-ember-800 dark:bg-ember-950/40 dark:text-ember-200">
        {error ?? "Lead not found"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-gray-700 dark:bg-gray-900">
        <div>
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-white">{lead.name}</h2>
          <p className="text-sm text-ink-500 dark:text-gray-400">{lead.email}</p>
        </div>
        <Badge status={lead.status} />
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-gray-700 dark:bg-gray-900">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs uppercase text-ink-400 dark:text-gray-400">Source</div>
            <div className="mt-1 text-sm font-semibold text-ink-900 dark:text-white">{lead.source}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-ink-400 dark:text-gray-400">Created</div>
            <div className="mt-1 text-sm font-semibold text-ink-900 dark:text-white">{formatDate(lead.createdAt)}</div>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-ink-300 hover:text-ink-900 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        Back to dashboard
      </Link>
    </div>
  );
};

export default LeadDetailsPage;
