import { Router } from "express";
import * as ProductsController from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.get("/", ProductsController.getProducts);
productsRouter.get("/:pid", ProductsController.getProduct);
productsRouter.post("/", ProductsController.createProducts);
productsRouter.put("/:pid", ProductsController.updateProduct);
productsRouter.delete("/:pid", ProductsController.deleteProduct);

export default productsRouter



// import ProductManager from "../../dao/ProductManager.js";

// const products = new ProductManager("products.json");

// const productsRouter = Router();

// productsRouter.get("/", (req, res) => {
//     const { limit } = req.query;
//     if (limit) {
//         const prod = products.getLimitProducts(limit)
//             .then((products) =>
//                 res.json(products)
//             );
//     } else {
//         const prod = products.getProducts()
//             .then((products) => res.json(products));
//     }
// });

// productsRouter.get("/:pid", (req, res) => {
//     const { pid } = req.params;
//     const prod = products.getProductById(Number(pid)).then((products) => res.json(products));
// });

// productsRouter.post("/", (req, res) => {
//     const data = req.body;
//     const estado = products.addProduct(data.title, data.description, data.code, data.price, data.status, data.stock, data.category, data.thumbnail);
//     estado.then((estado) => res.status(estado).json(data));
// });

// productsRouter.put("/:pid", (req, res) => {
//     const { pid } = req.params;
//     const data = req.body;
//     const campo = [data.title, data.description, data.code, data.price, data.status, data.stock, data.category, data.thumbnail]
//     const prod = products.updateProduct(Number(pid), campo)
//         .then((products) => res.json(products));
// });

// productsRouter.delete("/:pid", (req, res) => {
//     const { pid } = req.params;
//     const prod = products.deleteProduct(Number(pid))
//         .then((products) => res.json(products));
// });

// export { productsRouter, products };

