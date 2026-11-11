import Bottle from "./Bottle.jsx";
import { peso } from "../data.js";

export default function CartDrawer({ lines, total, onClose, onChange, onCheckout }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <h2>Your cart</h2>
          <button className="ghost" onClick={onClose}>Close</button>
        </div>
        {lines.length === 0 && <p style={{ color: "var(--mut)" }}>Your cart is empty.</p>}
        {lines.map(({ p, qty }) => (
          <div className="item" key={p.id}>
            <div className="mini" style={{ background: p.color + "44" }}><Bottle c={p.color} s={0.4} /></div>
            <div style={{ flex: 1 }}>
              <div>{p.name}</div>
              <div className="sku">{peso(p.price)}</div>
            </div>
            <div className="qty">
              <button onClick={() => onChange(p, -1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => onChange(p, 1)}>+</button>
            </div>
          </div>
        ))}
        {lines.length > 0 && (
          <>
            <div className="row price" style={{ fontSize: 18 }}><span>Total</span><span>{peso(total)}</span></div>
            <button className="btn" onClick={onCheckout}>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
