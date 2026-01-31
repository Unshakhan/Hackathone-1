// Auth Page Logic
const container = document.getElementById('container');
const toggle = () => {
    if (container) {
        container.classList.toggle('sign-in');
        container.classList.toggle('sign-up');
    }
}

if (container) {
    setTimeout(() => {
        container.classList.add('sign-in');
    }, 200);
}
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

//     var name = document.getElementById("name").value
//     var email = document.getElementById("email").value
//     var pswrd = document.getElementById("pswrd").value
//     var cpswrd = document.getElementById("cpswrd").value
//     // console.log(name);


//     var data = {
//         name,
//         email,
//         pswrd,
//         cpswrd
//     }

//     if (!name) {
//         alert("Name is required")
//     } else if (pswrd !== cpswrd) {
//         alert("Passwords should be identical")
//     } else if (!email) {
//         alert("email is required")
//     } else if (!pswrd) {
//         alert("password is required")
//     } else if (!cpswrd) {
//         alert("confirm password is required")
//     } else {
//         localStorage.setItem("data", JSON.stringify(data))
//         alert(name + " Registered Successfully")
//         window.location.href = "/post.html"
//         //  toggle()
//     }
//     console.log(pswrd);
// }

// function renderData() {
//     var getData = JSON.parse(localStorage.getItem("data"))
//     console.log(getData);

// }

// CV App Logic
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cvForm")) {
        loadCV();
    }
});

function loadCV() {
    let userData = JSON.parse(localStorage.getItem("data"));
    if (!userData) {
        window.location.href = "/";
        return;
    }

    let cvData = JSON.parse(localStorage.getItem("cvData"));
    if (cvData) {
        document.getElementById("fullName").value = cvData.fullName || "";
        document.getElementById("email").value = cvData.email || "";
        document.getElementById("phone").value = cvData.phone || "";
        document.getElementById("summary").value = cvData.summary || "";
        document.getElementById("experience").value = cvData.experience || "";
        document.getElementById("education").value = cvData.education || "";
        document.getElementById("skills").value = cvData.skills || "";
        document.getElementById("projects").value = cvData.projects || "";
    } else {
        document.getElementById("fullName").value = userData.name || "";
        document.getElementById("email").value = userData.email || "";
    }
}

function saveCV() {
    let cvData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        summary: document.getElementById("summary").value,
        experience: document.getElementById("experience").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value,
        projects: document.getElementById("projects").value
    };

    localStorage.setItem("cvData", JSON.stringify(cvData));

    Swal.fire({
        title: "Saved!",
        text: "Your CV has been saved successfully.",
        icon: "success",
        confirmButtonColor: "#EEAECA"
    });
}

function selectTemplate(url) {
    if (!url.includes('designId=')) {
        localStorage.removeItem('tempStyles');
    }
    let cvData = JSON.parse(localStorage.getItem("cvData"));
    if (!cvData) {
        // If no data exists, we can still go to the template,
        // the template itself will show dummy data if it finds no cvData.
        // Or we can pre-populate it here. Let's let the template handle the "dummy" state.
        console.log("No CV data found, template will show dummy text.");
    }
    window.location.href = url;
}

// --- ADVANCED EDITOR LOGIC ---

let undoStack = [];

