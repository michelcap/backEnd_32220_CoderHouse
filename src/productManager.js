import { text } from 'express';
import fs from 'fs';

class ProductManager {
  // Percistencia
  #readProducts() {
    return JSON.parse(fs.readFileSync(this.path, "utf-8"));
  }
  #writeProducts(products) {
    return fs.writeFileSync(this.path, JSON.stringify(products));
  }

  // constructor productos
  constructor(path) {
    this.path = path;
    if (fs.existsSync(this.path)) {
      this.#readProducts();
    } else {
      this.#writeProducts([]);
    }
  }

  // chequea que los campos no sean vacios y que code no este ya ingresado
  #isValido(code, campos, products) {
    let retorno = true;
    if (code != "" && !products.find((prod) => prod.code === code)) {
      for (let campo in campos) {
        if (campo === "") {
          retorno = false;
          break;
        }
      }
    } else {
      retorno = false;
    }
    return retorno;
  }

  // generar id
  #generateId(products) {
    let listId = products.map((prod) => {
      return prod.id;
    });
    if (listId.length === 0) {
      listId.push(0);
    }
    return Math.max(...listId);
  }

  // agrega un elemento a la lista products
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      let products = this.#readProducts();
      let campos = [title, description, price, thumbnail, stock];
      const isValido = this.#isValido(code, campos, products);
      if (isValido) {
        const product = {
          id: this.#generateId(products) + 1,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        };
        products.push(product);
        this.#writeProducts(products);
      } else {
        console.error("ERROR !!! codigo del producto repetido");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // actualiza un elemento a la lista products
  async updateProduct(id, campo) {
    try {
      let products = this.#readProducts();
      let product = products.find((prod) => prod.id === id);
      let update = products.map((prod) => {
        if (prod.id === id) {
          prod.id = prod.id;
          prod.title = campo[1] === "" ? prod.title : campo[1];
          prod.description = campo[2] === "" ? prod.description : campo[2];
          prod.price = campo[3] === "" ? prod.price : campo[3];
          prod.thumbnail = campo[4] === "" ? prod.thumbnail : campo[4];
          prod.code = campo[5] === "" ? prod.code : campo[5];
          prod.stock = campo[6] === "" ? prod.stock : campo[6];
        }
      });
      this.#writeProducts(products);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // elimina un elemento a la lista products
  async deleteProduct(id) {
    try {
      let products = this.#readProducts();
      let productDelete = products.filter((prod) => {if (prod.id != id) {return prod}})
      // if (typeof productDelete === "undefined") productDelete = [];
      this.#writeProducts(productDelete);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getProducts() {
    let products = this.#readProducts();
    return products;
  }

  async getLimitProducts(limit) {
    let products = this.#readProducts();
    let prod = products.slice(0, limit);
    return prod;
  }

  async getProductById(id) {
    let retorno = "ERROR !!! id no existe";
    let products = this.#readProducts();
    let product = products.find((prod) => prod.id === id);
    if (typeof product != "undefined") retorno = product;
    return retorno;
  }
}

export default ProductManager
//// TESTING
// 

// testing.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   1,
//   "Sin imagen",
//   "abc001",
//   1
// );
// testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     2,
//     "Sin imagen",
//     "abc002",
//     2
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     3,
//     "Sin imagen",
//     "abc003",
//     3
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     4,
//     "Sin imagen",
//     "abc004",
//     4
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     5,
//     "Sin imagen",
//     "abc005",
//     5
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     6,
//     "Sin imagen",
//     "abc006",
//     6
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     7,
//     "Sin imagen",
//     "abc007",
//     7
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     8,
//     "Sin imagen",
//     "abc008",
//     8
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     9,
//     "Sin imagen",
//     "abc009",
//     9
//   );
//   testing.addProduct(
//     "producto prueba",
//     "Este es un producto prueba",
//     10,
//     "Sin imagen",
//     "abc010",
//     10
//   );