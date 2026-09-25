document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const html = document.documentElement;

  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const currentYear = document.getElementById("currentYear");

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  html.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

  function updateIcons() {
    if (darkToggle) {
      darkToggle.innerHTML = body.classList.contains("dark-mode")
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    }
if (rtlToggle) {
  rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';
}

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      localStorage.setItem(
        "theme",
        body.classList.contains("dark-mode") ? "dark" : "light",
      );

      updateIcons();
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const newDirection = html.getAttribute("dir") === "rtl" ? "ltr" : "rtl";

      html.setAttribute("dir", newDirection);

      localStorage.setItem("direction", newDirection);

      updateIcons();
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  updateIcons();
});
