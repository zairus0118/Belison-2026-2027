import { useEffect, useState } from "react";

const EMPTY = { name: "", type: "", hp: 50, attack: 50, image_url: "", description: "" };
const TYPES = [
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison",
  "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy",
];

export default function FormPokemon({ editing, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(editing ? { ...EMPTY, ...editing } : EMPTY);
    setError("");
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hp = Number(form.hp);
    const attack = Number(form.attack);
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.type) return setError("Choose a type.");
    if (!Number.isInteger(hp) || hp < 1 || !Number.isInteger(attack) || attack < 1) {
      return setError("HP and Attack must be whole numbers of at least 1.");
    }
    setError("");
    try {
      await onSubmit({ ...form, name: form.name.trim(), hp, attack });
      if (!editing) setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="panel form-pokemon" onSubmit={handleSubmit}>
      <h2>{editing ? `Edit ${editing.name}` : "Add a Pokémon"}</h2>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} placeholder="Pikachu" />
      </label>

      <label>
        Type
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="">Select a type</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      <div className="row">
        <label>
          HP
          <input type="number" min="1" name="hp" value={form.hp} onChange={handleChange} />
        </label>
        <label>
          Attack
          <input type="number" min="1" name="attack" value={form.attack} onChange={handleChange} />
        </label>
      </div>

      <label>
        Image URL
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
      </label>

      <label>
        Description
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
      </label>

      {error && <p className="msg msg-error" role="alert">{error}</p>}

      <div className="row">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : editing ? "Save changes" : "Add Pokémon"}
        </button>
        {editing && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
