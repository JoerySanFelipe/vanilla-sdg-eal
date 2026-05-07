/**
 * js/visual-media.js
 * High-impact visual components and stylistic UI elements for the UCU External Office website.
 */

/* ==========================================================================
   2. HERO & UI COMPONENTS
   ========================================================================== */

class UcuHomeHero extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.width = "100%";

    if (this.hasRendered) return;
    this.hasRendered = true;

    const base = this.getAttribute("base-path") || "./";
    const tickerItems = [
      "The Impact Rankings Recognized",
      "169 UN Targets Tracked",
      "150+ Active MOUs",
      "18 Countries · Global Network",
    ];

    // Institutional Data Layer
    const credentialRankings = [
      { prefix: "#", value: "1", label: "Local University College · Region I", badgeText: "AppliedHE 2026", badgeStyle: "border-white/20 text-white/60 bg-white/5" },
      { prefix: "#", value: "362", label: "World Ranking · Environment & Sustainability", badgeText: "UI GreenMetric 2025", badgeStyle: "border-white/20 text-white/60 bg-white/5" },
      { prefix: "#", value: "44", label: "World Rank · Industrial Application", badgeText: "WURI 2025", badgeStyle: "border-white/20 text-white/60 bg-white/5" }
    ];

    const credentialsHTML = credentialRankings.map((item, index) => `
      <div class="flex flex-col gap-1 ${index !== credentialRankings.length - 1 ? 'pb-6 mb-6 border-b border-white/10' : ''}">
        <span class="text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter">
          <span class="text-ucu-yellow text-5xl lg:text-6xl mr-1">${item.prefix}</span>${item.value}
        </span>
        <p class="text-[11px] leading-relaxed text-white/60 mt-1 uppercase tracking-wider">${item.label}</p>
        <span class="inline-flex w-fit mt-2 border ${item.badgeStyle} px-2 py-0.5 rounded-sm text-[8px] font-bold tracking-widest uppercase transition-colors duration-300 hover:text-white hover:border-white/40">${item.badgeText}</span>
      </div>
    `).join("");

    this.innerHTML = `
      <section class="ucu-viewport-lock relative w-full overflow-hidden bg-[#0d1020] flex items-center">
        
        <!-- Background Layer: Optimized for Zoom Scale -->
        <div class="absolute inset-0 z-0">
          <img src="${base}images/homebg.png" class="w-full h-full object-cover object-top opacity-40 select-none pointer-events-none" alt="UCU Campus Background">
          <div class="absolute inset-0 bg-gradient-to-br from-[#0d1433]/95 via-[#1a2550]/85 to-[#0d1020]/100"></div>
          <div class="absolute inset-0 bg-radial-gradient from-transparent via-[#0d1020]/20 to-[#0d1020]/60"></div>
        </div>

        <!-- Main 1280px Container -->
        <div class="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- LEFT: Editorial Content (Biomechanical Compliance) -->
            <div class="lg:col-span-7 flex flex-col gap-8">
              <div class="reveal-on-scroll" style="transition-delay: 100ms;">
                <p class="text-xs font-black tracking-[0.3em] uppercase text-ucu-yellow border-l-2 border-ucu-red pl-4">Urdaneta City University</p>
              </div>

              <div class="reveal-on-scroll" style="transition-delay: 200ms;">
                <h1 class="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tight" style="text-shadow: 0 4px 24px rgba(0,0,0,0.4);">Shaping a<br><span class="text-ucu-yellow">Sustainable<br>Tomorrow.</span></h1>
              </div>

              <div class="reveal-on-scroll" style="transition-delay: 300ms;">
                <p class="ucu-prose-narrative text-sm md:text-base text-white/70">Driving institutional impact through research, partnerships, and the 17 United Nations Sustainable Development Goals — recognized globally, rooted locally.</p>
              </div>

              <!-- REFINED LAYOUT: Ticker placed ABOVE buttons -->
              <div class="flex flex-col gap-6 mt-2">
                <div class="reveal-on-scroll flex items-center gap-3" style="transition-delay: 400ms;">
                  <div class="w-1 h-8 bg-ucu-red rounded-full"></div>
                  <span id="ucu-hero-ticker" class="text-[10px] font-bold tracking-[0.15em] uppercase text-ucu-yellow/80">The Impact Rankings Recognized</span>
                </div>

                <div class="reveal-on-scroll flex flex-wrap gap-4" style="transition-delay: 500ms;">
                  <a href="${base}sdg-reports/2025.html" class="px-8 py-4 bg-white/5 border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                    Explore SDG Reports &rarr;
                  </a>
                  <a href="${base}partnership.html" class="px-8 py-4 bg-white/5 border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                    Our Partnerships &rarr;
                  </a>
                </div>
              </div>
            </div>

            <!-- RIGHT: Institutional Credentials -->
            <div class="lg:col-span-5 lg:pl-16 border-l border-white/5 hidden lg:block">
              <div class="reveal-on-scroll" style="transition-delay: 600ms;">
                <p class="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-10">Global Performance Index</p>
                ${credentialsHTML}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>
        .ucu-viewport-lock {
          min-height: 100vh;
          min-height: 100dvh;
        }
        #ucu-hero-ticker {
          transition: opacity 0.5s ease-in-out;
        }
        @media (max-width: 1024px) {
          .ucu-viewport-lock {
            min-height: auto;
            padding-top: 120px;
            padding-bottom: 80px;
          }
        }
      </style>
    `;

    this.initTicker(tickerItems);
  }

  initTicker(items) {
    let index = 0;
    const tickerEl = this.querySelector("#ucu-hero-ticker");
    if (!tickerEl) return;
    
    setInterval(() => {
      tickerEl.style.opacity = "0";
      setTimeout(() => {
        index = (index + 1) % items.length;
        tickerEl.textContent = items[index];
        tickerEl.style.opacity = "1";
      }, 500);
    }, 4000);
  }
}

