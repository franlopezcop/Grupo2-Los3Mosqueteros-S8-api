const express = require("express");
const router = express.Router();

const apiProduct = require("../api/apiProduct")


router.get("/", apiProduct.mostrarProductos)
router.get("/last", apiProduct.lastProduct) 
router.get("/:id", apiProduct.mostrarProducto) 



module.exports = router