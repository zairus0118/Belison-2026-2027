function Card({ pokemon, onEdit, onDelete }) {
    return (
        <div className="card">
            {pokemon.image_url && (
                <img src={pokemon.image_url} alt={pokemon.name} />
            )}
            <h3>{pokemon.name}</h3>
            <p>Type: {pokemon.type}</p>
            <div className="card-actions">
                <button onClick={() => onEdit(pokemon)}>Edit</button>
                <button className="danger" onClick={() => onDelete(pokemon.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Card;