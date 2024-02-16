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
    "product_images/kardemummabullar.avif",
    "Underbart goda och saftiga bullar med kardemumma",
    "Mjöl, Kardemumma, Mjölk"
  ),
  new Item(
    2,
    "Kanelbulle",
    25,
    "product_images/kanelbulle.avif",
    "Bjud på saftiga och hjärtformade kanelbullar på alla hjärtans dag.",
    "Mjöl, Kanel, Mjölk, Jäst"
  ),
  new Item(
    3,
    "Semla med kardemumma",
    59,
    "product_images/semla.avif",
    "Klassiska släta bullar med smak av kardemumma, fylld med mandelmassa och vispad grädde.",
    "Mjöl, Kanel, Mjölk, Jäst"
  ),
  new Item(
    4,
    "Chokladtryffeltårta",
    159,
    "product_images/chokladtryffel.avif",
    "En makalöst god chokladtårta täckt med ett lager chokladtryffel - ett måste för alla chokladälskare.",
    "Choklad, Mjöl, Mjölk, Ägg, Grädde"
  ),
  new Item(
    5,
    "Kanelbiscotti",
    49,
    "product_images/kanelbiscotti.avif",
    "Dessa italienska mandelskorpor får här varmkryddig smak av kanel och ingefära.",
    "Smör, Mjöl, Bakpulver, Ägg, Vaniljsocker"
  ),
  new Item(
    6,
    "Gula dammsugare",
    49,
    "product_images/gula-dammsugare.avif",
    "Klassiska punschrullar med en twist. De här får smak av torkade aprikoser och vi väljer gul marsipan. ",
    "Aprikos, Punsch, Smör, Kakao, Vaniljsocker"
  ),
];

let shoppingCart = [];

const inventoryList = document.querySelector("#inventory");

function displayInventory() {
  for (const item of inventory) {
    const col = document.createElement("div");
    const card = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", item.img);
    img.setAttribute("alt", item.name);
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
  let cartGroup = Object.groupBy(shoppingCart, (s) => s.name);
  console.log(cartGroup);
  if (shoppingCart.length > 0) {
    for (const item of Object.entries(cartGroup)) {
      console.log(item);
      const listGroupItem = document.createElement("a");
      const dFlex = document.createElement("div");
      const listItemHeading = document.createElement("h5");
      const trashBtn = document.createElement("button");
      trashBtn.setAttribute("title", `Remove one ${item[0]}`);
      const trashIcon = document.createElement("i");
      const priceText = document.createElement("p");
      const amountText = document.createElement("p");

      listItemHeading.innerText = item[0];
      priceText.innerText = `${item[1].reduce(
        (n, { price }) => n + price,
        0
      )} kr`;
      amountText.innerText = `${item[1].length} stycken`;

      trashBtn.onclick = () => {
        removeFromCart(listItemHeading);
        const product = item[1].find(
          (x) => x.name === listItemHeading.innerText
        );
        item[1].pop(product);
        priceText.innerText = `${item[1].reduce(
          (n, { price }) => n + price,
          0
        )} kr`;
        amountText.innerText = `${item[1].length} stycken`;
        if (item[1].length === 0) {
          checkOutList.removeChild(listGroupItem);
        }
        cartEmpty();
      };
      checkOutBtn.onclick = () => {
        checkOutModal();
      };

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
  } else {
    cartEmpty();
  }
}
function cartEmpty() {
  if (shoppingCart.length === 0) {
    const emptyCartDiv = document.createElement("div");
    const h5 = document.createElement("h5");
    checkOutList.appendChild(emptyCartDiv);
    emptyCartDiv.appendChild(h5);
    h5.innerText = "Här var det tomt, handla något!";
    emptyCartDiv.classList.add("row", "row-cols-1", "m-2");
    checkOutBtn.classList.add("d-none");
  }
}

function readMoreModal(cardTitle) {
  const modalHeader = document.getElementById("productModalLabel");
  const modalBody = document.getElementById("productModalText");
  const product = inventory.find((x) => x.name === cardTitle.innerText);
  modalHeader.innerText = product.name;
  modalBody.innerText = `Ingredienser: ${product.ingredients}`;
}
function checkOutModal() {
  const checkOutHeader = document.getElementById("checkOutModalLabel");
  const checkOutCloseBtn = document.getElementById("closeModalBtn");
  checkOutHeader.innerText = "Tack för din beställning";
  checkOutCloseBtn.onclick = () => {
    window.location.href = "index.html";
    shoppingCart = [];
    const stringifiedCart = JSON.stringify(shoppingCart);
    localStorage.setItem("shoppingCart", stringifiedCart);
  };
}

function addToCart(cardTitle) {
  const product = inventory.find((x) => x.name === cardTitle.innerText);
  shoppingCart.push(product);
  cartAmount();
  const stringifiedCart = JSON.stringify(shoppingCart);
  localStorage.setItem("shoppingCart", stringifiedCart);
}
function removeFromCart(listItemHeading) {
  const product = shoppingCart.find(
    (x) => x.name === listItemHeading.innerText
  );
  shoppingCart = shoppingCart.filter((item) => item !== product);
  cartAmount();
  totalSum();
  const stringifiedCart = JSON.stringify(shoppingCart);
  localStorage.setItem("shoppingCart", stringifiedCart);
}
function totalSum() {
  const sumText = document.getElementById("total");
  const checkOutModalBody = document.getElementById("checkOutModalText");
  let sum = 0;
  for (item of shoppingCart) {
    sum += item.price;
  }
  sumText.innerText = `${sum} kr`;
  checkOutModalBody.innerText = `Ditt totalbelopp blev ${sum} kr. Välkommen åter!`;
}

function cartAmount() {
  const b = document.getElementById("navbar");
  const nodes = b.getElementsByTagName("p");
  for (node of nodes) {
    node.innerText = `${shoppingCart.length} produkter`;
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
