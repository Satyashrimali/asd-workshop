const productDb = require("../database/productDb");

async function getAllProducts() {
  return productDb.getAllProducts();
}

async function getProductById(id) {
  return productDb.getProductById(id);
}

async function createProduct(payload) {
  return productDb.createProduct(payload);
}

async function replaceProduct(id, payload) {
  return productDb.replaceProduct(id, payload);
}

async function updateProduct(id, payload) {
  return productDb.updateProduct(id, payload);
}

async function deleteProduct(id) {
  return productDb.deleteProduct(id);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
