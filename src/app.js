import express from "express";
import ProductManager from "./productManager.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const prod = new ProductManager("products.json");

app.get("/products", (req, res) => {
    const { limit } = req.query;
    if (limit) {
        const products = prod.getLimitProducts(limit)
            .then((products) => 
                res.json(products)
        );
    } else {
        const products = prod.getProducts()
            .then((products) => res.json(products));
    }
});

app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;
    const products = prod.getProductById(Number(pid))
        .then((products) => res.send(products));

});

app.listen(PORT, () => {
    console.log(`🏃 Listening on port ${PORT}`);
})

