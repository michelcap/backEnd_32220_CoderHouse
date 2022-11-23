class ProductManager {
    // constructor productos
    constructor() {
        this.products = [];
    }

    // largo de lista products
    #getLength() {
        return this.products.length;
    }

    // chequea que los campos no sean vacios y que code no este ya ingresado
    #isValido(code, campos) {
        let retorno = true;
        if (code != '' && !this.products.find((prod) => prod.code === code)) {
            for (campo in campos) {
                if (campo === '') {
                    retorno = false;
                    break;
                }
            }
        } else {
            retorno = false;        
        }
        return retorno;
    }

    // agrega un elemento a la lista products
    addProduct(code, title, description, price, thumbnail, stock) {
        let campos = [title, description, price, thumbnail, stock];
        const isValido = this.#isValido(code, ...campos);
        if (isValido) {
            const product = {
                id: this.#getLength() + 1,
                code: code,
                title: title, 
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
            };
            this.products.push(product);
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let product = this.products.find((prod) => prod.id === id)
        if (!product) {
            console.log("Product not found")
        }
    }
}

const d = new ProductManager(232, "title", "description", 3, "thumbnail", 3);

console.log(d.getProducts());
console.log("HOLA")