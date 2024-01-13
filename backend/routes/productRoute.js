const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthUser } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/auth");
// Routes
router.route("/products").get(getAllProducts); 
router
  .route("/admin/products")
  .get(isAuthUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthUser, authorizeRoles("admin"), createProduct); 
router
  .route("/admin/product/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthUser, authorizeRoles("admin"), deleteProduct); 
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthUser, deleteReview);
module.exports = router;
