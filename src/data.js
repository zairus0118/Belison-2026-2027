export const PRODUCTS = [
  { id: 1, name: "Dior Sauvage", description: "Fresh and spicy signature scent for men.", sku: "DS-001", price: 5500, stock: 12, cat: "Men", color: "#4f86b5", image: "/images/sauvage.jpg", is_active: true },
  { id: 2, name: "Bleu de Chanel", description: "Woody, aromatic and elegant.", sku: "BC-002", price: 6200, stock: 10, cat: "Men", color: "#2f4a6d", image: "/images/bleu-de-chanel.jpg", is_active: true },
  { id: 3, name: "Creed Aventus", description: "Fruity, smoky and bold.", sku: "CA-003", price: 15000, stock: 4, cat: "Men", color: "#6d7f5a", image: "/images/aventus.jpg", is_active: true },
  { id: 4, name: "YSL Libre", description: "Floral and warm for the free-spirited.", sku: "YL-004", price: 5800, stock: 15, cat: "Women", color: "#c9a7d6", image: "/images/libre.jpg", is_active: true },
  { id: 5, name: "Coco Mademoiselle", description: "Fresh, sparkling and feminine.", sku: "CM-005", price: 6500, stock: 8, cat: "Women", color: "#d98ca0", image: "/images/coco-mademoiselle.jpg", is_active: true },
  { id: 6, name: "Versace Eros", description: "Minty, sweet and energetic.", sku: "VE-006", price: 4200, stock: 20, cat: "Men", color: "#3aa3a3", image: "/images/eros.jpg", is_active: true },
];
export const peso = (n) => "₱" + n.toLocaleString("en-PH");