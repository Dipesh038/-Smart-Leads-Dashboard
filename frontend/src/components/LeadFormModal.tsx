import { useEffect, useState } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";
import type { Lead, LeadSource, LeadStatus } from "../utils/types";

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

  useEffect(() => {
    if (!initial) return;
    setName(initial.name);
    setEmail(initial.email);
    setStatus(initial.status);
    setSource(initial.source);
  }, [initial]);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");
      setErrors({});
    }
  }, [open]);

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
    setSaving(true);
    await onSubmit({ name, email, status, source });
    setSaving(false);
    onClose();
  };

  return (
    <Modal open={open} title={initial ? "Edit lead" : "Add new lead"} onClose={onClose}>
      <div className="flex flex-col gap-4">
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
        <Button onClick={handleSubmit} disabled={saving} full>
          {saving ? "Saving..." : "Save lead"}
        </Button>
      </div>
    </Modal>
  );
};

export default LeadFormModal;
