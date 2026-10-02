const productService = require("../services/productService");

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error reading products" });
  }
}

async function getProductById(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error reading product" });
  }
}

async function createProduct(req, res) {
  const { name, price } = req.body;
  if (name == null || price == null) {
    return res.status(400).json({ message: "name and price are required" });
  }

  try {
    const product = await productService.createProduct({ name, price });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ message: "Error creating product" });
  }
}

async function replaceProduct(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const { name, price } = req.body;
  if (name == null || price == null) {
    return res.status(400).json({ message: "name and price are required" });
  }

  try {
    const product = await productService.replaceProduct(id, { name, price });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error updating product" });
  }
}

async function patchProduct(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const updates = { ...req.body };
  delete updates.id;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  try {
    const product = await productService.updateProduct(id, updates);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error updating product" });
  }
}

async function deleteProduct(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Error deleting product" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  patchProduct,
  deleteProduct,
};
