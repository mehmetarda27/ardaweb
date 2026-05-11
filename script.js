const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const phoneInput = document.getElementById("telefon");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 25, 120)}ms`;
  revealObserver.observe(element);
});

const sections = [...document.querySelectorAll("main section[id]")];
const menuLinks = [...navLinks.querySelectorAll('a[href^="#"]')];

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.id;
      menuLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((section) => activeObserver.observe(section));

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^\d+\s()-]/g, "");
});

const setMessage = (message, type) => {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
};

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("", "");

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    setMessage("L\u00fctfen zorunlu alanlar\u0131 eksiksiz ve do\u011fru doldurun.", "error");
    return;
  }

  const phoneDigits = phoneInput.value.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    phoneInput.focus();
    setMessage("L\u00fctfen ge\u00e7erli bir telefon numaras\u0131 girin.", "error");
    return;
  }

  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "G\u00f6nderiliyor...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Form g\u00f6nderilemedi");

    contactForm.reset();
    setMessage("Talebiniz ba\u015far\u0131yla al\u0131nd\u0131. En k\u0131sa s\u00fcrede sizinle ileti\u015fime ge\u00e7ece\u011fiz.", "success");
  } catch (error) {
    setMessage("Bir hata olu\u015ftu. L\u00fctfen tekrar deneyin veya WhatsApp \u00fczerinden ileti\u015fime ge\u00e7in.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});