class UcuHeroBanner extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.width = "100%";
    this.style.position = "sticky";
    this.style.top = "0";
    this.style.zIndex = "0";

    if (this.hasRendered) return;
    this.hasRendered = true;

    const bgColor = this.getAttribute("bg-color") || "bg-ucu-blue";
    const eyebrow = this.getAttribute("eyebrow") || "";
    const headline =
      this.getAttribute("headline") ||
      this.getAttribute("title") ||
      "UCU External Office";
    const highlight = this.getAttribute("highlight") || "";
    const description =
      this.getAttribute("description") || this.getAttribute("subtitle") || "";
    const carouselData = this.getAttribute("carousel");

    const colorMap = {
      "bg-ucu-blue-dark": "from-ucu-blue-dark/70 via-ucu-blue-dark/20",
      "bg-ucu-red": "from-ucu-red/70 via-ucu-red/20",
      "bg-dark-red": "from-dark-red/70 via-dark-red/20",
      "bg-ucu-blue": "from-ucu-blue/70 via-ucu-blue/20",
    };
    const gradientClasses =
      colorMap[bgColor] || "from-ucu-blue/70 via-ucu-blue/20";

    const styleBlock = `
      <style>
        @keyframes ucuHeroReveal {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .ucu-hero-reveal {
          animation: ucuHeroReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; 
        }
      </style>
    `;

    const eyebrowMarkup = eyebrow
      ? `<div class="mb-4 hero-fade-el"><div class="ucu-hero-reveal" style="animation-delay: 100ms;"><span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/90 shadow-sm">${eyebrow}</span></div></div>`
      : "";

    const highlightMarkup = highlight
      ? `<span class="block text-ucu-yellow text-5xl md:text-6xl lg:text-7xl font-extrabold mt-1 md:mt-2 tracking-tighter drop-shadow-lg">${highlight}</span>`
      : "";

    const headlineMarkup = `
      <div class="hero-fade-el">
        <h1 class="text-white text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] drop-shadow-md ucu-hero-reveal" style="animation-delay: 250ms;">
          ${headline}
          ${highlightMarkup}
        </h1>
      </div>
    `;

    const descriptionMarkup = description
      ? `<div class="hero-fade-el"><p class="text-white/85 text-base md:text-lg font-normal leading-relaxed mt-4 max-w-4xl text-balance ucu-hero-reveal" style="animation-delay: 400ms;">${description}</p></div>`
      : "";

    let carouselMarkup = "";
    if (carouselData) {
      try {
        const items = JSON.parse(carouselData);
        if (items && items.length > 0) {
          carouselMarkup = `
            <div class="relative mt-4 h-8 [perspective:800px] w-full max-w-3xl hero-fade-el">
                <div class="ucu-carousel-container ucu-hero-reveal h-full w-full" style="animation-delay: 550ms;">
                  ${items
                    .map(
                      (item, i) => `
                    <p class="carousel-text absolute left-0 w-full origin-[50%_50%_-20px] ${i === 0 ? "opacity-100 rotate-x-[0deg]" : "opacity-0 rotate-x-[90deg]"} text-left text-lg md:text-xl font-semibold tracking-wide text-ucu-yellow transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                        ${item}
                    </p>
                  `,
                    )
                    .join("")}
                </div>
            </div>
          `;
        }
      } catch (e) {
        console.error("Invalid carousel data provided to ucu-hero-banner.");
      }
    }

    this.innerHTML = `
        ${styleBlock}
        <div class="w-full relative z-0">
            <div class="ucu-banner-container w-full h-[320px] md:h-[360px] relative overflow-hidden" style="background-color: #111827;">
              <div class="absolute inset-0 flex items-center w-full" style="
  background:
    linear-gradient(160deg, #0d1433 0%, #1a2550 30%, #24305e 55%, #1e1a40 80%, #0d1020 100%),
    radial-gradient(ellipse 100% 50% at 50% 100%, rgba(57,74,138,0.55) 0%, transparent 60%),
    radial-gradient(ellipse 50% 80% at 90% 10%, rgba(196,54,67,0.18) 0%, transparent 55%),
    radial-gradient(ellipse 30% 40% at 10% 30%, rgba(80,100,180,0.2) 0%, transparent 60%);
  background-blend-mode: normal, screen, screen, screen;
">
                    <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center font-sans relative">
                        ${eyebrowMarkup}
                        ${headlineMarkup}
                        ${descriptionMarkup}
                        ${carouselMarkup}
                    </div>
                </div>
            </div>
            <div class="absolute top-full left-0 w-full h-24 md:h-40 pointer-events-none -z-10" style="background: linear-gradient(to bottom, rgba(36,48,94,0.7), rgba(36,48,94,0.2), transparent);"></div>
        </div>
    `;

    if (carouselMarkup) {
      setTimeout(() => {
        const container = this.querySelector(".ucu-carousel-container");
        if (!container) return;
        const texts = container.querySelectorAll(".carousel-text");
        if (texts.length <= 1) return;

        let index = 0;
        setInterval(() => {
          texts[index].classList.remove("opacity-100", "rotate-x-[0deg]");
          texts[index].classList.add("opacity-0", "-rotate-x-[90deg]");

          const prevIndex = index;
          setTimeout(() => {
            texts[prevIndex].classList.remove("-rotate-x-[90deg]");
            texts[prevIndex].classList.add("rotate-x-[90deg]");
          }, 800);

          index = (index + 1) % texts.length;
          texts[index].classList.remove("opacity-0", "rotate-x-[90deg]");
          texts[index].classList.add("opacity-100", "rotate-x-[0deg]");
        }, 3500);
      }, 100);
    }

    setTimeout(() => {
      const bannerContainer = this.querySelector(".ucu-banner-container");
      const fadeEls = Array.from(this.querySelectorAll(".hero-fade-el"));

      if (!bannerContainer || fadeEls.length === 0) return;

      this.scrollHandler = () => {
        const bannerHeight = bannerContainer.offsetHeight;
        const scrollY = window.scrollY;
        const curtainY = bannerHeight - scrollY;
        const bannerRect = bannerContainer.getBoundingClientRect();

        fadeEls.forEach((el) => {
          const elRect = el.getBoundingClientRect();
          const elTop = elRect.top - bannerRect.top;
          const elHeight = elRect.height;

          const buffer = 20;
          let opacity = (curtainY - elTop + buffer) / (elHeight + buffer);

          if (opacity > 1) opacity = 1;
          if (opacity < 0) opacity = 0;

          el.style.opacity = opacity;
        });
      };

      window.addEventListener("scroll", this.scrollHandler, { passive: true });
      this.scrollHandler();
    }, 50);
  }

  disconnectedCallback() {
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
  }
}

