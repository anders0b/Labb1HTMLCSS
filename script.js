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

const inventory = [
  new Item(
    1,
    "Kardemummabulle",
    49,
    "/images/boximg1.jpg",
    "En bulle som smakar kardeumma",
    "Mjöl, Kardemumma, Mjölk"
  ),
  new Item(
    2,
    "Kanelbulle",
    29,
    "/images/boximg2.jpg",
    "En riktigt fin kanelbulle",
    "Mjöl, Kanel, Mjölk, Jäst"
  ),
  new Item(
    3,
    "Bulle",
    29,
    "/images/boximg2.jpg",
    "En riktigt fin kanelbulle",
    "Mjöl, Kanel, Mjölk, Jäst"
  ),
];

const inventoryList = document.querySelector("#inventory");

for (const item of inventory) {
  const col = document.createElement("div");
  const card = document.createElement("div");
  const img = document.createElement("img");
  img.setAttribute("src", item.img);
  img.setAttribute("style", "height: 200px;, background-size:cover");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  const leadText = document.createElement("p");
  const cardText = document.createElement("p");
  const addToCartBtn = document.createElement("button");
  const readMoreBtn = document.createElement("button");

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

  inventoryStyle(
    col,
    card,
    cardBody,
    cardTitle,
    leadText,
    addToCartBtn,
    readMoreBtn
  );
}

function inventoryStyle(
  col,
  card,
  cardBody,
  cardTitle,
  leadText,
  addToCartBtn,
  readMoreBtn
) {
  col.classList.add("col");
  card.classList.add("card", "mt-2", "align-items-center");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  leadText.classList.add("lead");
  addToCartBtn.classList.add("btn", "btn-primary");
  readMoreBtn.classList.add("btn", "btn-secondary");
}
