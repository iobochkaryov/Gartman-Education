document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const close = document.getElementById("modalClose");
  const modalForm = document.getElementById("modalContactForm");
  const inlineForm = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const triggers = document.querySelectorAll(".contact-trigger");
  const toggle = document.getElementById("mobileNavToggle");
  const nav = document.getElementById("mainNav");

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => document.getElementById("modalName")?.focus(), 250);
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  triggers.forEach(btn => btn.addEventListener("click", () => {
    openModal();
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }));
  close.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  modalForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your message form is ready to be connected to an email service.");
    modalForm.reset();
    closeModal();
  });

  inlineForm.addEventListener("submit", e => {
    e.preventDefault();
    note.textContent = "Thank you! The form is ready to be connected to your email service.";
    inlineForm.reset();
  });

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }));
});