class UcuImageSlider extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    this.duration = parseInt(this.getAttribute("duration") || "4000", 10);
    const imagesRaw = this.getAttribute("images");
    this.images = [];
    
    if (imagesRaw) {
      try {
        this.images = JSON.parse(imagesRaw);
      } catch (e) {
        console.error("Invalid images array passed to UcuImageSlider.");
        return;
      }
    }

    if (!this.images || this.images.length === 0) return;
    this.currentIndex = 0;

    const slidesHtml = this.images.map((src, index) => `
      <div class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out slider-slide bg-gray-100 flex items-center justify-center ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}">
        <img src="${src}" alt="UCU Institutional Feature" class="w-full h-full object-cover" onerror="this.style.display='none'">
        <span class="absolute text-muted/30 font-bold uppercase tracking-widest text-xs -z-10">Image Pending</span>
      </div>
    `).join("");

    const indicatorsHtml = this.images.map((_, index) => `
      <button data-index="${index}" class="slider-indicator transition-all duration-500 ease-out rounded-full h-1.5 ${index === 0 ? 'w-8 bg-ucu-yellow' : 'w-2.5 bg-white/50 hover:bg-white/80'} focus:outline-none" aria-label="Go to slide ${index + 1}"></button>
    `).join("");

    this.innerHTML = `
      <div class="relative w-full h-full group overflow-hidden">
        ${slidesHtml}
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none"></div>
        <button class="slider-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-ucu-red backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none -translate-x-4 group-hover:translate-x-0 shadow-lg border border-white/10" aria-label="Previous Slide">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button class="slider-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-ucu-red backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none translate-x-4 group-hover:translate-x-0 shadow-lg border border-white/10" aria-label="Next Slide">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
        <div class="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          ${indicatorsHtml}
        </div>
      </div>
    `;

    if (this.images.length > 1) {
      this.slides = this.querySelectorAll('.slider-slide');
      this.indicators = this.querySelectorAll('.slider-indicator');
      this.btnPrev = this.querySelector('.slider-prev');
      this.btnNext = this.querySelector('.slider-next');

      this.btnPrev.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
      this.btnNext.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));
      
      this.indicators.forEach(ind => {
        ind.addEventListener('click', (e) => {
          const idx = parseInt(e.target.getAttribute('data-index'), 10);
          this.goToSlide(idx);
        });
      });

      this.startTimer();
    }
  }

  goToSlide(index) {
    this.startTimer();
    const oldIndex = this.currentIndex;
    if (index < 0) {
      this.currentIndex = this.images.length - 1;
    } else if (index >= this.images.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    if (oldIndex === this.currentIndex) return;

    this.slides[oldIndex].classList.remove('opacity-100', 'z-10');
    this.slides[oldIndex].classList.add('opacity-0', 'z-0');
    this.slides[this.currentIndex].classList.remove('opacity-0', 'z-0');
    this.slides[this.currentIndex].classList.add('opacity-100', 'z-10');

    this.indicators[oldIndex].className = "slider-indicator transition-all duration-500 ease-out rounded-full h-1.5 w-2.5 bg-white/50 hover:bg-white/80 focus:outline-none";
    this.indicators[this.currentIndex].className = "slider-indicator transition-all duration-500 ease-out rounded-full h-1.5 w-8 bg-ucu-yellow focus:outline-none";
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.goToSlide(this.currentIndex + 1);
    }, this.duration);
  }
  
  disconnectedCallback() {
    if (this.timer) clearInterval(this.timer);
  }
}

