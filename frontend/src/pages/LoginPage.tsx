import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Unable to sign in with those credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6">
        <div className="grid w-full gap-10 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold font-display">Smart Leads Dashboard</h1>
            <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
              Track leads, stay on top of outreach, and keep the pipeline moving with clarity.
            </p>
            <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:border-ink-800 dark:bg-ink-900">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <InputField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {error ? <div className="rounded-xl bg-ember-50 px-3 py-2 text-xs text-ember-700">{error}</div> : null}
                <Button type="submit" full disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <p className="mt-4 text-xs text-ink-500">
                New here? <Link to="/register" className="font-semibold text-ink-900 dark:text-ink-100">Create an account</Link>
              </p>
            </div>
          </div>
          <div className="hidden flex-col justify-center gap-4 rounded-2xl bg-ink-900 p-8 text-white shadow-soft md:flex">
            <div className="text-sm uppercase tracking-wide text-ink-200">Sales snapshot</div>
            <h2 className="text-2xl font-semibold">Keep every lead in view.</h2>
            <p className="text-sm text-ink-200">
              Filter by intent, export for follow-ups, and share updates with your sales lead.
            </p>
            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <div className="text-xs text-ink-200">This week</div>
              <div className="mt-2 text-3xl font-semibold">42 new leads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
