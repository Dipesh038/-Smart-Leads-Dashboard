import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import Button from "../Button";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4 dark:border-ink-800 dark:bg-ink-900">
      <div>
        <h1 className="text-lg font-semibold">Welcome back, {user?.name}</h1>
        <p className="text-xs text-ink-500">Role: {user?.role}</p>
      </div>
      <div className="flex items-center gap-3">
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
