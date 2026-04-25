const productData = {
  buckwheat: {
    kicker: "Лидер по содержанию витаминов",
    title: "Гречишно-цветочный мёд",
    price: "от 1 000 ₽",
    description:
      "Гречишный мёд лидирует по содержанию витаминов и микроэлементов среди других сортов. В составе — гречиха примерно 60-80% и букет цветов кипрея, донника, клевера и других луговых растений.",
    source: "Греча 60-80%",
    photo: "assets/WhatsApp_Image_2020-(1).jpeg.webp",
    photoAlt: "Гречишно-цветочный мёд",
    points: [
      "Без добавленного сахара и ароматизаторов",
      "Мёд с зарегистрированной собственной пасеки",
      "Подходит для ежедневного рациона и десертов",
    ],
    volumes: ["1 л", "2 л", "3 л", "5 л"],
  },
  linden: {
    kicker: "Светлый и деликатный вкус",
    title: "Липово-цветочный мёд",
    price: "от 1 400 ₽",
    description:
      "Чистый продукт с липовым характером: прозрачный, светло-жёлтый или янтарный, с мягким ароматом и тонким послевкусием. Если пчёлы одновременно собирают нектар с других цветов, оттенок становится ярче и богаче.",
    source: "Липа 60-80%",
    photo: "assets/WhatsApp_Image_2020-(2).jpeg.webp",
    photoAlt: "Липово-цветочный мёд",
    points: [
      "Мягкий липовый аромат и светлый оттенок",
      "Натуральный состав без посторонних добавок",
      "Хорошо подходит к чаю, выпечке и завтракам",
    ],
    volumes: ["1 л", "2 л", "3 л", "5 л"],
  },
  field: {
    kicker: "Луговой букет в одном сорте",
    title: "Разнотравье-цветочный мёд",
    price: "от 700 ₽",
    description:
      "Насыщенный мёд с ароматом цветущих лугов. В букете читаются одуванчик, ива, люцерна, клевер, кипрей и другие дикорастущие растения. Это универсальный вариант для напитков, десертов и повседневного употребления.",
    source: "Луговые травы",
    photo: "assets/WhatsApp_Image_2020-.jpeg.webp",
    photoAlt: "Разнотравье-цветочный мёд",
    points: [
      "Многослойный аромат дикорастущих трав",
      "Универсальный вкус для всей семьи",
      "Подходит и как лакомство, и как натуральный подсластитель",
    ],
    volumes: ["1 л", "2 л", "3 л", "5 л"],
  },
};

const productTriggers = [...document.querySelectorAll("[data-product-trigger]")];
const productTitle = document.getElementById("product-title");
const productKicker = document.getElementById("product-kicker");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productSource = document.getElementById("product-source");
const productPhoto = document.getElementById("product-photo");
const productPoints = document.getElementById("product-points");
const productVolumes = document.getElementById("product-volumes");

function renderProduct(key) {
  const product = productData[key];
  if (!product) return;

  productTriggers.forEach((trigger) => {
    trigger.classList.toggle("is-active", trigger.dataset.productTrigger === key);
  });

  productKicker.textContent = product.kicker;
  productTitle.textContent = product.title;
  productPrice.textContent = product.price;
  productDescription.textContent = product.description;
  productSource.textContent = product.source;
  productPhoto.src = product.photo;
  productPhoto.alt = product.photoAlt;

  productPoints.replaceChildren(
    ...product.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }),
  );

  productVolumes.replaceChildren(
    ...product.volumes.map((volume) => {
      const item = document.createElement("span");
      item.textContent = volume;
      return item;
    }),
  );
}

productTriggers.forEach((trigger) => {
  const key = trigger.dataset.productTrigger;
  trigger.addEventListener("click", () => renderProduct(key));
  if (window.matchMedia("(hover: hover)").matches) {
    trigger.addEventListener("mouseenter", () => renderProduct(key));
  }
});

const revealNodes = [...document.querySelectorAll("[data-reveal]")];
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18 },
);

revealNodes.forEach((node) => revealObserver.observe(node));

const counters = [...document.querySelectorAll("[data-count]")];
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = Number(node.dataset.count);
      const duration = 1400;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased).toLocaleString("ru-RU");
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(node);
    });
  },
  { threshold: 0.45 },
);

counters.forEach((counter) => counterObserver.observe(counter));

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

function closeNav() {
  header.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-compact", window.scrollY > 24);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => navObserver.observe(section));

const tiltShells = [...document.querySelectorAll("[data-tilt]")];

tiltShells.forEach((shell) => {
  shell.addEventListener("mousemove", (event) => {
    const rect = shell.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 12;
    shell.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  shell.addEventListener("mouseleave", () => {
    shell.style.transform = "";
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCloseButtons = [...document.querySelectorAll("[data-lightbox-close]")];
const galleryCards = [...document.querySelectorAll("[data-lightbox-src]")];

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.lightboxSrc;
    lightboxImage.alt = card.dataset.lightboxCaption || "";
    lightboxCaption.textContent = card.dataset.lightboxCaption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

lightboxCloseButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

renderProduct("buckwheat");
