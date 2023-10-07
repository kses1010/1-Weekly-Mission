import {
    emailErrorMessageElement,
    emailInput,
    passwordErrorMessageElement,
    passwordInput,
    removeErrorMessage,
    showErrorMessage,
    toggleEyeButton,
    validateEmailType,
    validatePassword,
} from "./sign.js";
import {errorMessages} from "./error-message.js";
import {passwordRegex} from "./constant.js";

const signUpButton = document.querySelector('.btn.sign-up');
const passwordRepeatInput = document.querySelector('#sign-password-repeat');
const passwordRepeatErrorMessageElement = document.createElement("p");
const passwordRepeatEyeButton = document.querySelector('.eye-off-check');

function validateSignUpEmail(input) {
    if (validateEmailType(input)) {
        if (input === "test@codeit.com") {
            showErrorMessage(emailInput, emailErrorMessageElement, errorMessages.email.duplicated);
            return false;
        }
        removeErrorMessage(emailInput, emailErrorMessageElement);
        return true;
    }
}

function validateSignUpPassword(input) {
    if (validatePassword(input)) {
        if (!passwordRegex.test(input)) {
            showErrorMessage(passwordInput, passwordErrorMessageElement, errorMessages.password.typeInvalid);
            return false;
        }
        removeErrorMessage(passwordInput, passwordErrorMessageElement);
        return true;
    }
}

function validatePasswordRepeatMatch(input) {
    const password = passwordInput.value;
    if (!input || password !== input) {
        showErrorMessage(passwordRepeatInput, passwordRepeatErrorMessageElement, errorMessages.password.notMatched);
        return false;
    }
    removeErrorMessage(passwordRepeatInput, passwordRepeatErrorMessageElement);
    return true;
}

const signUp = (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordRepeat = passwordRepeatInput.value;

    if (validateSignUpEmail(email) && validateSignUpPassword(password) &&
        validatePasswordRepeatMatch(passwordRepeat)) {
        location.href = "/folder.html";
    }
}

emailInput.addEventListener("focusout", ({target}) => {
    validateSignUpEmail(target.value);
});
passwordInput.addEventListener("focusout", ({target}) => {
    validateSignUpPassword(target.value);
});
passwordRepeatInput.addEventListener("focusout", ({target}) => {
    validatePasswordRepeatMatch(target.value);
});
passwordRepeatEyeButton.addEventListener("click", () => {
    toggleEyeButton(passwordRepeatInput, passwordRepeatEyeButton);
});
signUpButton.addEventListener("click", signUp);
