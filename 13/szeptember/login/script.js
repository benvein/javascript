var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginbtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            let loginEmail = document.getElementById("email").value;
            var isEmailValid = emailRegex.test(loginEmail);
            if (isEmailValid) {
                alert("sikeres bejelentkezes");
            } else {
                alert("sikertelen bejelentkezés, helytelen email");
            }
        });
    }

    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            let registerEmail = document.getElementById("regEmail").value;
            var isEmailValid = emailRegex.test(registerEmail);
            let password1 = document.getElementById("pwdReg").value;
            let password2 = document.getElementById("pwdReg2").value;
            if (isEmailValid) {
                if (password1 == password2) {
                    alert("sikeres regisztráció");
                } else {
                    alert("sikertelen regisztráció, nem egyezik a két jelszó");
                }
            } else {
                if (password1 == password2) {
                    alert("sikertelen regisztráció, helytelen email");
                } else {
                    alert("sikertelen regisztráció, nem egyezik a két jelszó, helytelen email");
                }
            }
        });
    }
});