function initEditor(templateId) {
    const editorHtml = `
        <div class="editor-toggle" onclick="toggleSidebar()">
            <i class="fa-solid fa-paintbrush"></i>
        </div>
        <div class="editor-sidebar" id="editorSidebar">
            <h4 class="fw-bold mb-4">Design Editor</h4>
            
            <div class="editor-section">
                <h6>Brand Colors</h6>
                <div class="color-swatch-group">
                    <div class="color-swatch" style="background: #EEAECA" onclick="updateStyle('--cv-primary-color', '#EEAECA')"></div>
                    <div class="color-swatch" style="background: #2D3436" onclick="updateStyle('--cv-primary-color', '#2D3436')"></div>
                    <div class="color-swatch" style="background: #0984e3" onclick="updateStyle('--cv-primary-color', '#0984e3')"></div>
                    <div class="color-swatch" style="background: #6c5ce7" onclick="updateStyle('--cv-primary-color', '#6c5ce7')"></div>
                    <div class="color-swatch" style="background: #00b894" onclick="updateStyle('--cv-primary-color', '#00b894')"></div>
                </div>
            </div>

            <div class="editor-section">
                <h6>Typography</h6>
                <button class="font-option" style="font-family: 'Inter'" onclick="updateStyle('--cv-font-main', 'Inter')">Modern Sans (Inter)</button>
                <button class="font-option" style="font-family: 'Playfair Display'" onclick="updateStyle('--cv-font-main', 'Playfair Display')">Elegant Serif</button>
                <button class="font-option" style="font-family: 'Montserrat'" onclick="updateStyle('--cv-font-main', 'Montserrat')">Geometric (Montserrat)</button>
                <button class="font-option" style="font-family: 'Poppins'" onclick="updateStyle('--cv-font-main', 'Poppins')">Friendly (Poppins)</button>
            </div>

            <div class="editor-section">
                <h6>Actions</h6>
                <div class="d-flex gap-2 mb-2">
                    <button class="btn btn-outline-secondary btn-sm flex-grow-1" onclick="undoAction()">
                        <i class="fa-solid fa-rotate-left me-2"></i>Undo
                    </button>
                    <button class="btn btn-primary btn-sm flex-grow-1" onclick="saveDesign('${templateId}')">
                        <i class="fa-solid fa-floppy-disk me-2"></i>Save
                    </button>
                </div>
                <button class="btn btn-outline-dark btn-sm w-100 mb-2" onclick="window.print()">
                    <i class="fa-solid fa-download me-2"></i>Download PDF
                </button>
                <button class="btn btn-dark btn-sm w-100" onclick="window.location.href='post.html'">
                    <i class="fa-solid fa-house me-2"></i>Home
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', editorHtml);
}

function toggleSidebar() {
    document.getElementById('editorSidebar').classList.toggle('active');
}

function updateStyle(property, value) {
    // Push current state to undo stack before changing
    let currentStyles = JSON.parse(localStorage.getItem('tempStyles')) || {};
    undoStack.push(JSON.stringify(currentStyles));

    // Limit stack size to 20
    if (undoStack.length > 20) undoStack.shift();

    document.documentElement.style.setProperty(property, value);

    let tempStyles = JSON.parse(localStorage.getItem('tempStyles')) || {};
    tempStyles[property] = value;
    localStorage.setItem('tempStyles', JSON.stringify(tempStyles));
}

function undoAction() {
    if (undoStack.length === 0) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Nothing to undo',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    let previousState = JSON.parse(undoStack.pop());
    localStorage.setItem('tempStyles', JSON.stringify(previousState));

    // Reapply all styles from previous state
    // Reset to defaults first for unset variables
    const defaults = {
        '--cv-primary-color': '#EEAECA',
        '--cv-font-main': 'Inter'
    };

    for (let prop in defaults) {
        document.documentElement.style.setProperty(prop, previousState[prop] || defaults[prop]);
    }
}

function saveDesign(templateId) {
    let myDesigns = JSON.parse(localStorage.getItem('myDesigns')) || [];
    let styles = JSON.parse(localStorage.getItem('tempStyles')) || {};

    const newDesign = {
        id: Date.now(),
        templateId: templateId,
        styles: styles,
        date: new Date().toLocaleDateString()
    };

    myDesigns.push(newDesign);
    localStorage.setItem('myDesigns', JSON.stringify(myDesigns));

    Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Your design has been added to My Designs.',
        showConfirmButton: false,
        timer: 1500
    });
}

function loadDesignStyles(designId) {
    if (!designId) return loadGlobalStyles();

    let myDesigns = JSON.parse(localStorage.getItem('myDesigns')) || [];
    let design = myDesigns.find(d => d.id == designId);

    if (design && design.styles) {
        for (let prop in design.styles) {
            document.documentElement.style.setProperty(prop, design.styles[prop]);
        }
    }
}

function loadGlobalStyles() {
    let tempStyles = JSON.parse(localStorage.getItem('tempStyles')) || {};
    for (let prop in tempStyles) {
        document.documentElement.style.setProperty(prop, tempStyles[prop]);
    }
}

function getDummyData() {
    return {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        summary: "A highly motivated professional with a strong background in software development and project management. Passionate about creating efficient and scalable solutions.",
        experience: "• Senior Developer at Tech Solutions (2020 - Present)\n- Led a team of 5 developers to build a robust e-commerce platform.\n- Improved system performance by 30% through code optimization.\n\n• Junior Developer at Innovate Web (2018 - 2020)\n- Developed responsive web applications using HTML, CSS, and JavaScript.\n- Collaborated with designers to implement UI/UX improvements.",
        education: "• Bachelor of Science in Computer Science\nUniversity of Technology (2014 - 2018)\n\n• High School Diploma\nCity Central High (2012 - 2014)",
        skills: "JavaScript, HTML5, CSS3, React, Node.js, Project Management, SQL, Git",
        projects: "• Portfolio Website: A personal showcase of projects built with modern web technologies.\n• Task Tracker App: A productivity tool for managing daily tasks and deadlines.\n• E-commerce Dashboard: A data visualization tool for tracking sales and inventory."
    };
}

function logout() {
    window.location.href = "/"
}

function signIn() {
    try {
        let username = document.getElementById("useremail");
        let password = document.getElementById("userpswrd");

        if (!username || !password) {
            console.error('Sign-in form elements not found');
            return;
        }

        let getData = getStorageData('data', null);

        if (!getData) {
            Swal.fire({
                title: "Error!",
                text: "No account found. Please sign up first.",
                icon: "error",
                confirmButtonColor: "#dc3545"
            });
            return;
        }

        let isValid = true;

        // Reset error states
        document.querySelectorAll(".error-msg").forEach(e => e.style.display = "none");
        document.querySelectorAll("input").forEach(i => i.classList.remove("input-error"));

        // Validation
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

        // Check credentials
        if (getData.email !== username.value) {
            Swal.fire({
                title: "Error!",
                text: "Invalid email",
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

        window.location.href = "post.html";
    } catch (error) {
        console.error('Sign-in error:', error);
        Swal.fire({
            title: "Error!",
            text: "An error occurred during sign-in. Please try again.",
            icon: "error",
            confirmButtonColor: "#dc3545"
        });
    }
}
// sign in
// function signIn() {
//     let username = document.getElementById("username");
//     let password = document.getElementById("userpswrd");

//     let usernameError = document.getElementById("usernameError");
//     let passwordError = document.getElementById("passwordError");

//     let getData = JSON.parse(localStorage.getItem("data"));

//     let isValid = true;

//     // reset
//     username.classList.remove("input-error");
//     password.classList.remove("input-error");
//     usernameError.style.display = "none";
//     passwordError.style.display = "none";

//     // username validation
//     if (!username.value.trim()) {
//         username.classList.add("input-error");
//         usernameError.innerText = "Username is required";
//         usernameError.style.display = "block";
//         isValid = false;
//     }

//     // password validation
//     if (!password.value.trim()) {
//         password.classList.add("input-error");
//         passwordError.innerText = "Password is required";
//         passwordError.style.display = "block";
//         isValid = false;
//     }

//     if (!isValid) return;

//     // credentials check
//     if (getData.name !== username.value) {
//         alert("Invalid username");
//         return;
//     }

//     if (getData.pswrd !== password.value) {
//         alert("Invalid password");
//         return;
//     }

//     window.location.href = "/post.html";
// }
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
// Theme Toggle Logic
function toggleTheme() {
    const checkbox = document.getElementById('theme-toggle');
    if (!checkbox) return;

    const theme = checkbox.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Improved initTheme function
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const checkbox = document.getElementById('theme-toggle');

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (checkbox) {
        checkbox.checked = savedTheme === 'dark';
    }
}

// Navbar User Menu Logic
function initNavbar() {
    const userData = JSON.parse(localStorage.getItem('data'));
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    const navImg = document.getElementById('nav-user-dp');
    const navInitial = document.getElementById('nav-user-initial');

    if (userData && navInitial) {
        const firstLetter = userData.name.charAt(0).toUpperCase();
        navInitial.innerText = firstLetter;
    }

    if (cvData && cvData.profilePic && navImg) {
        navImg.src = cvData.profilePic;
        navImg.style.display = 'block';
        if (navInitial) navInitial.style.display = 'none';
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

function triggerNavbarDPUpload() {
    const input = document.getElementById('navbarDpInput');
    if (input) input.click();
}

function uploadNavbarDP(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Image = e.target.result;
            let cvData = JSON.parse(localStorage.getItem('cvData')) || {};
            cvData.profilePic = base64Image;
            localStorage.setItem('cvData', JSON.stringify(cvData));

            // Update UI globally
            updateDPUI(base64Image);

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'DP updated!',
                showConfirmButton: false,
                timer: 1500
            });

            const dropdown = document.getElementById('userDropdown');
            if (dropdown) dropdown.classList.remove('active');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function updateDPUI(base64Image) {
    document.querySelectorAll('.profile-pic-container img, #nav-user-dp').forEach(img => {
        img.src = base64Image;
        img.style.display = 'block';
    });
    document.querySelectorAll('.profile-pic-container i, #nav-user-initial').forEach(el => {
        el.style.display = 'none';
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const menuContainer = document.getElementById('userMenuContainer');
    const dropdown = document.getElementById('userDropdown');
    if (menuContainer && dropdown && !menuContainer.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    if (document.getElementById("userMenuContainer")) {
        initNavbar();
    }
});

// Improved data retrieval with error handling
function getStorageData(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        if (!data) return defaultValue;
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
}

// Use it like this:
let userData = getStorageData('data', {});
let cvData = getStorageData('cvData', {});

