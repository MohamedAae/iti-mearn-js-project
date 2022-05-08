'use strict'

let products = {
    data: [
        {
            category   : "Clothes",
            productName: "Jeans",
            price      : "200",
            image      : "./imgs/clothes/jeans.jpg",
        },
        {
            productName: "HP ZenBook",
            category   : "Laptops",
            price      : "12000",
            image      : "./imgs/laptops/zenbook.jpg",
        },
        {
            category   : "Clothes",
            productName: "T-Shirt",
            price      : "149",
            image      : "./imgs/clothes/t-shirt.jpg",
        },
        {
            category   : "Clothes",
            productName: "Navy Jeans",
            price      : "169",
            image      : "./imgs/clothes/navy-jeans.jpg",
        },
        {
            category   : "Clothes",
            productName: "T-Shirt",
            price      : "210",
            image      : "./imgs/clothes/longsleeve-tshirt.jpg",
        },
        {
            productName: "Acer Nitro",
            category   : "Laptops",
            price      : "10650",
            image      : "./imgs/laptops/acer-nitro.jpg",
        },
        {
            productName: "X Pro",
            category   : "Laptops",
            price      : "13210",
            image      : "./imgs/laptops/x-pro.png",
        },
        {
            productName: "Opo Reno 7",
            category   : "Mobiles",
            price      : "4200",
            image      : "./imgs/mobiles/opo.jpg",
        },
        {
            productName: "Samsung A52",
            category   : "Mobiles",
            price      : "6540",
            image      : "./imgs/mobiles/samsung_a52.jpg",
        },
        {
            productName: "iPhone 11",
            category   : "Mobiles",
            price      : "6540",
            image      : "./imgs/mobiles/iphone11.jpeg",
        },
    ],
};

function randomizProducts(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomValue = Math.floor( Math.random() * (i + 1) );
        [array[i], array[randomValue]] = [array[randomValue], array[i]];
    }
}

function populateData() {
    randomizProducts(products.data);

    for (let product of products.data) {
        let productCard   = document.createElement('div'),
            imageDiv      = document.createElement('div'),
            image         = document.createElement('img'),
            metaDataDiv   = document.createElement('div'),
            name          = document.createElement('h3'),
            price         = document.createElement('h5'),
            addToCartSpan = document.createElement('span');

        productCard.classList.add('card', product.category, 'hide');

        image.setAttribute('src', product.image);
        imageDiv.classList.add('image-container');
        imageDiv.appendChild(image);

        productCard.appendChild(imageDiv);

        metaDataDiv.classList.add('container');
        name.classList.add('product-name');
        name.innerText = product.productName;
        metaDataDiv.appendChild(name);
        price.innerText = `£ ${product.price}`;

        cartListener(addToCartSpan);
        price.appendChild(addToCartSpan);
        metaDataDiv.appendChild(price);

        productCard.appendChild(metaDataDiv);
        document.getElementById('products').appendChild(productCard);
    }
}

function applyProductsFilter(e, value) {
    let category = e ? e.target.getAttribute('data-category') : value;

    setActiveButton(category);
    displayCards(category);
}

function setActiveButton(caller) {
    let buttons = document.querySelectorAll('[data-category]');

    for (let button of buttons) {
        if (caller.toUpperCase() == button.getAttribute('data-category').toUpperCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

function displayCards(category) {
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        if (category.toUpperCase() == 'all'.toUpperCase()) {
            card.classList.remove('hide');
        } else {
            if (card.classList.contains(category)) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    populateData();
    applyProductsFilter(null, 'all');
});
