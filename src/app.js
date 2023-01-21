import express from 'express';
import { engine } from "express-handlebars";
// import viewsRouter from "../src/routers/views.router.js";
import  productsRouter  from "../src/routers/products.router.js";
import  cartsRouter from "../src/routers/carts.router.js";
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import './config/db.js'

dotenv.config()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("src/public"));
app.engine("handlebars", engine());

//  app.set("views", "src/views");
// app.set("view engine", "handlebars");

// app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// app.use("/", productsRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(` 🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));

const socketServer = new Server(server);

socketServer.on('connection', (socket) => {
  console.log("Cliente Conectado");
  socket.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });
  products.getProducts().then((products) => {
    socketServer.emit("upDate", products);
  })
});
