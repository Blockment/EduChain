const submitButton = document.getElementById("submit-button");
let emailLoginInput = document.getElementById("email-input");
let passwordLoginInput = document.getElementById("password-input");

async function getLoginResponse() {
    let response = await fetch('http://193.176.240.206:8000/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: emailLoginInput.value, password: passwordLoginInput.value})
    });
    return response;
}

function saveLoginData(json) {
    localStorage.setItem("is-logged-in", "true");
    localStorage.setItem("token", json.access);
}

let destinationLocationAfterLogin = "index.html";
async function startLoggingInTasks(response) {
    let json = await response.json();
    saveLoginData(json);
    if (destinationLocationAfterLogin !== "") document.location = destinationLocationAfterLogin;
}

function showErrorLogin() {
    alert("خطا");
}

async function login() {
    let response = await getLoginResponse();
    if (response.ok) await startLoggingInTasks(response);
    else showErrorLogin();
}

if (submitButton != null) submitButton.onclick = () => login();