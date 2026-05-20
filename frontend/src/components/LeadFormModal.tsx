import { useEffect, useState } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";
import type { Lead, LeadSource, LeadStatus } from "../utils/types";
import { getErrorMessage } from "../utils/apiError";

const statusOptions: Array<{ label: string; value: LeadStatus }> = [
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Qualified", value: "Qualified" },
  { label: "Lost", value: "Lost" }
];

const sourceOptions: Array<{ label: string; value: LeadSource }> = [
  { label: "Website", value: "Website" },
  { label: "Instagram", value: "Instagram" },
  { label: "Referral", value: "Referral" }
];

type LeadFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; email: string; status: LeadStatus; source: LeadSource }) => Promise<void>;
  initial?: Lead | null;
};

const LeadFormModal = ({ open, onClose, onSubmit, initial }: LeadFormModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [source, setSource] = useState<LeadSource>("Website");
  const [errors, setErrors] = useState<{ name?: string; email?: string; source?: string }>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSubmitError(null);
      setSaving(false);
      return;
    }

    if (!initial) {
      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");
      setErrors({});
      setSubmitError(null);
      return;
    }

    setName(initial.name);
    setEmail(initial.email);
    setStatus(initial.status);
    setSource(initial.source);
    setErrors({});
    setSubmitError(null);
    setSaving(false);
  }, [initial, open]);

  const validate = () => {
    const next: { name?: string; email?: string; source?: string } = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) next.email = "Valid email is required";
    if (!source) next.source = "Source is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitError(null);
    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        status,
        source
      });
      onClose();
    } catch (error) {
      setSubmitError(getErrorMessage(error, "Unable to save this lead right now."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} title={initial ? "Edit lead" : "Add new lead"} onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <InputField label="Lead name" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
        <InputField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} />
        <SelectField
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus)}
          options={statusOptions}
        />
        <SelectField
          label="Source"
          value={source}
          onChange={(event) => setSource(event.target.value as LeadSource)}
          options={sourceOptions}
          error={errors.source}
        />
        {submitError ? (
          <div className="rounded-xl border border-ember-200 bg-ember-50 px-3 py-2 text-sm text-ember-700 dark:border-ember-800 dark:bg-ember-950/40 dark:text-ember-200">
            {submitError}
          </div>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving} full className="sm:w-auto">
            {saving ? "Saving..." : "Save lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadFormModal;
