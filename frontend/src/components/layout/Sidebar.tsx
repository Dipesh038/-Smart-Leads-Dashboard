import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col border-r border-ink-100 bg-white px-6 py-8 dark:border-ink-800 dark:bg-ink-900 md:flex">
      <div className="text-lg font-semibold text-ink-900 dark:text-ink-100">Smart Leads</div>
      <p className="mt-2 text-xs text-ink-500">Sales pipeline hub</p>
      <nav className="mt-8 flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            [
              "rounded-xl px-3 py-2 text-sm font-medium transition",
              isActive
                ? "bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900"
                : "text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
            ].join(" ")
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
