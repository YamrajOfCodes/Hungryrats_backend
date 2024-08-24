const Router = require("express").Router();
const adminauthenticate = require("../../middleware/admin/adminAuthenticate");
const productController = require("../../Controller/product/productController");
const productstorage = require("../../multer/product/productStorage");

Router.post("/addproduct",productstorage.single("productuploads"),adminauthenticate,productController.addproduct);
Router.get("/getallproducts",productController.getproduct)


Router.get("/singleproduct/:productId",productController.getsingleproduct);
Router.delete("/deleteproduct/:productId",productController.deleteproduct);

Router.post("/orders",productController.orders);


module.exports = Router