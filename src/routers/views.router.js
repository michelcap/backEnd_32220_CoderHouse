import { Router } from "express";
import * as ProductsService from "../dao/services/product.service.js";

const router = Router();

router.get("/", (req, res) => {
  let products = ProductsService
  products.getProducts()
    .then((listProducts) => { res.render("home",  {listProducts} ) });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;



