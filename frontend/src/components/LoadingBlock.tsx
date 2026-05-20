const LoadingBlock = ({ label }: { label?: string }) => {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
      <div className="h-4 w-40 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
      <div className="mt-4 h-3 w-full animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
      <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
      {label ? <p className="mt-4 text-sm text-ink-500">{label}</p> : null}
    </div>
  );
};

export default LoadingBlock;
