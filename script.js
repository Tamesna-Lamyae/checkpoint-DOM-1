// Create the main container for the shopping cart
const cartContainer = document.createElement('div');
cartContainer.className = 'cart';
cartContainer.style.width = '350px';
cartContainer.style.margin = '20px auto';
cartContainer.style.padding = '20px';
cartContainer.style.backgroundColor = '#ffffff';
cartContainer.style.borderRadius = '8px';
cartContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
cartContainer.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(cartContainer);

// Create and style the cart title
const title = document.createElement('h2');
title.textContent = 'Your Shopping Cart';
title.style.textAlign = 'center';
title.style.color = '#18476f';
cartContainer.appendChild(title);

// Sample items data
const items = [
    { name: 'LAPTOP', price: 4000.4 },
    { name: 'PHONE', price: 3000 }
];

// Function to update the total price
function updateTotalPrice() {
    const totalPriceElement = document.querySelector('#total-price');
    let totalPrice = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.querySelector('.price').textContent.replace(' DH ', ''));
        totalPrice += quantity * price;
    });
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} DH`;
}

// Function to create each cart item
function createCartItem(itemData) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'space-between';
    item.style.padding = '10px 0';
    item.style.borderBottom = '1px solid #ddd';

    const itemName = document.createElement('span');
    itemName.className = 'item-name';
    itemName.textContent = itemData.name;
    itemName.style.flex = '1';
    itemName.style.color = '#333';
    item.appendChild(itemName);

    const likeButton = document.createElement('button');
    likeButton.className = 'like';
    likeButton.textContent = '❤';
    likeButton.style.background = 'none';
    likeButton.style.border = 'none';
    likeButton.style.cursor = 'pointer';
    likeButton.style.color = 'gray';
    likeButton.style.fontSize = '18px';
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('liked');
        likeButton.style.color = likeButton.classList.contains('liked') ? 'red' : 'gray';
    });
    item.appendChild(likeButton);

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `${itemData.price.toFixed(2)} DH`;
    price.style.margin = '0 10px';
    price.style.color = '#18476f';
    price.style.fontWeight = 'bold';
    item.appendChild(price);

    const minusButton = document.createElement('button');
    minusButton.className = 'minus';
    minusButton.textContent = '-';
    minusButton.style.background = 'none';
    minusButton.style.border = 'none';
    minusButton.style.cursor = 'pointer';
    minusButton.style.color = '#18476f';
    minusButton.style.fontSize = '16px';
    minusButton.addEventListener('click', () => {
        const quantityElement = item.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = --quantity;
            updateTotalPrice();
        }
    });
    item.appendChild(minusButton);

    const quantity = document.createElement('span');
    quantity.className = 'quantity';
    quantity.textContent = '1';
    quantity.style.margin = '0 10px';
    quantity.style.color = '#18476f';
    quantity.style.fontWeight = 'bold';
    item.appendChild(quantity);

    const plusButton = document.createElement('button');
    plusButton.className = 'plus';
    plusButton.textContent = '+';
    plusButton.style.background = 'none';
    plusButton.style.border = 'none';
    plusButton.style.cursor = 'pointer';
    plusButton.style.color = '#18476f';
    plusButton.style.fontSize = '16px';
    plusButton.addEventListener('click', () => {
        const quantityElement = item.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = ++quantity;
        updateTotalPrice();
    });
    item.appendChild(plusButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.style.background = 'none';
    deleteButton.style.border = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.color = '#e63946';
    deleteButton.style.fontSize = '16px';
    deleteButton.addEventListener('click', () => {
        item.remove();
        updateTotalPrice();
    });
    item.appendChild(deleteButton);

    cartContainer.appendChild(item);
}

// Create each cart item and add to the cart
items.forEach(itemData => createCartItem(itemData));

// Create and style the total price section
const totalContainer = document.createElement('h3');
totalContainer.style.textAlign = 'right';
totalContainer.style.color = '#18476f';
totalContainer.style.marginTop = '20px';
totalContainer.innerHTML = 'Total: <span id="total-price">0.00 DH</span>';
cartContainer.appendChild(totalContainer);

// Initial calculation of the total price on page load
updateTotalPrice();
