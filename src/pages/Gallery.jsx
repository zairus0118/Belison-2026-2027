import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPokemon, deletePokemon, getPokemon, updatePokemon } from "../api/pokemon.js";
import FormPokemon from "../components/FormPokemon.jsx";
import GalleryPokemon from "../components/GalleryPokemon.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Gallery() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  const handleApiError = useCallback(
    (err) => {
      if (err.status === 401) handleLogout();
      else setError(err.message);
    },
    [handleLogout]
  );

  useEffect(() => {
    let active = true;
    getPokemon()
      .then((data) => active && setPokemon(data))
      .catch((err) => active && handleApiError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [handleApiError]);

  const handleSave = async (data) => {
    setSaving(true);
    setError("");
    try {
      if (editing) {
        const updated = await updatePokemon(editing.id, data);
        setPokemon((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setEditing(null);
      } else {
        const created = await createPokemon(data);
        setPokemon((prev) => [created, ...prev]);
      }
    } catch (err) {
      if (err.status === 401) handleLogout();
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete ${p.name}?`)) return;
    setBusyId(p.id);
    setError("");
    try {
      await deletePokemon(p.id);
      setPokemon((prev) => prev.filter((item) => item.id !== p.id));
      if (editing?.id === p.id) setEditing(null);
    } catch (err) {
      handleApiError(err);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="gallery-page">
      <header className="topbar">
        <h1>Pokédex</h1>
        <div className="topbar-user">
          <span>{username}</span>
          <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <main className="gallery-layout">
        <aside>
          <FormPokemon
            editing={editing}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
            saving={saving}
          />
        </aside>

        <section>
          {error && <p className="msg msg-error" role="alert">{error}</p>}
          {loading ? (
            <p className="muted">Loading your Pokémon...</p>
          ) : (
            <GalleryPokemon
              pokemon={pokemon}
              onEdit={(p) => { setEditing(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onDelete={handleDelete}
              busyId={busyId}
            />
          )}
        </section>
      </main>
    </div>
  );
}
