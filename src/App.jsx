import { useState, useEffect, useMemo } from "react";
import { PRODUCTS, peso } from "./data.js";
import ProductCard from "./components/ProductCard.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import AuthModal from "./components/AuthModal.jsx";

export default function App() {
  const [stock, setStock] = useState(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock])));
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart") || "{}"); } catch { return {}; }
  });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState("");
  const [view, setView] = useState("shop");

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const list = useMemo(
    () => PRODUCTS.filter((p) => p.is_active && (cat === "All" || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase())),
    [q, cat]
  );
  const lines = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ p, qty: cart[p.id] }));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.p.price, 0);

  const add = (p) => {
    if ((cart[p.id] || 0) >= stock[p.id]) return setToast("No more stock available");
    setCart({ ...cart, [p.id]: (cart[p.id] || 0) + 1 });
    setToast(p.name + " added to cart");
  };

  const change = (p, d) => {
    const n = (cart[p.id] || 0) + d;
    const c = { ...cart };
    if (n <= 0) delete c[p.id];
    else if (n <= stock[p.id]) c[p.id] = n;
    else return setToast("Not enough stock");
    setCart(c);
  };

  const checkout = () => {
    if (!user) { setOpen(false); setAuth(true); return setToast("Please log in to check out"); }
    const s = { ...stock };
    lines.forEach((l) => (s[l.p.id] -= l.qty));
    setStock(s);
    setOrders([{ id: orders.length + 1, buyer: user, created_at: new Date().toLocaleString("en-PH"), items: lines, total }, ...orders]);
    setCart({});
    setOpen(false);
    setView("orders");
    setToast("Order placed. Thank you!");
  };

  return (
    <div>
      <header>
        <div className="logo" style={{ cursor: "pointer" }} onClick={() => setView("shop")}>Maison Aura</div>
        {user && <button className="ghost" onClick={() => setView("orders")}>My orders</button>}
        {user ? (
          <button className="ghost" onClick={() => { setUser(null); setView("shop"); }}>Log out ({user})</button>
        ) : (
          <button className="ghost" onClick={() => setAuth(true)}>Log in</button>
        )}
        <button className="btn" onClick={() => setOpen(true)}>Cart ({count})</button>
      </header>

      {view === "shop" ? (
        <>
          <section className="hero">
            <h1>Find your signature scent</h1>
            <p>Hand-selected perfumes for every mood, from fresh citrus mornings to deep amber nights.</p>
            <button className="btn" onClick={() => document.getElementById("shop").scrollIntoView({ behavior: "smooth" })}>
              Shop the collection
            </button>
          </section>
          <div className="bar" id="shop">
            <input placeholder="Search perfumes…" value={q} onChange={(e) => setQ(e.target.value)} />
            {["All", "Women", "Men", "Unisex"].map((c) => (
              <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="grid">
            {list.length === 0 && <p>No perfumes found.</p>}
            {list.map((p) => <ProductCard key={p.id} p={p} stock={stock[p.id]} onAdd={add} />)}
          </div>
        </>
      ) : (
        <div style={{ padding: "30px 5vw", minHeight: "60vh" }}>
          <h2>My orders</h2>
          {orders.length === 0 && <p style={{ color: "var(--mut)" }}>No orders yet.</p>}
          {orders.map((o) => (
            <div key={o.id} className="card" style={{ padding: 16, margin: "16px 0" }}>
              <strong>Transaction #{o.id}</strong>
              <div className="sku">{o.created_at} · buyer: {o.buyer}</div>
              {o.items.map((l) => (
                <div key={l.p.id} className="row"><span>{l.p.name} × {l.qty}</span><span>{peso(l.p.price * l.qty)}</span></div>
              ))}
              <div className="row price"><span>Total</span><span>{peso(o.total)}</span></div>
            </div>
          ))}
        </div>
      )}

      <footer>© 2026 Maison Aura · Quezon City, Philippines</footer>

      {open && <CartDrawer lines={lines} total={total} onClose={() => setOpen(false)} onChange={change} onCheckout={checkout} />}
      {auth && <AuthModal onClose={() => setAuth(false)} onLogin={(u) => { setUser(u); setAuth(false); setToast("Welcome, " + u + "!"); }} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
