let productID = window.location.pathname.split('/')[5];
let productName = document.querySelector(".product-info-main h2").innerHTML;
let productLink = window.location.href;
let storeName = document.querySelector(".product-info-main p").innerHTML;
let finalPrice = parseFloat(document.querySelector(".product-info-price").innerHTML.slice(1,));
let productImg = document.querySelector(".product-info-main-img img").src;
let cartItem = {
    "product_ID": productID,
    "product_name": productName,
    "product_Link": productLink,
    "store_name": storeName,
    "final_price": finalPrice,
    "product_img": productImg,
    "product_quantity": 0
};

const BUY_NOW_BUTTON = document.querySelector(".buy-now");
const ADD_BUTTON = document.querySelector(".add-to-cart");
ADD_BUTTON.addEventListener("click", addItemToCart);
BUY_NOW_BUTTON.addEventListener("click", addItemToCart);

function addItemToCart() {
    let cartProducts = localStorage.getItem("cartProducts");
    cartProducts = JSON.parse(cartProducts);

    if(cartProducts != null) {
        if(cartProducts[productID] === undefined) {
            cartProducts = {
                ...cartProducts, // for product that is added 1st time
                [productID]: cartItem
            };
        }
        cartProducts[productID].product_quantity += 1; // for products that are already in cart
    } else { //
        cartItem.product_quantity= 1;
        cartProducts = {
            [productID]: cartItem // for empty cart
        };
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}