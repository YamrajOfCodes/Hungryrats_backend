const Router = require("express").Router();
const userController = require("../../Controller/user/userContoller");
const userstorage = require("../../multer/user/userStorage");
const userauthenticate = require("../../middleware/user/userAuthenticate");

Router.post("/register",userstorage.single("useruploads"),userController.Register);
Router.post("/login",userController.Login);

Router.get("/userverify",userauthenticate,userController.userverify);
Router.post("/logout",userauthenticate,userController.logout)

Router.post("/message",userController.message)










module.exports = Router