const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const errorMessages = {
    email: {
        empty: "이메일을 입력해주세요.",
        invalid: "이메일을 확인해주세요."
    },
    password: {
        empty: "비밀번호를 입력해주세요.",
        invalid: "비밀번호를 확인해주세요."
    }
};

const emailInput = document.querySelector('#signin-email');
const passwordInput = document.querySelector('#signin-password');
const submitButton = document.querySelector('.btn.login');
const eyeButton = document.querySelector('.eye-off');

const emailErrorMessageElement = document.createElement("p");
const passwordErrorMessageElement = document.createElement("p");

function validateEmailType(e) {
    const input = e.target.value.trimEnd();
    if (emailRegex.test(input)) {
        removeErrorMessage(emailInput, emailErrorMessageElement);
    } else {
        let errorMessage = "";
        if (!input) {
            errorMessage = errorMessages.email.empty;
        } else if (!emailRegex.test(input)) {
            errorMessage = errorMessages.email.invalid;
        }
        showErrorMessage(emailInput, emailErrorMessageElement, errorMessage);
    }
}

function showErrorMessage(input, errorMessageElement, errorMessage) {
    input.classList.add("error-input");
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add("error-input-message");
    input.after(errorMessageElement);
}

function removeErrorMessage(input, errorMessageElement) {
    input.classList.remove("error-input");
    errorMessageElement.remove();
}

function validatePassword(e) {
    const input = e.target.value;
    if (input) {
        removeErrorMessage(passwordInput, passwordErrorMessageElement);
    } else if (!input) {
        showErrorMessage(passwordInput, passwordErrorMessageElement, errorMessages.password.empty);
    }
}

function login(e) {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === "test@codeit.com" && password === "codeit101") {
        location.href = "/folder.html";
        return;
    }

    showErrorMessage(emailInput, emailErrorMessageElement, errorMessages.email.invalid);
    showErrorMessage(passwordInput, passwordErrorMessageElement, errorMessages.password.invalid);
}

function toggleEyeButton(e) {
    if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
        eyeButton.setAttribute("src", "images/eye-on.svg");
    } else {
        passwordInput.setAttribute("type", "password");
        eyeButton.setAttribute("src", "images/eye-off.svg");
    }
}

emailInput.addEventListener("focusout", validateEmailType);
passwordInput.addEventListener("focusout", validatePassword);
submitButton.addEventListener("click", login);
eyeButton.addEventListener("click", toggleEyeButton);
