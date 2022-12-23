const socket = io();
let listProducts = document.getElementsByClassName("listProducts");
console.log(listProducts)
socket.on("upDate", (products) => {
    console.log(products)
    listProducts.innerText = products;
    document.getElementsByClassName("listProducts").innerText = 'products';  
  });