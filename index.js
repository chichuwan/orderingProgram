
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    } 

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('food-item-button');
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0 ) {
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target;
    var foodItem = button.parentElement.parentElement;
    var title = foodItem.getElementsByClassName('food-item-title')[0].innerText;
    var price = foodItem.getElementsByClassName('food-item-price')[0].innerText;
    var foodImg = foodItem.getElementsByClassName('food-item-image')[0].src;
    addFoodToCart(title, price, foodImg);
    updateCartTotal()
}

function addFoodToCart(title, price, foodImg) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the order list');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${foodImg}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`; 
        cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
for(var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('₱', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    }
    var quant = cartItemContainer.getElementsByClassName('cart-quantity-input');
    var arry = [];
    for(var i = 0; i < quant.length; i++) {
        var quanti = quant[i];
        arry.push(quanti.value);
    }
    var foodTitle = cartItemContainer.getElementsByClassName('cart-item-title');
    var foodTitleArry = [];
    for(var i = 0; i < foodTitle.length; i++) {
        var foodItemTitle = foodTitle[i];
        foodTitleArry.push(foodItemTitle.innerText);
    }
    var foodPrice = cartItemContainer.getElementsByClassName('cart-price');
    var foodPriceArry = [];
    for(var i = 0; i < foodPrice.length; i++) {
        var foodItemPrice = foodPrice[i];
        foodPriceArry.push(foodItemPrice.innerText);
    }

    localStorage.setItem('arry', JSON.stringify(arry));
    localStorage.setItem('foodTitleArry', JSON.stringify(foodTitleArry));
    localStorage.setItem('foodPriceArry', JSON.stringify(foodPriceArry));


    document.getElementsByClassName('cart-total-price')[0].innerText = '₱'+total;
    console.log(price);
}

function toPay(payment) {
    total = document.getElementsByClassName('cart-total-price')[0].innerText;
    var totalPrice = parseFloat(total.replace('₱', ''));
    var total = document.getElementsByClassName('cart-total')[0].innerText;
    var paymentValue = payment;
    
    localStorage.setItem('total', total);
    localStorage.setItem('paymentValue', paymentValue);

    if(payment >= totalPrice) {
        window.location.href="./receipt.html";
    }

    if(payment < totalPrice) {
        alert('Sorry, your money is not enough...');
    }

    if(totalPrice == 0) {
        alert('Add something in your order list first.')
        window.location.href="./index.html";
    }
}