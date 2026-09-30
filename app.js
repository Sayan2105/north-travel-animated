const DEFAULTS = {
  brand: {
    name: "YOUR COMPANY",
    logoDataUrl: "",
    tagline: "Journeys beyond the ordinary.",
    headingFont: "Cormorant Garamond",
    bodyFont: "Manrope"
  },
  hero: {
    kicker: "YOUR COMPANY",
    title: "Into the mountains.",
    tagline: "Journeys beyond the ordinary.",
    scrollHint: "SCROLL TO TRAVEL"
  },
  nav: {
    journey: "Journey",
    about: "About",
    trips: "Trips",
    contact: "Contact"
  },
  content: {
    journeyTitle: "The journey begins.",
    journeyText: "One road. One rider. A long way into the Himalayas.",
    aboutTitle: "We go where the road gets quiet.",
    aboutText: "We build mountain journeys around real roads, real places and time worth remembering.",
    whyTitle: "Less noise. More road.",
    why: [
      { title: "Small groups", text: "More road, less waiting." },
      { title: "Local routes", text: "Journeys shaped around the terrain." },
      { title: "Human support", text: "A real person when you need one." }
    ],
    tripsTitle: "Ladakh. Himachal. North India.",
    tripsText: "Choose a route or shape your own. The landscape changes. The feeling stays.",
    tripTags: ["Ladakh", "Himachal", "North India"],
    ctaTitle: "Your road starts here.",
    ctaText: "Tell us where you want to ride and we will send the details."
  },
  seo: {
    aboutTitle: "Mountain travel built around the road.",
    aboutBody: "Replace this placeholder copy with the real company story, experience, route knowledge and service details.",
    tripsTitle: "Ladakh and the wider Himalayas.",
    tripsBody: "Replace this with real destination, itinerary and journey information."
  },
  contact: {
    whatsappNumber: "919100000000",
    whatsappMessage: "Hi! I want to plan a Himalayan journey. Please send me the details.",
    instagramUrl: "https://instagram.com/",
    email: "hello@example.com",
    ctaText: "WHATSAPP"
  },
  media: {
    desktopVideo: "assets/video/scene-bike.webm",
    mobileVideo: "assets/video/scene-bike.webm",
    finalImage: ""
  },
  motion: {
    heroZoom: 1.11,
    heroX: -1.5,
    heroY: -2.0,
    heroBlackoutAt: 0.87,
    videoSectionVh: 520
  }
};

function readSettings() {
  try {
    const raw = localStorage.getItem("northbound_settings");
    if (!raw) return structuredClone(DEFAULTS);
    return deepMerge(structuredClone(DEFAULTS), JSON.parse(raw));
  } catch (error) {
    console.warn("Settings could not be loaded. Using defaults.", error);
    return structuredClone(DEFAULTS);
  }
}

function deepMerge(target, source) {
  if (!source || typeof source !== "object") return target;
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) target[key] = value;
    else if (value && typeof value === "object") target[key] = deepMerge(target[key] || {}, value);
    else target[key] = value;
  }
  return target;
}

const SETTINGS = readSettings();

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && typeof value === "string") el.textContent = value;
}

