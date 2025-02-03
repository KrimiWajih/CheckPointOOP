let tabprod = [
  { id: 1, name: "Samsung 1", image: "./images/1.png", price: 200 },
  { id: 2, name: "Samsung 2", image: "./images/2.jpg", price: 350 },
  { id: 3, name: "Samsung 3", image: "./images/3.jpg", price: 150 },
  { id: 4, name: "Samsung 4", image: "./images/4.jpg", price: 150 },
  { id: 5, name: "Samsung 5", image: "./images/5.jpg", price: 400 },
  { id: 6, name: "Samsung 6", image: "./images/6.jpeg", price: 200 },
  { id: 7, name: "Huawei 1", image: "./images/7.jpg", price: 320 },
  { id: 8, name: "Huawei 2", image: "./images/8.jpg", price: 180 },
];

let listproduct = document.querySelector(".listproducts");

tabprod.forEach((product) => {
  const productContainer = document.createElement("div");
  productContainer.classList.add(
    "productitem",
    "w-[180px]",
    "h-[280px]",
    "border-black",
    "border-2",
    "rounded-[16px]",
    "bg-[#eeeee6]",
    "relative",
    "flex",
    "flex-col"
  );
  productContainer.innerHTML = `<img src="./${product.image}" alt="${product.id}" class="drop-shadow-2xl h-[60%] rounded-[16px] w-[96%] p-2">
                        <p class="name flex self-center font-bold text-xl">${product.name}</p>
                        <p class="price flex self-center">$${product.price}</p>
                        <div class="flex justify-around "><button class="minus border-black border-2 w-[10%]">-</button> <h1 class="quantity">0</h1> <button class="plus border-black border-2 w-[10%]">+</button></div>
                        <button class="addtocart absolute bottom-[-18px] self-center w-[70%] h-[36px] border-black bg-orange-500 rounded-3xl">Add to Cart</button>`;
  listproduct.appendChild(productContainer);
});

let listminus = document.querySelectorAll(".minus");

let listplus = document.querySelectorAll(".plus");

let listquantity = document.querySelectorAll(".quantity");

let quantity = document.querySelectorAll(".quantity");

let addtocart = document.querySelectorAll(".addtocart");

let total = document.querySelector(".total");

let listcart = document.querySelector(".cart");

let removeitem = document.querySelectorAll(".remove-item");

listplus.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    listquantity[i].innerHTML = parseInt(listquantity[i].innerHTML) + 1;
  });
});

listminus.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (parseInt(listquantity[i].innerHTML) > 0) {
      listquantity[i].innerHTML = parseInt(listquantity[i].innerHTML) - 1;
    }
  });
});

class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class ShoppingCartItem extends Product {
  constructor(id, name, price, image, quantity) {
    super(id, name, price, image);
    this.quantity = quantity;
  }
  calculate() {
    return this.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  addtocart(obj) {
    const existingItem = this.cart.find((item) => item.id === obj.id);

    if (existingItem) {
      existingItem.quantity += obj.quantity;
    } else {
      this.cart.push(obj);
    }
    return this.cart;
  }
  removitem(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.display();
    total.innerHTML = this.totalcal();
  }
  display() {
    listcart.innerHTML = this.cart.map(
      (el) => `<div
            class="cartitems  drop-shadow-2xl w-[98%] bg-gray-200 border-black border-2 h-[100px] self-center rounded-2xl flex justify-between "
          >
            <img src="${el.image}" alt="" class="image rounded-2xl w-[15%]" />
            <p class="names w-[15%] font-bold p-8">${el.name}</p>
            <p class="prix w-[15%] font-bold  p-8">${el.price}</p>
            <p class="quant w-[15%] font-bold  p-8">${el.quantity}</p>
            <p class="subtotal w-[15%] font-bold  p-8">${el.calculate()}</p>
               <button
            class="remove-item m-6 w-[50px] h-[50px] border-black bg-white border-2 rounded-[15px]" data-id="${
              el.id
            }"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          </div>`
    );

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = parseInt(btn.getAttribute("data-id"));
        this.removitem(productId);
      });
    });
  }

  totalcal() {
    return this.cart.reduce((acc, el) => acc + el.price * el.quantity, 0);
  }
}

let shopcart = new ShoppingCart();

addtocart.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (quantity[i].innerHTML !== "0") {
      let newitem = new Product(
        tabprod[i].id,
        tabprod[i].name,
        tabprod[i].price,
        tabprod[i].image
      );
      console.log(newitem);
      let panier = new ShoppingCartItem(
        newitem.id,
        newitem.name,
        newitem.price,
        newitem.image,
        parseInt(quantity[i].innerHTML)
      );
      console.log(panier);
      shopcart.addtocart(panier);
      console.log(shopcart);
      shopcart.display();
      total.innerHTML = shopcart.totalcal();
    }
  });
});