class UcuMetricCards extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const metricsData = this.getAttribute("data-metrics");
    if (!metricsData) return;

    let metrics = [];
    try {
      metrics = JSON.parse(metricsData);
    } catch (e) {
      console.error("Invalid metrics data.");
      return;
    }

    const themeStyles = {
      navy: { bg: "bg-ucu-blue-dark", value: "text-white", label: "text-white/90", icon: "text-ucu-yellow" },
      red: { bg: "bg-ucu-red", value: "text-white", label: "text-white/90", icon: "text-ucu-yellow" },
      yellow: { bg: "bg-ucu-yellow", value: "text-ucu-blue-dark", label: "text-ucu-blue-dark/90", icon: "text-ucu-red" },
    };

    const getGridClass = (count) => {
      if (count === 1) return "grid-cols-1";
      if (count === 2) return "grid-cols-2";
      if (count === 3) return "grid-cols-1 md:grid-cols-3";
      if (count === 4) return "grid-cols-2 md:grid-cols-4";
      if (count === 6) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
      return "grid-cols-1 md:grid-cols-3";
    };

    const cardsHtml = metrics.map((metric) => {
      const activeTheme = metric.theme || "navy";
      const styles = themeStyles[activeTheme];
      return `
        <div class="${styles.bg} rounded-2xl p-6 shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-center min-h-[140px] border border-white/5 group">
          ${metric.svgIcon ? `<div class="flex items-center gap-2 mb-3 ${styles.icon} opacity-90 scale-110 origin-left transition-transform duration-300 group-hover:scale-125">${metric.svgIcon}</div>` : ""}
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter leading-none ${styles.value}">${metric.value}</h3>
          <p class="${styles.label} text-[10px] font-bold uppercase tracking-[0.15em] mt-2">${metric.label}</p>
        </div>
      `;
    }).join("");

    const gridClass = this.getAttribute("grid-class") || getGridClass(metrics.length);
    this.innerHTML = `<div class="w-full grid gap-4 md:gap-6 ${gridClass}">${cardsHtml}</div>`;
  }
}

