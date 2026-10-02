const express = require("express");
const productController = require("../controllers/productController");
const {
  cacheMiddleware,
  invalidateCacheMiddleware,
} = require("../middleware/cache");

const router = express.Router();

router.get("/", cacheMiddleware, productController.getAllProducts);
router.get("/:id", cacheMiddleware, productController.getProductById);

router.post("/", invalidateCacheMiddleware, productController.createProduct);
router.put("/:id", invalidateCacheMiddleware, productController.replaceProduct);
router.patch("/:id", invalidateCacheMiddleware, productController.patchProduct);
router.delete(
  "/:id",
  invalidateCacheMiddleware,
  productController.deleteProduct
);

module.exports = router;
