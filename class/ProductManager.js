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
    let type = ['string', 'string', 'string', 'number', 'boolean', 'number', 'string']
    if (!campos.includes(undefined) && campos.length == 7) {
      for (let i = 0; i < campos.length; i++) {
        if (typeof(campos[i]) != type[i]) {
          retorno = false;
          break;
        }
      }
    } else {
      retorno = false;
    }
    if (retorno && products.find((prod) => prod.code === code)) {
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
  async addProduct(title, description, code, price, status = true, stock, category, thumbnail) {
    try {
      let retorno = 400
      let products = this.#readProducts();
      let campos = [title, description, code, price, status, stock, category];
      const isValido = this.#isValido(code, campos, products);
      if (isValido) {
        const product = {
          id: this.#generateId(products) + 1,
          title: title,
          description: description,          
          code: code,
          price: price,
          status: status,    
          stock: stock,
          category: category,
          thumbnail: thumbnail
        };
        products.push(product);
        this.#writeProducts(products);
        retorno = 200
      } else {
        console.error("ERROR !!! codigo del producto repetido o datos invalidos");
      }
      return retorno
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // actualiza un elemento a la lista products
  async updateProduct(id, campo) {
    try {
      let products = this.#readProducts();
      let update = products.map((prod) => {
        if (prod.id === id) {
          prod.id = prod.id;
          prod.title = campo[0] === " " ? prod.title : typeof(campo[0]) === "string" ? campo[0] : prod.title;
          prod.description = campo[1] === " " ? prod.description : typeof(campo[1]) === "string" ? campo[1] : prod.description;
          prod.code = campo[2] === " " ? prod.code : typeof(campo[2]) === "string" ? campo[2] : prod.code;
          prod.price = campo[3] === " " ? prod.price : typeof(campo[3]) === "number" ? campo[3] : prod.price;
          prod.status = campo[4] === " " ? prod.status : typeof(campo[4])  === "boolean" ? campo[4] : prod.status;
          prod.stock = campo[5] === " " ? prod.stock : typeof(campo[5]) === "number" ? campo[5] : prod.stock;
          prod.category = campo[6] === " " ? prod.category : typeof(campo[6]) === "string" ? campo[6] : prod.category;
          prod.thumbnail = campo[7] === " " ? prod.thumbnail : typeof(campo[7]) === "string" ? campo[7] : prod.thumbnail;          
        }
      });
      this.#writeProducts(products);
      return products.filter(product => product.id === id)
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
      this.#writeProducts(productDelete);
      return `El producto con ID:${id} fue eliminado`
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
    let retorno = `ERROR !!! producto con ID:${id} no existe`;
    let products = this.#readProducts();
    let product = products.find((prod) => prod.id === id);
    if (typeof product != "undefined") retorno = product;
    return retorno;
  }
}

export default ProductManager
