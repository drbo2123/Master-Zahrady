// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Lightbox for gallery =====
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const imgs = document.querySelectorAll(".gallery img");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  imgs.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
}

// ===== Contact form (basic demo) =====
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-status").textContent =
      "✅ Thanks for your message! Colin will reply soon.";
    form.reset();
  });
}