function applySettings() {
  document.documentElement.style.setProperty("--display-font", `\"${SETTINGS.brand.headingFont}\", serif`);
  document.documentElement.style.setProperty("--body-font", `\"${SETTINGS.brand.bodyFont}\", sans-serif`);

  document.title = `${SETTINGS.brand.name} | ${SETTINGS.hero.title}`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", SETTINGS.seo.aboutBody);

  setText("navBrandText", SETTINGS.brand.name);
  setText("heroKicker", SETTINGS.hero.kicker || SETTINGS.brand.name);
  setText("heroTitle", SETTINGS.hero.title);
  setText("heroTagline", SETTINGS.hero.tagline || SETTINGS.brand.tagline);
  setText("scrollHintText", SETTINGS.hero.scrollHint);

  setText("journeyTitle", SETTINGS.content.journeyTitle);
  setText("journeyText", SETTINGS.content.journeyText);
  setText("aboutTitle", SETTINGS.content.aboutTitle);
  setText("aboutText", SETTINGS.content.aboutText);
  setText("whyTitle", SETTINGS.content.whyTitle);
  setText("why1Title", SETTINGS.content.why[0]?.title || "");
  setText("why1Text", SETTINGS.content.why[0]?.text || "");
  setText("why2Title", SETTINGS.content.why[1]?.title || "");
  setText("why2Text", SETTINGS.content.why[1]?.text || "");
  setText("why3Title", SETTINGS.content.why[2]?.title || "");
  setText("why3Text", SETTINGS.content.why[2]?.text || "");
  setText("tripsTitle", SETTINGS.content.tripsTitle);
  setText("tripsText", SETTINGS.content.tripsText);
  setText("filmCtaTitle", SETTINGS.content.ctaTitle);
  setText("filmCtaText", SETTINGS.content.ctaText);

  setText("aboutSeoTitle", SETTINGS.seo.aboutTitle);
  setText("aboutSeoBody", SETTINGS.seo.aboutBody);
  setText("tripsSeoTitle", SETTINGS.seo.tripsTitle);
  setText("tripsSeoBody", SETTINGS.seo.tripsBody);

  setText("finalTitle", SETTINGS.content.ctaTitle.replace(/your road starts here\.?/i, "Let's go."));
  setText("finalText", SETTINGS.contact.whatsappMessage);

  for (const [key, value] of Object.entries(SETTINGS.nav)) {
    const el = document.querySelector(`[data-nav="${key}"]`);
    if (el) el.textContent = value;
  }

  const tags = document.getElementById("tripTags");
  if (tags) {
    tags.innerHTML = "";
    SETTINGS.content.tripTags.slice(0, 6).forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      tags.appendChild(span);
    });
  }

  const encodedMessage = encodeURIComponent(SETTINGS.contact.whatsappMessage || "Hi! I want to plan a Himalayan journey.");
  const wa = `https://wa.me/${String(SETTINGS.contact.whatsappNumber || "").replace(/\D/g, "")}?text=${encodedMessage}`;
  document.getElementById("finalCta")?.setAttribute("href", wa);
  document.getElementById("filmCtaButton")?.setAttribute("href", wa);
  document.getElementById("instagramLink")?.setAttribute("href", SETTINGS.contact.instagramUrl || "#");
  const email = document.getElementById("emailLink");
  if (email) {
    email.textContent = SETTINGS.contact.email;
    email.href = `mailto:${SETTINGS.contact.email}`;
  }

  const logo = document.getElementById("videoBrandLogo");
  const brandCover = document.getElementById("videoBrandCover");
  if (logo && SETTINGS.brand.logoDataUrl) {
    logo.src = SETTINGS.brand.logoDataUrl;
    brandCover.classList.add("has-logo");
  } else if (brandCover) {
    brandCover.classList.remove("has-logo");
  }

  const brandName = document.getElementById("videoBrandName");
  if (brandName) brandName.textContent = SETTINGS.brand.name;
}

