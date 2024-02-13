class Item {
  constructor(id, name, price, img, description, ingredients) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.description = description;
    this.ingredients = ingredients;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getCartFromLocal();
  cartAmount();
});

const inventory = [
  new Item(
    1,
    "Kardemummabulle",
    29,
    "/product_images/kardemummabullar.avif",
    "Underbart goda och saftiga bullar med kardemumma",
    "Mjöl, Kardemumma, Mjölk"
  ),
  new Item(
    2,
    "Kanelbulle",
    25,
    "/product_images/kanelbulle.avif",
    "Bjud på saftiga och hjärtformade kanelbullar på alla hjärtans dag.",
    "Mjöl, Kanel, Mjölk, Jäst"
  ),
  new Item(
    3,
    "Semla med kardemumma",
    59,
    "/product_images/semla.avif",
    "Klassiska släta bullar med smak av kardemumma, fylld med mandelmassa och vispad grädde.",
    "Mjöl, Kanel, Mjölk, Jäst"
  ),
  new Item(
    4,
    "Chokladtryffeltårta",
    159,
    "/product_images/chokladtryffel.avif",
    "En makalöst god chokladtårta täckt med ett lager chokladtryffel - ett måste för alla chokladälskare.",
    "Choklad, Mjöl, Mjölk, Ägg, Grädde"
  ),
  new Item(
    4,
    "Kanelbiscotti",
    49,
    "/product_images/kanelbiscotti.avif",
    "Dessa italienska mandelskorpor får här varmkryddig smak av kanel och ingefära.",
    "Smör, Mjöl, Bakpulver, Ägg, Vaniljsocker"
  ),
];

const shoppingCart = [];

const inventoryList = document.querySelector("#inventory");

function displayInventory() {
  for (const item of inventory) {
    const col = document.createElement("div");
    const card = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", item.img);
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const leadText = document.createElement("p");
    const cardText = document.createElement("p");
    const addToCartBtn = document.createElement("button");
    const readMoreBtn = document.createElement("button");
    readMoreBtn.setAttribute("data-bs-toggle", "modal");
    readMoreBtn.setAttribute("data-bs-target", "#productModal");

    cardTitle.innerText = item.name;
    leadText.innerText = `${item.price} kr`;
    cardText.innerText = item.description;
    addToCartBtn.innerText = "Lägg i kundvagnen";
    readMoreBtn.innerText = "Läs mer";

    inventoryList.appendChild(col);
    col.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(leadText);
    cardBody.appendChild(cardText);
    cardBody.appendChild(addToCartBtn);
    cardBody.appendChild(readMoreBtn);

    addToCartBtn.onclick = () => {
      addToCart(cardTitle);
    };
    readMoreBtn.onclick = () => {
      readMoreModal(cardTitle);
    };

    inventoryStyle(
      col,
      card,
      img,
      cardBody,
      cardTitle,
      leadText,
      addToCartBtn,
      readMoreBtn
    );
  }
}

const checkOutList = document.querySelector("#checkout");

function displayCheckOut() {
  for (const item of shoppingCart) {
    const listGroupItem = document.createElement("a");
    const dFlex = document.createElement("div");
    const listItemHeading = document.createElement("h5");
    const trashBtn = document.createElement("button");
    const trashIcon = document.createElement("i");
    const priceText = document.createElement("p");
    const amountText = document.createElement("p");

    listItemHeading.innerText = item.name;
    priceText.innerText = `${item.price} kr`;

    checkOutList.appendChild(listGroupItem);
    listGroupItem.appendChild(dFlex);
    dFlex.appendChild(listItemHeading);
    dFlex.appendChild(trashBtn);
    trashBtn.appendChild(trashIcon);
    listGroupItem.appendChild(priceText);
    listGroupItem.appendChild(amountText);

    checkOutStyle(
      listGroupItem,
      dFlex,
      listItemHeading,
      trashBtn,
      trashIcon,
      priceText,
      amountText
    );
  }
}

function readMoreModal(cardTitle) {
  const modalHeader = document.getElementById("productModalLabel");
  const modalBody = document.getElementById("productModalText");
  const product = inventory.find((x) => x.name === cardTitle.innerText);
  modalHeader.innerText = product.name;
  modalBody.innerText = `Ingredienser: ${product.ingredients}`;
}

function addToCart(cardTitle) {
  const product = inventory.find((x) => x.name === cardTitle.innerText);
  shoppingCart.push(product);
  console.log(shoppingCart);
  cartAmount();
  const stringifiedCart = JSON.stringify(shoppingCart);
  localStorage.setItem("shoppingCart", stringifiedCart);
}

function cartAmount() {
  const b = document.getElementById("navbar");
  const nodes = b.getElementsByTagName("p");
  for (node of nodes) {
    node.innerText = shoppingCart.length;
  }
}
function getCartFromLocal() {
  const stringifiedCart = localStorage.getItem("shoppingCart");
  const cartParse = JSON.parse(stringifiedCart);
  for (item of cartParse) {
    shoppingCart.push(item);
  }
}

function inventoryStyle(
  col,
  card,
  img,
  cardBody,
  cardTitle,
  leadText,
  addToCartBtn,
  readMoreBtn
) {
  col.classList.add("col");
  card.classList.add("card", "mt-2");
  img.classList.add("img-fluid");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  leadText.classList.add("lead");
  addToCartBtn.classList.add("btn", "btn-primary");
  readMoreBtn.classList.add("btn", "btn-secondary", "m-2");
}

function checkOutStyle(
  listGroupItem,
  dFlex,
  listItemHeading,
  trashBtn,
  trashIcon,
  priceText,
  amountText
) {
  listGroupItem.classList.add("list-group-item", "list-group-item-action");
  dFlex.classList.add("d-flex", "w-100", "justify-content-between");
  listItemHeading.classList.add("mb-1");
  trashBtn.classList.add("btn", "btn-primary");
  trashIcon.classList.add("bi", "bi-trash");
  priceText.classList.add("mb-1");
  amountText.classList.add("mb-1");
}
