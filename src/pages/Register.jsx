import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/gallery" replace />;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim()) return setError("Username is required.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    setLoading(true);
    setError("");
    try {
      await registerUser(form.username.trim(), form.password);
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <p className="muted">Start your own Pokédex.</p>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
        </label>
        <label>
          Confirm password
          <input type="password" name="confirm" value={form.confirm} onChange={handleChange} autoComplete="new-password" />
        </label>
        {error && <p className="msg msg-error" role="alert">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="muted">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
