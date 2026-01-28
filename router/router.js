const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const userController = require("../controller/usersController");
const auth = require('../middleware/auth')

router.get("/product", auth, productController.getProduct);
router.post("/product", auth, productController.postProduct);
router.put("/product/:id", auth, productController.updateProduct);
router.delete("/product/:id", auth, productController.deleteProduct);

router.get("/users", userController.getUsers);
router.post("/users", userController.postUsers);
router.put("/users/:id", userController.updateUsers);
router.delete("/users/:id", userController.deleteUsers);


module.exports = router;
