let container = document.getElementById('container')
toggle = () => {
    container.classList.toggle('sign-in')
    container.classList.toggle('sign-up')
}

setTimeout(() => {
    container.classList.add('sign-in')
}, 200)
function render() {

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let pswrd = document.getElementById("pswrd");
    let cpswrd = document.getElementById("cpswrd");

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let pswrdError = document.getElementById("pswrdError");
    let cpswrdError = document.getElementById("cpswrdError");

    let isValid = true;

    // 🔁 reset
    document.querySelectorAll(".error-msg").forEach(e => e.style.display = "none");
    document.querySelectorAll("input").forEach(i => i.classList.remove("input-error"));

    // validations
    if (!name.value.trim()) {
        name.classList.add("input-error");
        name.placeholder = "Name is required";
        isValid = false;
    }

    if (!email.value.trim()) {
        email.classList.add("input-error");
        email.placeholder = "Email is required";
        isValid = false;
    } else if (!email.value.includes('@')) {
        email.value = "";
        email.classList.add("input-error");
        email.placeholder = "Include '@' in email";
        isValid = false;
    }

    if (!pswrd.value.trim()) {
        pswrd.classList.add("input-error");
        pswrd.placeholder = "Password is required";
        isValid = false;
    } else {
        // Password Complexity Check: Letter, Number, Special Char
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{1,}$/;
        if (!passwordRegex.test(pswrd.value)) {
            pswrd.value = "";
            pswrd.classList.add("input-error");
            pswrd.placeholder = "Need letter, number, special char";
            isValid = false;
        }
    }

    if (!cpswrd.value.trim()) {
        cpswrd.classList.add("input-error");
        cpswrd.placeholder = "Confirm password is required";
        isValid = false;
    } else if (pswrd.value !== cpswrd.value) {
        cpswrd.value = "";
        cpswrd.classList.add("input-error");
        cpswrd.placeholder = "Passwords do not match";
        isValid = false;
    }

    if (!isValid) return;

    // save data
    let data = {
        name: name.value,
        email: email.value,
        pswrd: pswrd.value
    };

    localStorage.setItem("data", JSON.stringify(data));
    Swal.fire({
        title: "Success!",
        text: "Registered Successfully",
        icon: "success",
        confirmButtonColor: "#0d6efd"
    }).then(() => {
        window.location.href = "post.html";
    });
}


function logout() {
    window.location.href = "/"
}

function signIn() {

    let username = document.getElementById("useremail");
    let password = document.getElementById("userpswrd");

    let usernameError = document.getElementById("useremailError");
    let passwordError = document.getElementById("passwordError");

    let getData = JSON.parse(localStorage.getItem("data"));
    let isValid = true;

    // reset
    document.querySelectorAll(".error-msg").forEach(e => e.style.display = "none");
    document.querySelectorAll("input").forEach(i => i.classList.remove("input-error"));

    if (!username.value.trim()) {
        username.classList.add("input-error");
        username.placeholder = "Username (Email) is required";
        isValid = false;
    } else if (!username.value.includes('@')) {
        username.value = "";
        username.classList.add("input-error");
        username.placeholder = "Invalid email format";
        isValid = false;
    }

    if (!password.value.trim()) {
        password.classList.add("input-error");
        password.placeholder = "Password is required";
        isValid = false;
    }

    if (!isValid) return;

    if (getData.email !== username.value) {
        Swal.fire({
            title: "Error!",
            text: "Invalid useremail",
            icon: "error",
            confirmButtonColor: "#dc3545"
        });
        return;
    }

    if (getData.pswrd !== password.value) {
        Swal.fire({
            title: "Error!",
            text: "Invalid password",
            icon: "error",
            confirmButtonColor: "#dc3545"
        });
        return;
    }

    window.location.href = "/post.html";
}
// // typing pr error khud remove ho
document.querySelectorAll("input").forEach(input => {
    // Store original placeholder
    input.dataset.placeholder = input.placeholder;

    input.addEventListener("input", () => {
        input.classList.remove("input-error");
        // Restore original placeholder
        if (input.dataset.placeholder) {
            input.placeholder = input.dataset.placeholder;
        }
    });

    // Also remove error on focus? Maybe too aggressive to remove on focus immediately. 
    // Usually standard to remove on input/change. Keeps error visible while user thinks.
    input.addEventListener("focus", () => {
        // Optionally clear placeholder text if it's the error message? 
        // But then the user sees nothing.
        // Let's stick to input event for removing error style.
    });
});

// Toggle Password Visibility
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", function () {
        const input = document.querySelector(this.getAttribute("toggle"));
        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
});

