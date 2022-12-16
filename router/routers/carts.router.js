import { Router } from "express";
import CartsManager from "../../class/CartsManager.js";

const carts = new CartsManager("carrito.json");

const cartsRouter = Router();

cartsRouter.get("/", (req, res) => {
    const { limit } = req.query;
    if (limit) {
        const prod = carts.getLimitcarts(limit)
            .then((carts) =>
                res.json(carts)
            );
    } else {
        const prod = carts.getCarts()
            .then((carts) => res.json(carts));
    }
});

// obtener lista de productos de un carrito con cid valido
cartsRouter.get("/:cid", (req, res) => {
    const { cid } = req.params;
    const carrito = carts.getCartsById(Number(cid))
        .then((cart) => res.json(cart));
});

// crear carrito
cartsRouter.post("/", (req, res) => {
    const data = req.body;
    const estado = carts.addCarts(data.products);
    estado.then((newCart) => res.json(newCart));
});

// actualizar carrito
cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const prod = carts.updateCarts(Number(cid), Number(pid))
        .then((carts) => res.json(carts));
});

// listar todos los carritos
cartsRouter.get("/", (req, res) => {
    const carrito = carts.getCarts()
        .then((cart) => res.json(cart));
});

// borrar carrito
cartsRouter.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    const prod = carts.deleteCarts(Number(pid))
        .then((carts) => res.json(carts));
});

export { cartsRouter, carts };

