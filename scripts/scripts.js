document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const close = document.getElementById("modalClose");
  const modalForm = document.getElementById("modalContactForm");
  const modalNote = document.getElementById("modalFormNote");
  const inlineForm = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const toast = document.getElementById("formToast");
  const triggers = document.querySelectorAll(".contact-trigger");
  const toggle = document.getElementById("mobileNavToggle");
  const nav = document.getElementById("mainNav");
  const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') ?? [])];
  let navigationTarget = null;
  let scrollEndTimer;
  let toastTimer;

  const setActiveLink = activeLink => {
    navLinks.forEach(link => link.classList.toggle("active", link === activeLink));
  };

  const updateActiveNav = () => {
    if (navigationTarget) return;

    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    const scrollPaddingTop = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const activationPoint = Math.max(headerBottom, scrollPaddingTop) + 2;
    let activeLink = navLinks[0];
    let activeTop = -Infinity;

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute("href"));
      const top = section?.getBoundingClientRect().top;
      if (top !== undefined && top <= activationPoint && top > activeTop) {
        activeLink = link;
        activeTop = top;
      }
    });

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      activeLink = navLinks.at(-1) ?? activeLink;
    }

    setActiveLink(activeLink);
  };

  const finishNavigation = () => {
    if (!navigationTarget) return;
    navigationTarget = null;
    clearTimeout(scrollEndTimer);
    updateActiveNav();
  };

  window.addEventListener("scroll", () => {
    if (navigationTarget) {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(finishNavigation, 200);
      return;
    }
    updateActiveNav();
  }, { passive: true });
  window.addEventListener("scrollend", finishNavigation);
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();

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
  const submitContactForm = (form, statusNote, onSuccess = () => {}) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = {
      Name: formData.get("name"),
      Email: formData.get("email"),
      Phone: formData.get("phone"),
      Message: formData.get("comment")
    };

    submitButton.disabled = true;
    statusNote.textContent = "Sending...";

    fetch("https://formsubmit.co/ajax/ihorbochkarov@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(async response => {
        const result = await response.json();
        const submissionSucceeded = result.success === true || result.success === "true";
        if (!response.ok || !submissionSucceeded) {
          throw new Error(result.message || `Message could not be sent (HTTP ${response.status}).`);
        }

        form.reset();
        statusNote.textContent = "";
        onSuccess();
        toast.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
      })
      .catch(error => {
        console.error("Contact form submission failed:", error);
        statusNote.textContent = error.message || "Could not send your message. Please try again.";
      })
      .finally(() => {
        submitButton.disabled = false;
      });
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
    submitContactForm(modalForm, modalNote, closeModal);
  });

  inlineForm.addEventListener("submit", e => {
    e.preventDefault();
    submitContactForm(inlineForm, note);
  });

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach(link => link.addEventListener("click", () => {
    navigationTarget = link;
    setActiveLink(link);
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(finishNavigation, 200);
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }));
});