function makeStars() {
  const root = document.getElementById("heroStars");
  if (!root) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 125; i++) {
    const s = document.createElement("span");
    s.className = "star" + (Math.random() > .91 ? " big" : "");
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 72}%`;
    s.style.setProperty("--twinkle", `${2 + Math.random() * 5}s`);
    s.style.animationDelay = `${Math.random() * -6}s`;
    frag.appendChild(s);
  }
  root.appendChild(frag);
}

function meteorLoop() {
  const root = document.getElementById("heroMeteors");
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const m = document.createElement("span");
  m.className = "meteor";
  m.style.left = `${3 + Math.random() * 72}%`;
  m.style.top = `${4 + Math.random() * 50}%`;
  m.style.width = `${100 + Math.random() * 160}px`;
  m.style.setProperty("--rot", `${-18 - Math.random() * 20}deg`);
  m.style.setProperty("--dx", `${34 + Math.random() * 40}vw`);
  m.style.setProperty("--dy", `${16 + Math.random() * 28}vh`);
  root.appendChild(m);
  requestAnimationFrame(() => m.classList.add("fly"));
  setTimeout(() => m.remove(), 1300);
  setTimeout(meteorLoop, 260 + Math.random() * 640);
}

function setupHero() {
  const hero = document.getElementById("hero");
  const world = document.getElementById("heroWorld");
  const copy = document.getElementById("heroCopy");
  const blackout = document.getElementById("heroBlackout");
  const hint = document.getElementById("scrollHint");
  if (!hero || !world || !copy || !blackout) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.1,
      invalidateOnRefresh: true
    }
  })
  .fromTo(world,
    { scale: 1.02, xPercent: 0, yPercent: 0 },
    { scale: SETTINGS.motion.heroZoom, xPercent: SETTINGS.motion.heroX, yPercent: SETTINGS.motion.heroY, ease: "none", duration: 1 },
    0
  )
  .fromTo(copy,
    { opacity: 1, x: 0, y: 0 },
    { opacity: 0, x: -28, y: -22, ease: "none", duration: .55 },
    .58
  )
  .to(hint, { opacity: 0, duration: .08, ease: "none" }, .48)
  .fromTo(blackout,
    { opacity: 0 },
    { opacity: 1, ease: "none", duration: .18 },
    SETTINGS.motion.heroBlackoutAt
  );
}

function setupFilmVideo() {
  const film = document.getElementById("journey");
  const video = document.getElementById("bikeVideo");
  const progress = document.getElementById("filmProgress");
  const stage = document.querySelector(".film-stage");
  const copies = [...document.querySelectorAll(".film-copy")];
  if (!film || !video || !stage) return;

  const sourceDesktop = document.getElementById("bikeVideoDesktop");
  const sourceMobile = document.getElementById("bikeVideoMobile");
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const target = mobile ? SETTINGS.media.mobileVideo : SETTINGS.media.desktopVideo;
  if (target) {
    if (mobile && sourceMobile) sourceMobile.src = target;
    else if (sourceDesktop) sourceDesktop.src = target;
  }
  video.load();
  video.pause();

  let duration = 0;
  let targetTime = 0;
  let raf = 0;
  let ready = false;

  const renderTime = () => {
    if (ready && Number.isFinite(duration)) {
      const delta = targetTime - video.currentTime;
      if (Math.abs(delta) > 0.008) {
        const next = video.currentTime + delta * 0.22;
        if (Math.abs(next - video.currentTime) > 0.002) video.currentTime = next;
      }
    }
    raf = requestAnimationFrame(renderTime);
  };
  renderTime();

  video.addEventListener("loadedmetadata", () => {
    duration = video.duration || 0;
    ready = duration > 0;
  }, { once: true });

  ScrollTrigger.create({
    trigger: film,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.25,
    invalidateOnRefresh: true,
    onUpdate(self) {
      const p = self.progress;
      targetTime = Math.max(0, (duration || 0) - 0.03) * p;
      progress.style.width = `${p * 100}%`;

      copies.forEach(el => {
        const a = Number(el.dataset.in || 0);
        const b = Number(el.dataset.out || 1);
        const fade = Math.min(.035, (b - a) / 3);
        const fadeIn = gsap.utils.clamp(0, 1, (p - a) / fade);
        const fadeOut = gsap.utils.clamp(0, 1, (b - p) / fade);
        const opacity = Math.min(fadeIn, fadeOut);
        const y = (1 - opacity) * 18;
        gsap.set(el, { opacity, y });
      });

      const chapterNames = [
        [0.00, "01", "THE ROAD NORTH"],
        [0.22, "02", "ABOUT US"],
        [0.43, "03", "WHY US"],
        [0.66, "04", "OUR TRIPS"],
        [0.88, "05", "KEEP GOING"]
      ];
      const active = [...chapterNames].reverse().find(x => p >= x[0]) || chapterNames[0];
      setText("filmChapter", active[1]);
      setText("filmChapterName", active[2]);
    }
  });
}

function setupFinalImage() {
  const source = SETTINGS.media.finalImage;
  if (!source) return;
  const target = document.querySelector(".final-placeholder");
  if (target) target.style.backgroundImage = `linear-gradient(180deg, rgba(2,4,5,.08), rgba(2,4,5,.66)), url("${source}")`;
}

applySettings();
makeStars();
meteorLoop();
setupHero();
setupFilmVideo();
setupFinalImage();
window.addEventListener("load", () => ScrollTrigger.refresh());
window.addEventListener("resize", () => ScrollTrigger.refresh());
