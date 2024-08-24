
const Router = require("express").Router();
const admincontroller = require("../../Controller/admin/adminController");
const adminauthenticate = require("../../middleware/admin/adminAuthenticate");
const adminstorage = require("../../multer/admin/adminstorage")
const productController = require("../../Controller/product/productController");

Router.post("/register",adminstorage.single("adminuploads"),admincontroller.Register)
Router.post("/login",admincontroller.Login);
Router.post("/adminverify",adminauthenticate,admincontroller.adminverify);
Router.post("/logout",adminauthenticate,admincontroller.Logout)
Router.get("/getallusers",adminauthenticate,admincontroller.getallusers);
Router.delete("/deleteuser/:userId",adminauthenticate,admincontroller.deleteuser);



//order Roues

Router.post("/orders",productController.orders);
Router.get("/getorders", adminauthenticate,productController.getallorders);
Router.delete("/deleteorder/:orderId",adminauthenticate,productController.deleteorders);




module.exports = Router