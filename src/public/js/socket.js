const socket = io();

let listProducts = document.getElementById("listProducts");

socket.on("upDate", (products) => {
  console.log(products);
  listProducts.innerHTML = '';
  products.map((product) => {
    let list = document.createElement('article');
    let classArticle = document.createAttribute('class');
    classArticle.value = 'card text-center text-wrap w-25 m-4 p-0 shadow-lg p-3 mb-5 bg-white rounded';
    list.setAttributeNode(classArticle);
    list.innerHTML =
      `	<heder class='card-header'>
					<h4 class='h6'>${product.title}</h4>
				</heder>
				<picture>
					<img class='img-fluid img-thumbnail' src=${product.thumbnail} alt=${product.title} />
				</picture>
				<section class='card-body'>
					<p class='card-text fs-6 fw-bolder'>Precio: ${product.price} usd</p>
					<p class='card-text fs-6'>Stock disponible: ${product.stock}</p>
				</section>
			`;
    listProducts.appendChild(list);
  });

});