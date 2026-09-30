const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// GET all products
app.get("/products", (req, res) => {
  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error reading file"
      });
    }

    const products = JSON.parse(data);

    res.json(products);
  });
});


// GET product by ID
app.get("/products/:id", (req, res) => {
  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error reading file"
      });
    }

    const products = JSON.parse(data);

    const product = products.find(
      (p) => p.id === parseInt(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  });
});


// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});