'use strict'

let cartItems = 0;

let toggleMenuOnClick = function () {
    let toggleButton	= document.getElementById('toggle-menu'),
        mobileMenu		= document.getElementsByClassName('mobile-menu')[0];

    toggleButton.addEventListener('click', function(){
        mobileMenu.classList.toggle('d-none');
    });
}

function scrollToTop(e) {
    e.preventDefault();

    const DOCUMENT_ELE = document.documentElement;
    DOCUMENT_ELE.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideBackToTop() {
    const DOCUMENT_ELE = document.documentElement;
    let bactToTop = document.getElementById('scroll-to-top');

    if (document.body.scrollTop > 20 || DOCUMENT_ELE.scrollTop > 20) {
        bactToTop.style.display = 'block';
    } else {
        bactToTop.style.display = 'none';
    }
}

function cartListener(addToCartSpan) {
    addToCartSpan.addEventListener('click', function() {
        ++cartItems;
        changeProductToAdded(addToCartSpan);
        updateCartIcon();
    });
}

function changeProductToAdded(addToCartSpan) {
    addToCartSpan.parentElement.classList.add('added');
    addToCartSpan.style.display = 'none'
}

function updateCartIcon() {
    let bagItemsSpan = document.getElementById('bag-items');

    if(cartItems) {
        bagItemsSpan.classList.add('show');
        bagItemsSpan.innerText = cartItems;
    } else {
        bagItemsSpan.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleMenuOnClick();
});

document.addEventListener('scroll', function() {
    hideBackToTop();
});
