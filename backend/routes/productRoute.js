//route or url leading to products
const express=require("express");
const router=express.Router();
//import function from productController
const { getAllProducts,createProduct,updateProduct,deleteProduct, getProductDetails }=require("../controllers/productController");
//when route is matched the callback is fired by post method
//get method to only read all products
router.route("/products").get(getAllProducts);
//post since we create products
router.route("/product/new").post(createProduct);
//put to update products
router.route("/product/:id").put(updateProduct);
//del to delete products
router.route("/product/:id").delete(deleteProduct);
//to get prod details
router.route("/product/:id").get(getProductDetails);

module.exports=router;