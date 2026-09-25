document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const html = document.documentElement;

  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");

  const navbar = document.querySelector(".navbar");
  const navDropdown = document.querySelector(".nav-dropdown");
  const dropdownLink = document.querySelector(".dropdown-link");

  const navLinksList = document.getElementById("navLinks");

  if (navLinksList && !navLinksList.querySelector(".mobile-measurement-item")) {
    const measurementItem = document.createElement("li");
    measurementItem.className = "mobile-measurement-item";
    measurementItem.innerHTML = '<a href="contact.html#measurement" class="mobile-measurement-link"><span>Free Measurement</span><i data-lucide="arrow-up-right"></i></a>';
    navLinksList.appendChild(measurementItem);
  }

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  html.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

  function isMobileNavigation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (width >= 360 && width <= 740) ||
      (width >= 768 && width <= 820) ||
      (width >= 821 && width <= 1024) ||
      (width === 1024 && height === 600);
  }

  function updateIcons() {
    if (darkToggle) {
      darkToggle.innerHTML = body.classList.contains("dark-mode")
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    }
if (rtlToggle) {
  rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';
}

    if (menuToggle && navbar) {
      const menuIsOpen = navbar.classList.contains("active");

      menuToggle.innerHTML = menuIsOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

      menuToggle.setAttribute("aria-expanded", menuIsOpen ? "true" : "false");
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
      const currentDirection = html.getAttribute("dir");
      const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

      html.setAttribute("dir", newDirection);
      localStorage.setItem("direction", newDirection);

      updateIcons();
    });
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");

      if (navDropdown && !navbar.classList.contains("active")) {
        navDropdown.classList.remove("open");
      }

      updateIcons();
    });
  }

  if (dropdownLink && navDropdown) {
    dropdownLink.addEventListener("click", (event) => {
      if (isMobileNavigation()) {
        event.preventDefault();
        navDropdown.classList.toggle("open");

        updateIcons();
      }
    });
  }

  document.addEventListener("click", (event) => {
    const clickedInsideNavbar = event.target.closest(".navbar");

    const clickedMenuToggle = event.target.closest(".menu-toggle");

    if (!clickedInsideNavbar && !clickedMenuToggle) {
      if (navbar) {
        navbar.classList.remove("active");
      }

      if (navDropdown) {
        navDropdown.classList.remove("open");
      }

      updateIcons();
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobileNavigation()) {
      if (navbar) {
        navbar.classList.remove("active");
      }

      if (navDropdown) {
        navDropdown.classList.remove("open");
      }

      updateIcons();
    }
  });

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  updateIcons();
});


