// Set USE_API = true to talk to your Django REST backend.
// Adjust the paths to match your shop/urls.py.
export const USE_API = false;
const BASE = "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const getProducts = () => request("/products/");
export const register = (data) => request("/register/", { method: "POST", body: JSON.stringify(data) });
export const login = async (data) => {
  const tokens = await request("/token/", { method: "POST", body: JSON.stringify(data) });
  localStorage.setItem("access", tokens.access);
  return tokens;
};
export const checkout = () => request("/checkout/", { method: "POST" });
