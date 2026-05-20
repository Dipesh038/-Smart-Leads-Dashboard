import { Link } from "react-router-dom";
import Button from "./Button";
import Badge from "./Badge";
import type { Lead } from "../utils/types";
import { formatDate } from "../utils/formatDate";

const LeadTable = ({
  leads,
  onEdit,
  onDelete,
  canDelete
}: {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card dark:border-gray-700 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th className="px-5 py-3">Lead</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-t border-ink-100 bg-white transition-colors hover:bg-ink-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="px-5 py-4">
                  <Link to={`/leads/${lead._id}`} className="font-semibold text-ink-900 hover:underline dark:text-white">
                    {lead.name}
                  </Link>
                  <div className="text-xs text-ink-500 dark:text-gray-400">{lead.email}</div>
                </td>
                <td className="px-5 py-4">
                  <Badge status={lead.status} />
                </td>
                <td className="px-5 py-4 text-ink-600 dark:text-gray-200">{lead.source}</td>
                <td className="px-5 py-4 text-ink-600 dark:text-gray-200">{formatDate(lead.createdAt)}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onEdit(lead)}>
                      Edit
                    </Button>
                    {canDelete ? (
                      <Button variant="danger" onClick={() => onDelete(lead._id)}>
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
