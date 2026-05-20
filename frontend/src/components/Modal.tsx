import React from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-4 backdrop-blur-sm md:p-6">
      <div className="w-full max-w-lg rounded-2xl border border-ink-200 bg-white p-6 shadow-soft dark:border-ink-800 dark:bg-ink-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-100">{title}</h2>
          <button
            className="rounded-lg px-2 py-1 text-sm text-ink-500 transition hover:bg-ink-100 hover:text-ink-700 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
