import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import Button from "../Button";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col gap-4 border-b border-ink-100 bg-white px-4 py-4 dark:border-ink-800 dark:bg-ink-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h1 className="text-lg font-semibold">Welcome back, {user?.name}</h1>
        <p className="text-xs text-ink-500 dark:text-ink-400">Role: {user?.role}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={toggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
        <Button variant="ghost" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
