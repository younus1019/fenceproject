document.addEventListener("DOMContentLoaded", () => {
  const measurementForm = document.getElementById("measurementForm");
  const measurementFormStatus = document.getElementById(
    "measurementFormStatus",
  );

  if (!measurementForm) return;

  measurementForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!measurementForm.checkValidity()) {
      measurementForm.reportValidity();
      return;
    }

    if (measurementFormStatus) {
      measurementFormStatus.textContent =
        "Thank you. Your project details have been received. We’ll contact you about the next step.";

      measurementFormStatus.classList.add("active");
    }

    measurementForm.reset();

    if (window.lucide) {
      lucide.createIcons();
    }
  });
});
