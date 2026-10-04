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

    measurementItem.innerHTML = `
      <a href="contact.html#measurement" class="mobile-measurement-link">
        <span>Free Measurement</span>
        <i data-lucide="arrow-up-right"></i>
      </a>
    `;

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

    return (
      (width >= 360 && width <= 740) ||
      (width >= 768 && width <= 820) ||
      (width >= 821 && width <= 1024) ||
      (width === 1024 && height === 600)
    );
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
      const isOpen = navbar.classList.contains("active");

      menuToggle.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeNavigation() {
    if (navbar) {
      navbar.classList.remove("active");
    }

    if (navDropdown) {
      navDropdown.classList.remove("open");
    }

    updateIcons();
  }
function setActiveNavLink() {
  const currentPage =
    window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase() ||
    "index.html";

  const navLinks = document.querySelectorAll(".nav-link");
  const dropdownItems = document.querySelectorAll(".dropdown-menu a");
  const homeLink = document.getElementById("homeDropdownToggle");

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  dropdownItems.forEach((link) => {
    link.classList.remove("active");
  });

  if (currentPage === "index.html" || currentPage === "index2.html") {
    if (homeLink) {
      homeLink.classList.add("active");
    }

    dropdownItems.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage =
        href.split("#")[0].split("/").filter(Boolean).pop()?.toLowerCase() ||
        "";

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });

    return;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage =
      href.split("#")[0].split("/").filter(Boolean).pop()?.toLowerCase() || "";

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

  if (darkToggle) {
    darkToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      body.classList.toggle("dark-mode");

      localStorage.setItem(
        "theme",
        body.classList.contains("dark-mode") ? "dark" : "light",
      );

      updateIcons();
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const currentDirection = html.getAttribute("dir");

      const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

      html.setAttribute("dir", newDirection);

      localStorage.setItem("direction", newDirection);

      updateIcons();
    });
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isCurrentlyOpen = navbar.classList.contains("active");

      if (isCurrentlyOpen) {
        navbar.classList.remove("active");

        if (navDropdown) {
          navDropdown.classList.remove("open");
        }
      } else {
        navbar.classList.add("active");
      }

      updateIcons();
    });
  }

  if (dropdownLink && navDropdown) {
    dropdownLink.addEventListener("click", (event) => {
      if (!isMobileNavigation()) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      navDropdown.classList.toggle("open");

      updateIcons();
    });
  }

  if (navbar) {
    navbar.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  document.addEventListener("click", () => {
    if (navbar && navbar.classList.contains("active")) {
      closeNavigation();
    }
  });

  const navigationLinks = document.querySelectorAll(
    ".navbar a:not(.dropdown-link)",
  );

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileNavigation()) {
        closeNavigation();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobileNavigation()) {
      closeNavigation();
    }
  });

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  setActiveNavLink();
  updateIcons();
});
