import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/apiError";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password should be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to register with those details"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-6">
        <div className="w-full rounded-2xl border border-ink-100 bg-white p-8 shadow-card dark:border-ink-800 dark:bg-ink-900">
          <h1 className="text-2xl font-semibold">Create your workspace</h1>
          <p className="mt-2 text-sm text-ink-500">Invite yourself as a sales user and start tracking leads.</p>
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputField label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
            <InputField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error ? (
              <div className="rounded-xl border border-ember-200 bg-ember-50 px-3 py-2 text-xs text-ember-700 dark:border-ember-800 dark:bg-ember-950/40 dark:text-ember-200">
                {error}
              </div>
            ) : null}
            <Button type="submit" full disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-ink-500">
            Already have access? <Link to="/login" className="font-semibold text-ink-900 dark:text-ink-100">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
