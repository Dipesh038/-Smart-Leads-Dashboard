import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50 dark:bg-[#0f1117]">
        <div className="rounded-2xl border border-ink-100 bg-white px-6 py-4 text-sm text-ink-600 shadow-card dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
          Loading your workspace...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