class SdgBadge extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const goal = parseInt(this.getAttribute("goal"), 10);
    if (!goal || goal < 1 || goal > 17) return;

    const sdgColors = ["#E5243B","#DDA63A","#4C9F38","#C5192D","#FF3A21","#26BDE2","#FCC30B","#A21942","#FD6925","#DD1367","#FD9D24","#BF8B2E","#3F7E44","#0A97D9","#56C02B","#00689D","#19486A"];
    const color = sdgColors[goal - 1];
    const textColor = goal === 7 ? "#1a1a1a" : "#ffffff";

    this.innerHTML = `
      <span class="w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-black" style="background:${color};color:${textColor};">
        ${goal}
      </span>
    `;
  }
}

/* ==========================================================================
   4. COMPONENT REGISTRATION
   ========================================================================== */

if (!customElements.get("ucu-home-hero")) customElements.define("ucu-home-hero", UcuHomeHero);
if (!customElements.get("ucu-hero-banner")) customElements.define("ucu-hero-banner", UcuHeroBanner);
if (!customElements.get("ucu-image-slider")) customElements.define("ucu-image-slider", UcuImageSlider);
if (!customElements.get("ucu-metric-cards")) customElements.define("ucu-metric-cards", UcuMetricCards);
if (!customElements.get("sdg-badge")) customElements.define("sdg-badge", SdgBadge);
