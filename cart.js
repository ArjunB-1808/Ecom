let cart = [];

function addToCart(item, price) {
    let existingItem = cart.find(cartItem => cartItem.name === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: item, price: price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(itemName) {
    cart = cart.filter(cartItem => cartItem.name !== itemName);
    updateCart();
}

function updateQuantity(itemName, quantity) {
    let existingItem = cart.find(cartItem => cartItem.name === itemName);
    if (existingItem) {
        existingItem.quantity = parseInt(quantity);
        if (existingItem.quantity <= 0) {
            removeFromCart(itemName);
        }
    }
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ""; 
    let totalPrice = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = () => removeFromCart(item.name);

        li.appendChild(removeButton);
        cartItems.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    // Display the total price
    let totalElement = document.getElementById("totalPrice");
    totalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}
