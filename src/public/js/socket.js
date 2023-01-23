const socket = io();

let listProducts = document.getElementById("listProducts");

socket.on("upDate", (products) => {
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

let name = document.getElementById("name");
let submit = document.getElementById("submit");
let message = document.getElementById("message");
let messages = document.getElementById("messages");
let listChats = document.getElementById("listChats");

let newMessages = [];


socket.on("Welcome", (arg) => {
  newMessages = arg.messages;
  imprimirMessages(newMessages);
});

socket.on("loadChats", (chats) => {
  console.log(chats);
  listChats.innerHTML = '';
  chats.map((chat) => {
    let list = document.createElement('article');
    let classArticle = document.createAttribute('class');
    classArticle.value = 'card text-center text-wrap shadow-lg bg-white rounded';
    list.setAttributeNode(classArticle);
    list.innerHTML =
      ` <div>
          <p id='name'>${chat.user}:  ${chat.message}</p>
        </div>
			`;
    listChats.appendChild(list);
  });

});


let user = null;

if (!user) {
  Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa tu email",
    allowOutsideClick: false,
    inputValidator: (value) => {
      return !value && "Necesitas escribir un nombre de usuario";
    },
  }).then((newUser) => {
    user = newUser.value;
    name.innerText = user;
    socket.emit("newUser", user);
  });
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const messageText = message.value.trim();
  message.value = "";
  socket.emit("message", { user, message: messageText, date: new Date() });
});

socket.on("message", (data) => {
  newMessages.push(data);
  imprimirMessages(newMessages);
});

function imprimirMessages(newMessages) {
  let _newMessages = "";
  for (const message of newMessages) {
    _newMessages += `${message.user}: ${message.message} - ${message.date}\n`;
  }
  messages.innerText = _newMessages;
}

socket.on("newUser", (nombre) => {
  Swal.fire({
    text: `Nuevo usuari@ ${nombre} conectad@!`,
    toast: true,
    position: "top-right",
  });
});

