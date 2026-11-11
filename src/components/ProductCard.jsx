import Bottle from "./Bottle.jsx";
import { peso } from "../data.js";

export default function ProductCard({ p, stock, onAdd }) {
  const out = stock === 0;
  return (
    <div className="card">
      <div className="thumb" style={{ background: `linear-gradient(160deg,${p.color}55,${p.color}11)` }}>
        <Bottle c={p.color} />
      </div>
      <div className="body">
        <h3>{p.name}</h3>
        <div className="sku">{p.sku} · {p.cat}</div>
        <div className="desc">{p.description}</div>
        {stock > 0 && stock <= 5 && <div className="low">Only {stock} left</div>}
        <div className="row">
          <span className="price">{peso(p.price)}</span>
          <button className="btn" disabled={out} style={out ? { opacity: 0.45, cursor: "not-allowed" } : {}} onClick={() => onAdd(p)}>
            {out ? "Sold out" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
