'use strict'

let userName,
    userPassword,
    userEmail,
    userMessage;

function checkIfValid(e) {
    let target    = e.target,
        initiator = target.name,
        value     = target.value,
        status    = testValidity(initiator, value);
    highlightInput(target, status);
    setVariables(initiator, value, status, target);
}

function testValidity(initiator, value) {
    switch (initiator) {
        case 'name':
            return checkName(value);
        case 'email':
            return validateEmail(value);
        case 'password':
            return value.length >= 8;
        case 'message':
            return Boolean(value);
    }
}

function checkName(value) {
    if( !(/^[a-zA-Z]+$/.test(value)) ) {
        return;
    }

    return value.length > 3;
}

function validateEmail(email) {
    const regex = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    );

    if (regex.test(email)) {
        return true;
    }

    return false;
}

function setVariables(initiator, value, status, target) {
    if(!status) {
        setVariable(initiator, undefined);
        showErrorMessage(target);
        return;
    }

    setVariable(initiator, value);
    hideErrorMessage(target);
}

function setVariable(initiator, value) {
    switch (initiator) {
        case 'name':
            userName = value;
            break;
        case 'email':
            userEmail = value;
            break;
        case 'password':
            userPassword = value;
            break;
        case 'message':
            userMessage = value;
            break;
    }
}

function showErrorMessage(target) {
    let errorMessage = target.nextElementSibling;

    errorMessage.classList.add('show');
}

function hideErrorMessage(target) {
    let errorMessage = target.nextElementSibling;

    errorMessage.className = 'error-message';
}

function highlightInput(target, status) {
    target.className = '';
    if( !status ) {
        target.classList.add('error');
        return;
    }
    target.classList.add('pass');
}

function checkIfErrorShown(target) {
    let errorMessage = target.nextElementSibling;

    return errorMessage.classList.contains('error-message');
}

function checkData(e) {
    e.preventDefault();
    if( !(userName && userEmail && userPassword && userMessage) ) {
        displayCorrespondingMessage();
        return;
    }

    let callToAction = document.getElementById('cta'),
        showSuccess  = document.getElementById('success-messages');

    callToAction.style.display = 'none';
    showSuccess.classList.add('show');
    clearForm();
    scrollToTop(e);
}

function displayCorrespondingMessage() {
    if (!userName) {
        let inputTarget  = document.getElementsByName('name')[0],
            errorMessage = inputTarget.nextElementSibling;

        errorMessage.classList.add('show');
    }

    if (!userEmail) {
        let inputTarget  = document.getElementsByName('email')[0],
            errorMessage = inputTarget.nextElementSibling;

        errorMessage.classList.add('show');
    }

    if (!userPassword) {
        let inputTarget  = document.getElementsByName('password')[0],
            errorMessage = inputTarget.nextElementSibling;

        errorMessage.classList.add('show');
    }

    if (!userMessage) {
        let inputTarget  = document.getElementsByName('message')[0],
            errorMessage = inputTarget.nextElementSibling;

        errorMessage.classList.add('show');
    }
}

function clearForm() {
    let form   = document.getElementsByTagName('form')[0],
        inputs = document.getElementsByTagName('input');

    for (let input of inputs) {
        input.className = ``;
    }
    form.reset();
}