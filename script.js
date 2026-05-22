const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const floatingWhatsapp = document.querySelector(".floating-whatsapp");
const filterButtons = document.querySelectorAll(".project-filters button");
const projectCards = document.querySelectorAll(".project-card");
const quoteWizard = document.getElementById("quoteWizard");
const quoteResult = document.getElementById("quoteResult");
const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalPoints = document.getElementById("modalPoints");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const preloader = document.getElementById("preloader");
const counters = document.querySelectorAll("[data-count]");
const statsGrid = document.querySelector(".stats-grid");

const phoneNumber = "905314668927";
const whatsappLink = (message) => `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const finishLoading = () => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("page-ready");
  preloader?.classList.add("is-hidden");

  window.setTimeout(() => {
    preloader?.setAttribute("aria-hidden", "true");
  }, 700);
};

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  finishLoading();
} else {
  window.addEventListener("load", () => {
    window.setTimeout(finishLoading, 1650);
  });

  window.setTimeout(finishLoading, 2600);
}

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
  floatingWhatsapp?.classList.toggle("visible", window.scrollY > 520);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 16, 110)}ms`;
  revealObserver.observe(element);
});

const animateCounter = (element) => {
  if (element.dataset.counted === "true") return;
  element.dataset.counted = "true";

  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}+`;

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

if (statsGrid && counters.length) {
  const runCountersIfVisible = () => {
    const rect = statsGrid.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.86 && rect.bottom > 0;
    if (!isVisible) return;

    counters.forEach(animateCounter);
    window.removeEventListener("scroll", runCountersIfVisible);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  counterObserver.observe(statsGrid);
  window.addEventListener("scroll", runCountersIfVisible, { passive: true });
  window.setTimeout(runCountersIfVisible, 500);
}

const sections = [...document.querySelectorAll("main section[id], main [id='contact']")];
const menuLinks = [...(navLinks?.querySelectorAll('a[href^="#"]') || [])];

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

document.querySelectorAll(".faq-list details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;

    details.parentElement.querySelectorAll("details").forEach((item) => {
      if (item !== details) item.removeAttribute("open");
    });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const projectDetails = [
  {
    title: "Lezzet Durağı",
    tag: "Web Tasarım + QR Menü",
    image: "qr-menu.png",
    text: "Restoran için mobil uyumlu tanıtım sitesi, dijital QR menü akışı ve WhatsApp üzerinden hızlı teklif yönlendirmesi hazırlandı.",
    points: ["Menü güncelleme süreci sadeleşti", "Mobil kullanıcı deneyimi iyileştirildi", "Müşteri teklif akışı hızlandı"]
  },
  {
    title: "Queen Kuaför",
    tag: "Randevu Sistemi",
    image: "berber-pos.png",
    text: "Kuaför işletmesi için randevu taleplerini düzenleyen, müşteri takibini kolaylaştıran modern bir sistem kurgulandı.",
    points: ["Randevu talepleri tek akışa alındı", "Müşteri iletişimi hızlandı", "Yoğun saat yönetimi kolaylaştı"]
  },
  {
    title: "Mersin Klinik",
    tag: "Kurumsal Web Tasarım",
    image: "web-tasarim.png",
    text: "Klinik için güven veren, hızlı açılan ve hizmetleri anlaşılır biçimde sunan kurumsal web sitesi tasarlandı.",
    points: ["Hizmet sayfaları sadeleştirildi", "Mobil görünüm güçlendirildi", "İletişim dönüşümü öne çıkarıldı"]
  },
  {
    title: "Ada Emlak",
    tag: "Yönetim Paneli",
    image: "ozel-yazilim.png",
    text: "Emlak ofisi için portföy ve ilan yönetimini kolaylaştıran, güncellenebilir panel yapısı planlandı.",
    points: ["İlan yönetimi merkezileşti", "Portföy sunumu profesyonelleşti", "İletişim talepleri görünür hale geldi"]
  },
  {
    title: "Luna Butik",
    tag: "E-Ticaret",
    image: "restoran-pos.png",
    text: "Butik işletmesi için ürün yönetimi, online satış ve WhatsApp sipariş akışını destekleyen e-ticaret altyapısı hazırlandı.",
    points: ["Ürün listeleme kolaylaştı", "Mobil alışveriş deneyimi güçlendi", "Sipariş akışı sadeleşti"]
  },
  {
    title: "Coffee Lab",
    tag: "QR Menü",
    image: "kurye-takip.png",
    text: "Kafe için hızlı açılan QR menü ve müşterinin doğrudan teklif ya da bilgi talebi gönderebildiği akış oluşturuldu.",
    points: ["Menüye erişim hızlandı", "Kampanya alanları eklendi", "WhatsApp yönlendirmesi güçlendi"]
  }
];

const closeProjectModal = () => {
  projectModal?.classList.remove("open");
  projectModal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const openProjectModal = (detail) => {
  if (!projectModal || !detail) return;

  modalImage.src = detail.image;
  modalImage.alt = detail.title;
  modalTag.textContent = detail.tag;
  modalTitle.textContent = detail.title;
  modalText.textContent = detail.text;
  modalPoints.innerHTML = detail.points.map((point) => `<p>${point}</p>`).join("");
  modalWhatsapp.href = whatsappLink(`Merhaba, ${detail.title} benzeri bir proje için teklif almak istiyorum.`);

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose?.focus();
};

projectCards.forEach((card, index) => {
  card.addEventListener("click", () => openProjectModal(projectDetails[index]));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(projectDetails[index]);
    }
  });
});

modalClose?.addEventListener("click", closeProjectModal);
projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectModal();
});

quoteWizard?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteWizard.checkValidity()) {
    quoteWizard.reportValidity();
    return;
  }

  const business = document.getElementById("quoteBusiness").value;
  const service = document.getElementById("quoteService").value;
  const budget = document.getElementById("quoteBudget").value;
  const timeline = document.getElementById("quoteTimeline").value;
  const message = `Merhaba, ArdaWeb üzerinden teklif almak istiyorum. İşletme türü: ${business}. İstenen hizmet: ${service}. Bütçe aralığı: ${budget}. Teslim beklentisi: ${timeline}.`;

  quoteResult.textContent = message;
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
});

const setMessage = (message, type) => {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.className = type ? `form-message ${type}` : "form-message";
};

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("", "");

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    setMessage("Lütfen zorunlu alanları eksiksiz ve doğru doldurun.", "error");
    return;
  }

  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Gönderiliyor...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Form gönderilemedi");

    contactForm.reset();
    setMessage("Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğim.", "success");
  } catch (error) {
    setMessage("Bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp üzerinden iletişime geçin.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});
