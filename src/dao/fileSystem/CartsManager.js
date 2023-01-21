import fs from 'fs';
import ProductManager from "./ProductManager.js";

const productos = new ProductManager("products.json");

class CartsManager {
  // Percistencia
  #readCarts() {
    return JSON.parse(fs.readFileSync(this.path, "utf-8"));
  }
  #writeCarts(carrito) {
    return fs.writeFileSync(this.path, JSON.stringify(carrito));
  }

  // constructor carrito
  constructor(path) {
    this.path = path;
    if (fs.existsSync(this.path)) {
      this.#readCarts();
    } else {
      this.#writeCarts([]);
    }
  }

  // generar id
  #generateId(carts) {
    let listId = carts.map((cart) => {
      return cart.cid;
    });
    if (listId.length === 0) {
      listId.push(0);
    }
    return Math.max(...listId);
  }

  // agrega un elemento a la lista Carts
  async addCarts(products) {
    try {
      let retorno = 400
      let carts = this.#readCarts();
      const cart = {
        cid: this.#generateId(carts) + 1,
        products: products,
      };
      carts.push(cart);
      this.#writeCarts(carts);
      return cart;
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // actualiza un elemento a la lista Carts
  async updateCarts(cid, pid) {
    try {
      let retorno = `ERROR !!! Carrito o Producto no existen`
      let carts = this.#readCarts();
      let update = carts.map((cart) => {
        if (cart.cid === cid) {
          let productos = cart.products
          productos.map((producto) => {
            if (producto.id === pid) {
              producto.quantity += 1;
              retorno = producto
            }
          })
        }
      })
      if (typeof(retorno) === 'string') {
        let update = carts.map((cart) => {
          if (cart.cid === cid) {
            cart.products.push({"id": pid, "quantity": +1})
            retorno = cart.products
          }
        })
      };
      this.#writeCarts(carts);
      return retorno;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // elimina un elemento a la lista Carts
  async deleteCarts(id) {
    try {
      let carts = this.#readCarts();
      let cartsDelete = carts.filter((prod) => { if (prod.id != id) { return prod; } });
      this.#writeCarts(cartsDelete);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getCarts() {
    let carts = this.#readCarts();
    return carts;
  }

  async getLimitCarts(limit) {
    let carts = this.#readCarts();
    let prod = carts.slice(0, limit);
    return prod;
  }

  async getCartsById(cid) {
    let retorno = `ERROR !!! el CID= ${cid} no existe`;
    let carts = this.#readCarts();
    let cart = carts.find((cart) => cart.cid === cid);
    if (typeof cart != "undefined") {
      let carro = [];
      let product = productos.getProducts().then((prod) => { 
        let carrito = cart.products.map((itemProduct) => {
          let filterProduct = prod.filter((product) => product.id === itemProduct.id)
          let quantity = itemProduct.quantity
          carro.push({"products" : filterProduct, "quantity" : quantity})
        });
      });
      if (typeof carro != "undefined") retorno = carro;
    }
    return retorno;
  }
}

export default CartsManager;
