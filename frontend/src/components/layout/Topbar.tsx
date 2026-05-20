import { useAuth } from "../../hooks/useAuth";
import Button from "../Button";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-ink-100 bg-white px-4 py-4 pr-20 dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pr-24">
      <div>
        <h1 className="text-lg font-semibold text-ink-900 dark:text-white">Welcome back, {user?.name}</h1>
        <p className="text-xs text-ink-500 dark:text-gray-400">Role: {user?.role}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
