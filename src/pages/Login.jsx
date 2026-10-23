import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/gallery" replace />;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return setError("Enter your username and password.");
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(form.username, form.password);
      login(data.token, data.username);
      navigate("/gallery", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <h1>Pokédex</h1>
        <p className="muted">Log in to open your collection.</p>
        {location.state?.registered && (
          <p className="msg msg-ok">Account created. You can log in now.</p>
        )}
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
        </label>
        {error && <p className="msg msg-error" role="alert">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
        <p className="muted">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}
