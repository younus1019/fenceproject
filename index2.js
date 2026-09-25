const materialOptions = document.querySelectorAll(".material-option");
const materialImage = document.getElementById("materialImage");
const materialNumber = document.getElementById("materialNumber");
const materialImageTitle = document.getElementById("materialImageTitle");
const materialImageText = document.getElementById("materialImageText");

if (
  materialOptions.length &&
  materialImage &&
  materialNumber &&
  materialImageTitle &&
  materialImageText
) {
  materialOptions.forEach((option) => {
    option.addEventListener("click", () => {
      materialOptions.forEach((item) => {
        item.classList.remove("active");
      });

      option.classList.add("active");

      const newImage = option.dataset.image;
      const newNumber = option.dataset.number;
      const newTitle = option.dataset.title;
      const newText = option.dataset.text;

      materialImage.style.opacity = "0";

      setTimeout(() => {
        materialImage.src = newImage;
        materialImage.alt = `${newTitle} fencing`;

        materialNumber.textContent = newNumber;
        materialImageTitle.textContent = newTitle;
        materialImageText.textContent = newText;

        materialImage.style.opacity = "1";
      }, 180);
    });
  });
}

const testimonialOptions = document.querySelectorAll(".client-story-option");

const testimonialQuote = document.getElementById("testimonialQuote");

const testimonialInitials = document.getElementById("testimonialInitials");

const testimonialName = document.getElementById("testimonialName");

const testimonialProject = document.getElementById("testimonialProject");

const testimonialMaterial = document.getElementById("testimonialMaterial");

const testimonialService = document.getElementById("testimonialService");

if (
  testimonialOptions.length &&
  testimonialQuote &&
  testimonialInitials &&
  testimonialName &&
  testimonialProject &&
  testimonialMaterial &&
  testimonialService
) {
  testimonialOptions.forEach((option) => {
    option.addEventListener("click", () => {
      testimonialOptions.forEach((item) => {
        item.classList.remove("active");
      });

      option.classList.add("active");

      testimonialQuote.style.opacity = "0";

      setTimeout(() => {
        testimonialQuote.textContent = `“${option.dataset.quote}”`;

        testimonialInitials.textContent = option.dataset.initials;

        testimonialName.textContent = option.dataset.name;

        testimonialProject.textContent = option.dataset.project;

        testimonialMaterial.textContent = option.dataset.material;

        testimonialService.textContent = option.dataset.service;

        testimonialQuote.style.opacity = "1";
      }, 180);
    });
  });
}
