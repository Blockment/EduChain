const submitButton = document.getElementById("submit-button");
let emailLoginInput = document.getElementById("email-input");
let passwordLoginInput = document.getElementById("password-input");

async function getLoginResponse() {
    let response = await fetch('http://localhost:8000/auth/login/', {
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

let destinationLocationAfterLogin = "assignments.html";

async function startLoggingInTasks(response) {
    let json = await response.json();
    saveLoginData(json);

    // localStorage.setItem("assignments", JSON.stringify(
    //     [
    //         {
    //             id: 1,
    //             date: "2021-04-05",
    //             due_date: "2021-09-05",
    //             name: "تمرین نخست",
    //             description: "فلوچارت و مبنا",
    //             file_address: "file:///Users/parsa/Desktop/CodeNameh.pdf",
    //             max_score: 20
    //         },
    //         {
    //             id: 2,
    //             date: "2021-05-05",
    //             due_date: "2021-10-05",
    //             name: "تمرین دوم",
    //             description: "شرط، حلقه و آرایه",
    //             file_address: "file:///Users/parsa/Desktop/CodeNameh.pdf",
    //             max_score: 25
    //         },
    //     ]
    // ));
    // localStorage.setItem("grades", JSON.stringify([]));
    // localStorage.setItem("submissions", JSON.stringify(
    //     []
    // ));
    if (destinationLocationAfterLogin !== "") document.location = destinationLocationAfterLogin;
}

function showErrorLogin() {
    alert("خطا");
}

async function login() {
    // await startLoggingInTasks();
    let response = await getLoginResponse();
    if (response.ok) await startLoggingInTasks(response);
    else showErrorLogin();
}

if (submitButton != null) submitButton.onclick = () => login();