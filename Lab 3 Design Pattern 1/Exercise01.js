// Exercise 01
// Use the Module pattern to create a shopping cart that has one private member: basket which is an Array, and the following public methods:

// upsertItem(item) add an item to basket if doesn't exist, or update if exist.
// getItemsCount() returns the total number of items in the basket.
// getTotalPrice() calculates the total price of items. Each item price is the product's price multiply item's count.
// removeItemById(id) removes an item from the basket. Every product item has the following structure:
// Item = {id: 0, product: {id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9.5}, count: 1}
// Once you're done, use the following code to test:

// const item1 = { id: 0, product: { id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9 }, count: 1 }
// const item2 = { id: 1, product: { id: 2, name: 'Tea', description: 'Oonlong Tea from China', price: 10 }, count: 5 }
// const item3 = { id: 2, product: { id: 3, name: 'Bottled Water', description: 'Bottled Water from US', price: 2 }, count: 30 }

// shoppingCart.upsertItem(item1);
// shoppingCart.upsertItem(item2);
// shoppingCart.upsertItem(item3);
// console.log(shoppingCart.getTotalPrice()); //Expected Result: 119
// item3.product.name = 'Himilayan Water';
// item3.product.price = 10;
// shoppingCart.upsertItem(item3);

// console.log(shoppingCart.getItemsCount()); //Expected Result: 3
// console.log(shoppingCart.getTotalPrice()); //Expected Result: 359
// shoppingCart.removeItemById(1);
// console.log(shoppingCart.getItemsCount()); //Expected Result: 2
// console.log(shoppingCart.getTotalPrice()); //Expected Result: 309

const shoppingCart = (function () {
    let basket = []; // Array of Items

    return {
        upsertItem: function(item) {
            let Updated = false;
            for(let i = 0; i < basket.length; i++) {
                if(basket[i].id == item.id) { // Item already exist in shoppingCart basket
                    basket[i].count = item.count;
                    basket[i].product.name = item.product.name;
                    basket[i].product.price = item.product.price;
                    Updated = true;
                } 
            }
            if(!Updated) {
                basket.push(item);
            }
        },
        getItemsCount: function() {
            return basket.length;
        },
        getTotalPrice: function() {
            // let totalPrice
            return basket.reduce((acc, item) => (acc + (item.product.price * item.count)), 0);
        },
        removeItemById: function (id) {
            basket = basket.filter(item => item.id != id);
        },
        getBasket: function() {
            return basket;
        }
    }
})();

const item1 = { id: 0, 
    product: { id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9 }, 
    count: 1 
};
const item2 = { id: 1, 
    product: { id: 2, name: 'Tea', description: 'Oonlong Tea from China', price: 10 }, 
    count: 5 
};
const item3 = { id: 2, 
    product: { id: 3, name: 'Bottled Water', description: 'Bottled Water from US', price: 2 }, 
    count: 30 
};

shoppingCart.upsertItem(item1);
shoppingCart.upsertItem(item2);
shoppingCart.upsertItem(item3);
// console.log(shoppingCart.getBasket());
// console.log(shoppingCart.getTotalPrice()); //Expected Result: 119
item3.product.name = 'Himilayan Water';
item3.product.price = 10;
shoppingCart.upsertItem(item3);

console.log(shoppingCart.getItemsCount()); //Expected Result: 3
console.log(shoppingCart.getTotalPrice()); //Expected Result: 359
shoppingCart.removeItemById(1);
console.log(shoppingCart.getItemsCount()); //Expected Result: 2
console.log(shoppingCart.getTotalPrice()); //Expected Result: 309

