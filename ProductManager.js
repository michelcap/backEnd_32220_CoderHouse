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
            for (let campo in campos) {
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
    addProduct(title, description, price, thumbnail, code, stock) {
        let campos = [title, description, price, thumbnail, stock];
        const isValido = this.#isValido(code, ...campos);
        if (isValido) {
            const product = {
                id: this.#getLength() + 1,
                title: title, 
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            };
            this.products.push(product);
        } else {
            console.error("ERROR !!! codigo del producto repetido")
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let retorno = "Not found"
        let product = this.products.find((prod) => prod.id === id)
        if (typeof product != 'undefined') retorno = product
        return retorno
    }
}

const testing = new ProductManager();
console.log(testing.getProducts());
testing.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(testing.getProducts());
testing.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(testing.getProductById(1))
console.log(testing.getProductById(2))
