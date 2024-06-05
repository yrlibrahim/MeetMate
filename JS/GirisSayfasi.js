const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

// Mevcut işlevler
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// giriş ve kayıt işlemleri
document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector(".form-container.sign-up form");
  const signInForm = document.querySelector(".form-container.sign-in form");

  // Kayıt olma formu işlemleri
  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = signUpForm.querySelector(
      'input[placeholder="İsim-Soyisim"]'
    ).value;
    const name = signUpForm.querySelector(
      'input[placeholder="Kullanıcı adı"]'
    ).value;
    const email = signUpForm.querySelector('input[placeholder="Email"]').value;
    const phoneNumber = signUpForm.querySelector(
      'input[placeholder="Numara"]'
    ).value;
    const password = signUpForm.querySelector(
      'input[placeholder="Şifre"]'
    ).value;

    const user = {
      fullName: fullName,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        window.location.href = "GirisSayfasi.html";
      } else {
        alert("Hata: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Giriş yapma formu işlemleri
  signInForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = signInForm.querySelector('input[placeholder="Email"]').value;
    const password = signInForm.querySelector(
      'input[placeholder="Şifre"]'
    ).value;

    const user = {
      email: email,
      password: password,
    };

    try {
      // Giriş yapma isteği gönderme
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Sunucudan gelen cevabı işleme
      const result = await response.json();
      if (response.ok) {
        // Token'ı yerel depolamaya kaydet
        localStorage.setItem("token", result.token);

        // Giriş başarılı olduğunda loading page'e yönlendir
        window.location.href = "LoadingPage.html";
      } else {
        alert("Hata: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
