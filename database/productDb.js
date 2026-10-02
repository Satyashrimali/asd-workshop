const fs = require("fs/promises");
const path = require("path");

const PRODUCTS_PATH = path.join(__dirname, "products.json");

async function readProducts() {
  const data = await fs.readFile(PRODUCTS_PATH, "utf8");
  return JSON.parse(data);
}

async function writeProducts(products) {
  await fs.writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2));
}

async function getAllProducts() {
  return readProducts();
}

async function getProductById(id) {
  const products = await readProducts();
  return products.find((p) => p.id === id) ?? null;
}

async function createProduct({ name, price }) {
  const products = await readProducts();
  const nextId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const product = { id: nextId, name, price };
  products.push(product);
  await writeProducts(products);
  return product;
}

async function replaceProduct(id, { name, price }) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const product = { id, name, price };
  products[index] = product;
  await writeProducts(products);
  return product;
}

async function updateProduct(id, updates) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates, id };
  await writeProducts(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  await writeProducts(products);
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
