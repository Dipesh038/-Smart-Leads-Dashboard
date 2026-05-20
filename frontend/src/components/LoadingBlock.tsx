const LoadingBlock = ({ label }: { label?: string }) => {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-gray-700 dark:bg-gray-900">
      {label ? <p className="mb-4 text-sm font-medium text-ink-500 dark:text-gray-400">{label}</p> : null}
      <div className="h-4 w-40 animate-pulse rounded bg-ink-100 dark:bg-gray-700" />
      <div className="mt-4 h-3 w-full animate-pulse rounded bg-ink-100 dark:bg-gray-700" />
      <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-ink-100 dark:bg-gray-700" />
    </div>
  );
};

export default LoadingBlock;
