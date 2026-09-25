document.addEventListener("DOMContentLoaded", () => {
  const galleryFilters = document.querySelectorAll(".gallery-filter");
  const galleryProjects = document.querySelectorAll(".gallery-project");

  const galleryLightbox = document.getElementById("galleryLightbox");
  const galleryLightboxClose = document.getElementById("galleryLightboxClose");
  const galleryLightboxImage = document.getElementById("galleryLightboxImage");
  const galleryLightboxType = document.getElementById("galleryLightboxType");
  const galleryLightboxTitle = document.getElementById("galleryLightboxTitle");
  const galleryLightboxLocation = document.getElementById(
    "galleryLightboxLocation",
  );

  galleryFilters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const selectedFilter = filterButton.dataset.filter;

      galleryFilters.forEach((button) => {
        button.classList.remove("active");
      });

      filterButton.classList.add("active");

      galleryProjects.forEach((project) => {
        const projectCategory = project.dataset.category;

        if (selectedFilter === "all" || selectedFilter === projectCategory) {
          project.classList.remove("is-hidden");
        } else {
          project.classList.add("is-hidden");
        }
      });
    });
  });

  function openLightbox(project) {
    if (!galleryLightbox) return;

    const projectImage = project.querySelector("img");

    if (!projectImage) return;

    galleryLightboxImage.src = projectImage.src;
    galleryLightboxImage.alt = projectImage.alt;

    galleryLightboxType.textContent = project.dataset.type || "";

    galleryLightboxTitle.textContent = project.dataset.title || "";

    galleryLightboxLocation.textContent = project.dataset.location || "";

    galleryLightbox.classList.add("active");
    galleryLightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("gallery-lightbox-open");
  }

  function closeLightbox() {
    if (!galleryLightbox) return;

    galleryLightbox.classList.remove("active");
    galleryLightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("gallery-lightbox-open");
  }

  galleryProjects.forEach((project) => {
    project.addEventListener("click", () => {
      openLightbox(project);
    });
  });

  if (galleryLightboxClose) {
    galleryLightboxClose.addEventListener("click", (event) => {
      event.stopPropagation();
      closeLightbox();
    });
  }

  if (galleryLightbox) {
    const backdrop = galleryLightbox.querySelector(
      ".gallery-lightbox__backdrop",
    );

    if (backdrop) {
      backdrop.addEventListener("click", closeLightbox);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      galleryLightbox &&
      galleryLightbox.classList.contains("active")
    ) {
      closeLightbox();
    }
  });

  if (window.lucide) {
    lucide.createIcons();
  }
});
