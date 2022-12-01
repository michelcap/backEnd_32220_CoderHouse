import fs from "fs";

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

  getProducts() {
    return this.#readProducts();
  }

  getProductById(id) {
    let retorno = "ERROR !!! id no existe";
    let products = this.#readProducts();
    let product = products.find((prod) => prod.id === id);
    if (typeof product != "undefined") retorno = product;
    return retorno;
  }
}

//// TESTING

// 1
const testing = new ProductManager("Products.json");

// 2
console.log(testing.getProducts());

// 3
testing.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(testing.getProducts());

// 4
console.log(testing.getProductById(1));
console.log(testing.getProductById(2));

// 5
testing.updateProduct(1, ["","",500,"","",60]);
console.log(testing.getProducts());

// 6
testing.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc124",
  25
);
testing.deleteProduct(1);
console.log(testing.getProducts())
