const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const usersController = require("../controller/usersController");
const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')    

router.get("/product", auth, productController.getProduct);
router.post("/product", auth, checkRole("admin"), productController.postProduct);
router.put("/product/:id", auth, checkRole("admin"), productController.updateProduct);
router.delete("/product/:id", auth, checkRole("admin"), productController.deleteProduct);
router.get('/:id', productController.getById)

router.get("/users", usersController.getUsers);
router.post("/users", usersController.postUsers);
router.put("/users/:id", usersController.updateUsers);
router.delete("/users/:id", usersController.deleteUsers);
router.post("/users/login", usersController.loginUsers);




module.exports = router;
