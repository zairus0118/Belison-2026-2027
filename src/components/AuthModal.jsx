import { useState } from "react";

export default function AuthModal({ onClose, onLogin }) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");

  const submit = () => {
    if (!name.trim() || pw.length < 4) return setErr("Enter a username and a password (4+ characters).");
    onLogin(name.trim());
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{mode === "login" ? "Log in" : "Create account"}</h2>
        <input placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        {err && <div className="low">{err}</div>}
        <button className="btn" onClick={submit}>{mode === "login" ? "Log in" : "Register"}</button>
        <button className="ghost" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "New here? Register" : "Have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
