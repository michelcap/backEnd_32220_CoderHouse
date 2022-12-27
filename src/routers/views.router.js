import { Router } from "express";
import { products } from "../routers/products.router.js";

const router = Router();

router.get("/", (req, res) => {
  products.getProducts()
    .then((listProducts) => { res.render("home", { listProducts }); });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts")
})

export default router;