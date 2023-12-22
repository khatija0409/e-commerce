//route or url leading to products
const express = require("express");
const router = express.Router();
//import function from productController
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
//when route is matched the callback is fired by post method
//get method to only read all products
router.route("/products").get(getAllProducts); //show all proucts to everyone even if he is not logged in
//EX:router.route("/products").get(isAuthUser, getAllProducts); //show all products to the user if he stays logged in: if user logs out then dont show the products and cookie gets del
//post since we create products

router
  .route("/admin/products")
  .get(isAuthUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthUser, authorizeRoles("admin"), createProduct); //only admin can alter these
//put to update products
router
  .route("/admin/product/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateProduct); //only admin can alter these
//del to delete products
router
  .route("/admin/product/:id")
  .delete(isAuthUser, authorizeRoles("admin"), deleteProduct); //only admin can alter these
//to get prod details
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthUser, deleteReview); //get all reviews remaining after deleting
module.exports = router;
