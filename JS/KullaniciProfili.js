document.addEventListener("DOMContentLoaded", async function () {
  try {
    const token = localStorage.getItem("token"); // Token'ı yerel depolamadan al

    if (!token) {
      alert("Lütfen giriş yapınız.");
      window.location.href = "GirisSayfasi.html";
      return;
    }

    const response = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Token'ı Authorization başlığına ekle
      },
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById("userName").textContent = result.name;
      document.getElementById("userEmail").textContent = result.email;
    } else {
      alert("Kullanıcı bilgileri alınamadı: " + result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
