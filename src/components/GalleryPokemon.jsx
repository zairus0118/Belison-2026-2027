import Card from "./Card.jsx";

export default function GalleryPokemon({ pokemon, onEdit, onDelete, busyId }) {
  if (pokemon.length === 0) {
    return <p className="empty">No Pokémon yet. Add your first one with the form.</p>;
  }
  return (
    <div className="gallery-grid">
      {pokemon.map((p) => (
        <Card
          key={p.id}
          pokemon={p}
          onEdit={onEdit}
          onDelete={onDelete}
          busy={busyId === p.id}
        />
      ))}
    </div>
  );
}
