type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center dark:border-ink-700 dark:bg-ink-900">
      <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100">{title}</h3>
      <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{description}</p>
    </div>
  );
};

export default EmptyState;
