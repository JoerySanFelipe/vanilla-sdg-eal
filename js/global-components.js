class UcuHeader extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.width = "100%";
    this.style.position = "sticky";
    this.style.top = "0";
    this.style.zIndex = "50";

    if (this.hasRendered) return;
    this.hasRendered = true;

    const base = this.getAttribute("base-path") || "./";
    const currentPath = window.location.pathname;

    const mainNavLinks = [
      { name: "Home", url: "index.html" },
      {
        name: "SDG Reports",
        dropdown: [
          { name: "2025", url: "sdg-reports/2025.html" },
          { name: "2024", url: "sdg-reports/2024.html" },
          { name: "2023", url: "sdg-reports/2023.html" },
        ],
      },
      {
        name: "Research",
        dropdown: [
          { name: "2025", url: "research/2025.html" },
          { name: "2024", url: "research/2024.html" },
          { name: "2023", url: "research/2023.html" },
        ],
      },
      {
        name: "Impact & Events",
        dropdown: [
          { name: "2025", url: "impact/2025.html" },
          { name: "2024", url: "impact/2024.html" },
          { name: "2023", url: "impact/2023.html" },
        ],
      },
      { name: "Rankings", url: "rankings.html" },
      { name: "Partnerships", url: "partnership.html" },
      { name: "Smart Eco Campus", url: "smart-eco-campus.html" },
    ];

    const isActive = (url) => {
      if (url === "index.html")
        return currentPath.endsWith("/") || currentPath.endsWith("index.html");
      return currentPath.includes(url.split("/")[0]);
    };

    let pathStr =
      currentPath.split("/").filter(Boolean).pop()?.replace(".html", "") ||
      "index";
    if (pathStr === "index") pathStr = "Home";
    const pageTitle =
      pathStr.charAt(0).toUpperCase() + pathStr.slice(1).replace("-", " ");

    const breadcrumbsHtml = `
      <a href="${base}index.html" class="text-white hover:text-ucu-yellow transition-colors duration-300">Home</a>
      ${pathStr !== "Home" ? `<span class="text-white/40 text-[10px] font-light">›</span> <span class="text-ucu-yellow tracking-[0.1em]">${pageTitle}</span>` : ""}
    `;

    this.innerHTML = `
      <header class="bg-dark-red border-t-4 border-ucu-blue shadow-[0_15px_35px_rgba(161,5,5,0.2),_0_5px_15px_rgba(0,0,0,0.15)] sticky top-0 flex flex-col w-full font-[family-name:var(--font-sans)]">
        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between py-2">
            <a href="${base}index.html" class="shrink-0 relative z-20">
              <img src="${base}images/ucu-landscape-dark.png" alt="UCU Logo" class="h-8 w-auto drop-shadow-sm hover:scale-105 hover:-rotate-1 transition-transform duration-500 ease-out" onerror="this.style.display='none'" />
            </a>
            <nav class="hidden lg:flex items-center gap-1">
              ${mainNavLinks
                .map((link) => {
                  if (link.dropdown) {
                    return `
                    <div class="relative group">
                      <button class="flex items-center w-full justify-center text-xs font-normal tracking-wide px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md group-hover:bg-white/10 group-hover:backdrop-blur-md ${link.dropdown.some((d) => isActive(d.url)) ? "text-ucu-yellow" : "text-white"}" aria-expanded="false">
                        <span class="group-hover:text-ucu-yellow transition-colors duration-300">${link.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 max-w-0 opacity-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-w-[12px] group-hover:ml-1 group-hover:opacity-100 group-hover:text-ucu-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </button>
                      <div class="absolute top-full left-0 pt-[12px] min-w-[220px] origin-top scale-y-0 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-hover:opacity-100 z-50">
                        <div class="bg-dark-red border border-white/10 shadow-2xl overflow-hidden flex flex-col py-1 backdrop-blur-md">
                          ${link.dropdown.map((drop) => `<a href="${base}${drop.url}" class="px-4 py-2.5 text-left text-xs font-normal tracking-wide text-white hover:bg-white/20 hover:text-ucu-yellow transition-colors duration-200 block border-b border-white/5 last:border-none">${drop.name}</a>`).join("")}
                        </div>
                      </div>
                    </div>
                  `;
                  } else {
                    return `<a href="${base}${link.url}" class="text-xs font-normal tracking-wide px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:text-ucu-yellow ${isActive(link.url) ? "text-ucu-yellow" : "text-white"}">${link.name}</a>`;
                  }
                })
                .join("")}
            </nav>
            <div class="lg:hidden w-10"></div>
          </div>
        </div>
        <div class="bg-black/10 border-t border-white/5 w-full relative z-10">
          <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <nav class="flex items-center gap-2 text-[9px] font-normal tracking-widest text-white/60 uppercase">
              ${breadcrumbsHtml}
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}

class UcuFooter extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.width = "100%";

    if (this.hasRendered) return;
    this.hasRendered = true;

    const base = this.getAttribute("base-path") || "./";

    this.innerHTML = `
      <footer class="mt-10 w-full relative overflow-hidden border-t-[4px] border-ucu-red font-sans pb-8" style="
  background-color: #111827;
  background-image:
    linear-gradient(160deg, #0d1433 0%, #1a2550 30%, #24305e 55%, #1e1a40 80%, #0d1020 100%),
    radial-gradient(ellipse 100% 50% at 50% 0%, rgba(57,74,138,0.55) 0%, transparent 60%),
    radial-gradient(ellipse 50% 80% at 90% 90%, rgba(196,54,67,0.18) 0%, transparent 55%),
    radial-gradient(ellipse 30% 40% at 10% 70%, rgba(80,100,180,0.2) 0%, transparent 60%);
  background-blend-mode: normal, screen, screen, screen;
">
        
        <div class="absolute top-[10%] left-[5%] w-[32vw] h-[32vw] bg-[radial-gradient(circle,rgba(196,54,67,0.06)_0%,transparent_60%)] rounded-full pointer-events-none z-0"></div>
        <div class="absolute -bottom-[10%] -right-[5%] w-[360px] h-[360px] bg-contain bg-no-repeat bg-center opacity-5 pointer-events-none z-0" style="background-image: url('${base}images/ucu-portrait-dark.png');"></div>

        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-10 lg:gap-8 relative z-10">
          
          <div class="flex flex-col lg:min-w-[150px]">
            <h3 class="text-ucu-yellow mb-4 font-bold tracking-widest uppercase text-[11px]">Quick Links</h3>
            <nav class="flex flex-col gap-2.5">
              <a href="${base}index.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">Home</a>
              <a href="${base}sdg-reports/2025.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">SDG Reports</a>
              <a href="${base}research/2025.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">Research</a>
              <a href="${base}impact/2025.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">Impact & Events</a>
              <a href="${base}rankings.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">Rankings</a>
              <a href="${base}partnership.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">Partnerships</a>
              <a href="${base}smart-eco-campus.html" class="text-white/80 hover:text-ucu-yellow text-[13px] font-medium transition-colors">Smart Eco Campus</a>
            </nav>
          </div>

          <div class="flex flex-col lg:min-w-[220px]">
            <h3 class="text-ucu-yellow mb-4 font-bold tracking-widest uppercase text-[11px]">Partners</h3>
            
            <h4 class="text-white/60 text-[10px] font-semibold mb-2 uppercase tracking-widest">International</h4>
            <div class="grid grid-cols-3 gap-2 mb-5">
              <div class="bg-white min-h-[40px] w-full rounded-md flex items-center justify-center p-1 hover:bg-white/90 transition-colors cursor-pointer"><img src="${base}images/partner-placeholder.png" alt="Partner" class="max-h-8 object-contain opacity-40" onerror="this.style.display='none'" /></div>
              <div class="bg-white min-h-[40px] w-full rounded-md flex items-center justify-center p-1 hover:bg-white/90 transition-colors cursor-pointer"><img src="${base}images/partner-placeholder.png" alt="Partner" class="max-h-8 object-contain opacity-40" onerror="this.style.display='none'" /></div>
              <div class="bg-white min-h-[40px] w-full rounded-md flex items-center justify-center p-1 hover:bg-white/90 transition-colors cursor-pointer"><img src="${base}images/partner-placeholder.png" alt="Partner" class="max-h-8 object-contain opacity-40" onerror="this.style.display='none'" /></div>
            </div>

            <h4 class="text-white/60 text-[10px] font-semibold mb-2 uppercase tracking-widest">Local</h4>
            <div class="grid grid-cols-3 gap-2">
              <div class="bg-white min-h-[40px] w-full rounded-md flex items-center justify-center p-1 hover:bg-white/90 transition-colors cursor-pointer"><img src="${base}images/partner-placeholder.png" alt="Partner" class="max-h-8 object-contain opacity-40" onerror="this.style.display='none'" /></div>
              <div class="bg-white min-h-[40px] w-full rounded-md flex items-center justify-center p-1 hover:bg-white/90 transition-colors cursor-pointer"><img src="${base}images/partner-placeholder.png" alt="Partner" class="max-h-8 object-contain opacity-40" onerror="this.style.display='none'" /></div>
              <div class="bg-white min-h-[40px] w-full rounded-md flex items-center justify-center p-1 hover:bg-white/90 transition-colors cursor-pointer"><img src="${base}images/partner-placeholder.png" alt="Partner" class="max-h-8 object-contain opacity-40" onerror="this.style.display='none'" /></div>
            </div>
          </div>

          <div class="flex flex-col lg:min-w-[200px]">
            <h3 class="text-ucu-yellow mb-4 font-bold tracking-widest uppercase text-[11px]">Follow Us</h3>
            <div class="flex flex-col gap-4">
              <a href="#" class="flex items-center gap-3 text-white/80 hover:text-ucu-yellow transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="shrink-0 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                <span class="text-[13px] font-medium leading-snug">Urdaneta City University</span>
              </a>
              <a href="#" class="flex items-center gap-3 text-white/80 hover:text-ucu-yellow transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="shrink-0 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                <span class="text-[13px] font-medium leading-snug">External Affairs and Linkages</span>
              </a>
            </div>
          </div>

          <div class="flex flex-col lg:min-w-[240px]">
            <div class="flex justify-center w-full mb-5">
              <img src="${base}images/ucu-portrait-dark.png" alt="UCU Logo" class="h-24 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105" onerror="this.style.display='none'" />
            </div>
            <div class="flex flex-col gap-3 text-white/80 text-[13px] font-medium items-start text-left">
              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="mt-0.5 shrink-0 text-ucu-yellow/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p class="leading-relaxed">1 San Vicente West<br />Urdaneta City, Pangasinan 2428</p>
              </div>
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="shrink-0 text-ucu-yellow/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <p>(075) 529-5223</p>
              </div>
            </div>
          </div>

        </div>

        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="border-t border-white/10 pt-6 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 text-center lg:text-left">
            
            <div class="text-white/60 text-[11px] tracking-[0.05em] font-medium lg:w-1/3">
              &copy; 2026 Urdaneta City University - External Office and Linkages. All rights reserved.
            </div>
            
            <div class="flex flex-wrap justify-center lg:justify-end gap-x-2 gap-y-1 text-[10px] text-white/40 uppercase tracking-wider font-semibold lg:w-2/3">
              <span class="hover:text-white/80 transition-colors cursor-default">UCU SDG</span>
              <span>|</span>
              <span class="hover:text-white/80 transition-colors cursor-default">UCU Sustainable Development Goals</span>
              <span>|</span>
              <span class="hover:text-white/80 transition-colors cursor-default">UCU Linkages</span>
              <span>|</span>
              <span class="hover:text-white/80 transition-colors cursor-default">Smart Eco Campus</span>
              <span>|</span>
              <span class="hover:text-white/80 transition-colors cursor-default">Times Higher Education Impact Rankings</span>
            </div>
            
          </div>
        </div>

      </footer>
    `;
  }
}

/**
 * UCU Hero Banner Component
 * Upgraded with Staggered Load Animations for premium text reveal
 * while keeping the background instantly visible.
 */
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

    // Premium Staggered Reveal CSS
    const styleBlock = `
      <style>
        @keyframes ucuHeroReveal {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .ucu-hero-reveal {
          animation: ucuHeroReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Ensures elements stay hidden until animation fires */
        }
      </style>
    `;

    // Note how we wrap the text in TWO divs:
    // Outer 'hero-fade-el' handles JS scroll fade. Inner 'ucu-hero-reveal' handles CSS load animation.
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
        if (items.length > 0) {
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

    // Initialize Text Carousel
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

    // Initialize Scroll-based Line-by-Line Fade
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

/**
 * UCU Partner Grid Component
 * Dynamically renders the institutional linkages from window.UCU_PARTNERS
 * Upgraded with animated expanding gradient bottom borders
 */
class UcuPartnerGrid extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const category = this.getAttribute("category");
    const partners = window.UCU_PARTNERS
      ? window.UCU_PARTNERS.filter((p) => p.category === category)
      : [];

    if (partners.length === 0) {
      this.innerHTML = `<p class="text-muted text-sm italic">Partner data currently initializing...</p>`;
      return;
    }

    const gridHtml = partners
      .map((partner) => {
        const innerHtml = `
        <img src="${partner.logoSrc}" alt="${partner.name} Logo" class="w-[75%] h-[75%] object-contain transition-all duration-300 group-hover:-translate-y-3 group-hover:scale-75 group-hover:opacity-20 relative z-10" loading="lazy" onerror="this.style.display='none'" />
        
        <div class="absolute inset-0 flex items-center justify-center p-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none z-10">
          <span class="text-center text-[0.65rem] font-black text-ucu-blue-dark uppercase tracking-widest whitespace-normal leading-tight text-balance drop-shadow-sm">${partner.name}</span>
        </div>

        <!-- NEW: Animated Hover Gradient Border -->
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ucu-blue to-ucu-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center z-20"></div>
      `;

        const baseClasses =
          "bg-white/80 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-[0_4px_15px_rgba(36,48,94,0.03)] hover:shadow-[0_8px_25px_rgba(36,48,94,0.08)] transition-all duration-300 flex items-center justify-center aspect-[2/1] group relative overflow-hidden";

        if (partner.url && partner.url.trim() !== "") {
          return `<a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="${baseClasses} cursor-pointer">${innerHtml}</a>`;
        } else {
          return `<div class="${baseClasses} cursor-default">${innerHtml}</div>`;
        }
      })
      .join("");

    this.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
        ${gridHtml}
      </div>
    `;
  }
}

/**
 * UCU Country Grid Component
 * Renders the global reach badge cloud from window.UCU_COUNTRIES
 * Upgraded with High-Performance CSS Sprites & Minimalist 1:1 Typography
 */
class UcuCountryGrid extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const countries = window.UCU_COUNTRIES || [];

    if (countries.length === 0) {
      this.innerHTML = `<p class="text-muted text-sm italic text-center w-full">Country data currently initializing...</p>`;
      return;
    }

    // The CSS Sprite Dictionary (ISO 3166-1 alpha-2 codes)
    const flagMap = {
      Philippines: "ph",
      Turkey: "tr",
      Bangladesh: "bd",
      Indonesia: "id",
      Japan: "jp",
      Oman: "om",
      "South Korea": "kr",
      Thailand: "th",
      Taiwan: "tw",
      Vietnam: "vn",
      Malaysia: "my",
      China: "cn",
      "Bosnia and Herzegovina": "ba",
      "United Kingdom": "gb",
      Switzerland: "ch",
      Poland: "pl",
      USA: "us",
      Canada: "ca",
    };

    const pillsHtml = countries
      .map((country) => {
        const isoCode = flagMap[country] || "un"; // Fallback to UN flag if unregistered

        return `
      <div class="group inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-[0_2px_10px_rgba(36,48,94,0.04)] hover:shadow-[0_8px_20px_rgba(36,48,94,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-default">
        
        <!-- The CSS Sprite Flag -->
        <span class="fi fi-${isoCode} shrink-0 text-base transform transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-0.5 drop-shadow-sm origin-center rounded-sm overflow-hidden"></span>
        
        <!-- The Country Name -->
        <span class="text-[0.65rem] font-bold text-ucu-blue-dark uppercase tracking-widest">${country}</span>
        
      </div>
    `;
      })
      .join("");

    this.innerHTML = `
      <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 p-4 md:p-8 bg-slate-100/50 rounded-[2rem] border border-black/5">
        ${pillsHtml}
      </div>
    `;
  }
}

/**
 * UCU Ranking Timeline Component
 * Enforces the Premium White Card layout with Solid Color Sub-Grids & Watermarks
 * Features self-contained IntersectionObserver for sequential scroll reveals
 */
class UcuRankingTimeline extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const rankings = window.UCU_RANKINGS || [];

    if (rankings.length === 0) {
      this.innerHTML = `<p class="text-muted text-sm italic text-center w-full">Ranking data currently initializing...</p>`;
      return;
    }

    const formatRankValue = (val) => {
      if (typeof val === "string" && val.includes("#")) {
        return val.replace(
          /#/g,
          '<span class="text-[0.6em] text-white/60 font-bold mr-[1px] relative -top-[0.05em]">#</span>',
        );
      }
      return val;
    };

    const timelineHtml = rankings
      .map((rank, index) => {
        const isRightAligned = index % 2 === 0;
        const alignClass = isRightAligned
          ? "md:pr-14 md:text-right"
          : "md:pl-14 md:order-last text-left";

        const pointerClass = isRightAligned
          ? "md:before:-right-[9px] md:before:border-r md:before:border-t"
          : "before:-left-[9px] before:border-l before:border-b";

        const metricsHtml = rank.metrics
          .map((metric) => {
            let bgColor = metric.color || "#394a8a";
            const officialExceptionColors = [
              "#E5243B",
              "#4C9F38",
              "#C5192D",
              "#FF3A21",
              "#00689D",
              "#19486A",
            ];

            if (!officialExceptionColors.includes(bgColor)) {
              if (["#1", "#2"].includes(metric.value.trim())) {
                bgColor = "#c43643";
              } else {
                bgColor = "#394a8a";
              }
            }

            return `
          <div class="relative overflow-hidden p-5 rounded-[12px] shadow-sm hover:shadow-md transition-shadow duration-300 group/metric" style="background-color: ${bgColor};">
            <div class="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-white/10 pointer-events-none group-hover/metric:scale-110 transition-transform duration-500"></div>
            <div class="relative z-10">
              <p class="text-[9px] font-bold uppercase text-white/80 tracking-widest mb-1.5 leading-tight">${metric.label}</p>
              <p class="text-3xl md:text-4xl font-black text-white leading-none tracking-tight flex items-baseline">${formatRankValue(metric.value)}</p>
              ${metric.subtext ? `<p class="text-[10px] text-white/70 font-medium mt-2.5 leading-snug">${metric.subtext}</p>` : ""}
            </div>
          </div>
        `;
          })
          .join("");

        // NEW: Added `timeline-reveal`, `opacity-0`, and `translate-y-12` for the scroll animation
        return `
        <div class="timeline-item timeline-reveal opacity-0 translate-y-12 group relative flex flex-col md:flex-row items-center transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom" data-org="${rank.org}">
          
          <div class="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 top-6 md:top-1/2 md:-translate-y-1/2">
            <div class="w-4 h-4 rounded-full bg-white border-4 border-ucu-blue-dark/90 group-hover:scale-125 group-hover:bg-ucu-yellow transition-all duration-300 shadow-sm"></div>
          </div>

          <div class="w-full md:w-1/2 ${alignClass}">
            <div class="bg-white border border-gray-200 p-8 md:p-10 rounded-[1.5rem] shadow-[0_8px_30px_rgba(36,48,94,0.04)] hover:shadow-[0_15px_40px_rgba(36,48,94,0.08)] transition-all duration-300 relative before:content-[''] before:absolute before:top-6 md:before:top-1/2 before:-translate-y-1/2 ${pointerClass} before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-gray-200 text-left">
              
              <div class="flex items-center gap-3 mb-8">
                <span class="text-ucu-blue-dark text-sm font-black">${rank.year}</span>
                <span class="text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest ${rank.badgeClass} shadow-sm">${rank.org}</span>
              </div>
              
              <div class="mb-8">
                <p class="text-[10px] font-bold text-muted/90 uppercase tracking-[0.15em] mb-1.5">${rank.mainRankLabel}</p>
                <h4 class="text-6xl md:text-7xl font-black text-ucu-blue-dark tracking-tighter leading-none">${rank.mainRank}</h4>
                <p class="text-[10px] font-bold text-muted/90 uppercase tracking-[0.15em] mt-3">${rank.category}</p>
                <div class="flex items-center gap-1.5 mt-5">
                  <div class="w-9 h-1 rounded-full bg-ucu-blue"></div>
                  <div class="w-5 h-1 rounded-full bg-ucu-red"></div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 w-full pt-2">
                ${metricsHtml}
              </div>

              <div class="border-t border-black/5 mt-10 pt-5 flex justify-between items-center w-full">
                <a href="${rank.publicationUrl}" target="_blank" class="text-[10px] font-black text-ucu-blue-dark/80 hover:text-ucu-red uppercase tracking-widest transition-colors flex items-center gap-1.5 group/link">
                  See Publication
                  <svg class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <span class="text-[9px] font-bold text-muted/60 uppercase tracking-widest">${rank.publicationDate}</span>
              </div>

            </div>
          </div>
          <div class="hidden md:block w-1/2"></div>
        </div>
      `;
      })
      .join("");

    this.innerHTML = `
      <div class="relative pl-8 md:pl-0 w-full">
        <div class="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-gray-300 -translate-x-1/2"></div>
        <div class="space-y-16 relative w-full" id="timeline-list">
          ${timelineHtml}
        </div>
        <div id="empty-state" class="hidden py-16 text-center w-full relative z-10">
          <p class="text-muted text-sm font-black uppercase tracking-[0.2em] bg-white/50 border border-white inline-block px-6 py-3 rounded-xl shadow-sm">No rankings found for this category.</p>
        </div>
      </div>
    `;

    // NEW: Self-contained IntersectionObserver for scroll reveals
    setTimeout(() => {
      const revealTargets = this.querySelectorAll(".timeline-reveal");

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Remove the translation and opacity locks to let the card float up
              entry.target.classList.remove("opacity-0", "translate-y-12");
              // Stop observing once it has been revealed
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
      );

      revealTargets.forEach((el) => observer.observe(el));
    }, 100);
  }
}

/**
 * UCU Ranking Carousel Component
 * Renders the top highlight cards with a Custom Scrollbar and high-speed auto-scroll
 */
class UcuRankingCarousel extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const rankings = window.UCU_RANKINGS || [];

    // Filter only rankings that have a short description (The "Crown Jewels")
    const highlights = rankings.filter((r) => r.shortDescription);

    if (highlights.length === 0) return;

    // Helper: Formats the giant number, making the # symbol red and smaller
    const formatCrownRank = (val) => {
      if (typeof val === "string" && val.includes("#")) {
        return val.replace(
          /#/g,
          '<span class="text-ucu-red text-[0.7em] mr-[3px] relative -top-[0.08em] inline-block font-black">#</span>',
        );
      }
      return val;
    };

    const generateCard = (rank) => `
      <div class="flex-none w-[320px] md:w-[380px] group/card cursor-pointer">
        <div class="h-full bg-white border border-gray-200 p-8 md:p-10 rounded-[1.5rem] flex flex-col justify-between transition-all duration-500 hover:border-ucu-blue/30 shadow-[0_8px_20px_rgba(36,48,94,0.04)] hover:shadow-[0_15px_40px_rgba(36,48,94,0.08)]">
          
          <div>
            <div class="flex justify-between items-center mb-6">
              <span class="text-[10px] font-bold px-3 py-1 rounded-[6px] uppercase tracking-widest ${rank.crownBadgeClass || rank.badgeClass}">${rank.org}</span>
              <span class="text-ucu-blue-dark text-sm font-black">${rank.year}</span>
            </div>
            
            <h3 class="text-6xl font-black mb-1 text-ucu-blue-dark transition-transform flex items-baseline tracking-tighter leading-none">${formatCrownRank(rank.mainRank)}</h3>
            <p class="text-ucu-blue-dark text-[10px] font-bold mb-4 uppercase tracking-[0.15em] mt-3">${rank.category}</p>
            
            <!-- The Blue + Red Two-Bar Divider -->
            <div class="flex items-center gap-1.5 mt-4">
              <div class="w-7 h-1 rounded-full bg-ucu-blue"></div>
              <div class="w-3 h-1 rounded-full bg-ucu-red"></div>
            </div>
          </div>
          
          <div class="mt-8 border-t border-black/5 pt-6">
            <p class="text-muted/90 text-xs font-medium leading-relaxed">
              ${rank.shortDescription}
            </p>
          </div>
        </div>
      </div>
    `;

    // Duplicated array to allow continuous scrolling
    const marqueeItems = [...highlights, ...highlights, ...highlights];
    const marqueeHtml = marqueeItems.map(generateCard).join("");

    this.innerHTML = `
      <style>
        /* Premium Custom Horizontal Scrollbar */
        .ucu-custom-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .ucu-custom-scroll::-webkit-scrollbar-track {
          background: rgba(36,48,94,0.05);
          border-radius: 10px;
          margin-inline: 16px;
        }
        .ucu-custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(36,48,94,0.25);
          border-radius: 10px;
          cursor: pointer;
        }
        .ucu-custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(196,54,67,0.8); /* Turns UCU Red on hover */
        }
        /* Firefox Support */
        .ucu-custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(36,48,94,0.25) rgba(36,48,94,0.05);
        }
      </style>
      
      <div class="w-full relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <!-- Native Scroll Container (Snap classes removed) -->
        <div id="carousel-track" class="flex gap-6 overflow-x-auto pb-6 ucu-custom-scroll will-change-scroll">
          ${marqueeHtml}
        </div>
      </div>
    `;

    // High-Speed Native Auto-Scroll Logic
    setTimeout(() => {
      const track = this.querySelector("#carousel-track");
      if (!track) return;

      let isHovered = false;
      let animationId;
      const speed = 1.5;

      const autoScroll = () => {
        if (!isHovered) {
          track.scrollLeft += speed;

          // Calculate the width of exactly one "set" of cards.
          // scrollWidth is total width (3 sets). We divide by 3.
          const singleSetWidth = track.scrollWidth / 3;

          // If we have scrolled past the first set, instantly snap back by exactly one set width.
          // This creates a flawless infinite loop.
          if (track.scrollLeft >= singleSetWidth) {
            track.scrollLeft -= singleSetWidth;
          }
        }
        animationId = requestAnimationFrame(autoScroll);
      };

      // Pause interactions
      track.addEventListener("mouseenter", () => (isHovered = true));
      track.addEventListener("mouseleave", () => (isHovered = false));
      track.addEventListener("touchstart", () => (isHovered = true), {
        passive: true,
      });
      track.addEventListener("touchend", () => (isHovered = false));

      track.addEventListener("mousedown", () => (isHovered = true));
      track.addEventListener("mouseup", () => (isHovered = false));

      requestAnimationFrame(autoScroll);
    }, 100);
  }
}

/**
 * UCU Research Feed Component
 * Renders the interactive filter bar and dynamic research cards.
 */
class UcuResearchFeed extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    // 1. Dynamic Year Filtering Engine
    const targetYear = this.getAttribute("year");
    const allResearch = window.UCU_RESEARCH || [];

    const research = targetYear
      ? allResearch.filter((paper) => paper.date.includes(targetYear))
      : allResearch;

    // Official UN SDG Hex Colors
    const sdgColors = {
      1: "#E5243B",
      2: "#DDA63A",
      3: "#4C9F38",
      4: "#C5192D",
      5: "#FF3A21",
      6: "#26BDE2",
      7: "#FCC30B",
      8: "#A21942",
      9: "#FD6925",
      10: "#DD1367",
      11: "#FD9D24",
      12: "#BF8B2E",
      13: "#3F7E44",
      14: "#0A97D9",
      15: "#56C02B",
      16: "#00689D",
      17: "#19486A",
    };

    const generateFilters = () => {
      let btns = `<button data-filter="all" class="filter-btn px-5 py-2.5 rounded-full text-xs font-bold border border-ucu-blue-dark/20 bg-white shadow-sm transition-all hover:bg-gray-50 data-[active=true]:bg-ucu-blue-dark data-[active=true]:text-white data-[active=true]:border-ucu-blue-dark text-main2" data-active="true">All Research</button>`;
      for (let i = 1; i <= 17; i++) {
        btns += `<button data-filter="${i}" style="--sdg-color: ${sdgColors[i]};" class="filter-btn sdg-hover-btn px-4 py-2.5 rounded-full text-xs font-bold border border-gray-200 bg-white shadow-sm transition-all text-main2" data-active="false">SDG ${i}</button>`;
      }
      return btns;
    };

    if (research.length === 0) {
      this.innerHTML = `
          <div class="py-20 text-center w-full bg-white/50 border border-gray-200 rounded-2xl reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <p class="text-muted text-sm font-black uppercase tracking-[0.2em]">No research publications found for ${targetYear || "this selection"}.</p>
          </div>
        `;
      this.initObserver();
      return;
    }

    const cardsHtml = research
      .map((paper) => {
        const sdgDataStr = paper.sdgs.join(" ");

        const sdgBadges = paper.sdgs
          .map(
            (sdgNum) => `
        <div class="flex items-center justify-center w-7 h-7 rounded text-white text-xs font-black shadow-sm" style="background-color: ${sdgColors[sdgNum] || "#24305e"};" title="SDG ${sdgNum}">${sdgNum}</div>
      `,
          )
          .join("");

        const keywordPills = paper.keywords
          ? paper.keywords
              .map(
                (kw) => `
        <span class="text-[0.6rem] font-bold text-ucu-blue-dark bg-ucu-blue-dark/5 px-2.5 py-1 rounded border border-ucu-blue-dark/10 tracking-widest uppercase">${kw}</span>
      `,
              )
              .join("")
          : "";

        return `
        <article class="research-card reveal-card opacity-0 translate-y-12 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-lg flex flex-col" data-sdgs="${sdgDataStr}">
          <h3 class="text-xl md:text-2xl font-black text-ucu-blue-dark mb-2 leading-tight">${paper.title}</h3>
          
          <div class="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
            <span class="text-sm font-semibold text-main2 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              ${paper.authors}
            </span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span class="text-xs font-mono font-bold text-muted uppercase tracking-widest">${paper.date}</span>
          </div>
          
          <p class="text-sm text-muted leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">${paper.abstract}</p>
          
          ${keywordPills ? `<div class="flex flex-wrap gap-2 mb-8">${keywordPills}</div>` : ""}
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-5 mt-auto">
            <div>
              <span class="text-[0.55rem] font-black text-muted uppercase tracking-[0.2em] mb-2 block">SDG Alignment</span>
              <div class="flex flex-wrap gap-1.5">
                ${sdgBadges}
              </div>
            </div>
            <a href="${paper.pdfLink}" target="_blank" class="inline-flex items-center justify-center border border-ucu-blue-dark text-ucu-blue-dark px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-ucu-blue-dark hover:text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-ucu-blue-dark shrink-0">
              View PDF
            </a>
          </div>
        </article>
      `;
      })
      .join("");

    this.innerHTML = `
      <style>
        .sdg-hover-btn:hover {
          border-color: var(--sdg-color);
          color: var(--sdg-color);
          background-color: color-mix(in srgb, var(--sdg-color) 5%, white);
        }
        .sdg-hover-btn[data-active="true"] {
          background-color: var(--sdg-color);
          border-color: var(--sdg-color);
          color: white;
        }
      </style>

      <section class="sticky top-[70px] md:top-[80px] z-30 bg-canvas/90 backdrop-blur-md py-5 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-black uppercase tracking-[0.2em] text-muted">Filter by Alignment</h2>
        </div>
        
        <div class="flex flex-wrap gap-3" id="filter-group">
          ${generateFilters()}
        </div>
      </section>

      <section class="max-w-4xl w-full">
        <div class="flex flex-col gap-6" id="research-feed">
          ${cardsHtml}
          
          <div id="empty-state" class="hidden py-16 text-center w-full bg-white/50 border border-gray-200 rounded-2xl">
            <p class="text-muted text-sm font-black uppercase tracking-[0.2em]">No research publications found for this specific goal.</p>
          </div>
        </div>
      </section>
    `;

    setTimeout(() => {
      const buttons = this.querySelectorAll(".filter-btn");
      const cards = this.querySelectorAll(".research-card");
      const emptyState = this.querySelector("#empty-state");

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const selectedFilter = btn.getAttribute("data-filter");

          buttons.forEach((b) => b.setAttribute("data-active", "false"));
          btn.setAttribute("data-active", "true");

          let visibleCount = 0;

          cards.forEach((card) => {
            const cardSdgs = card.getAttribute("data-sdgs").split(" ");

            if (selectedFilter === "all" || cardSdgs.includes(selectedFilter)) {
              card.style.display = "flex";
              card.style.opacity = "0";
              card.style.transform = "translateY(12px)";
              void card.offsetWidth;
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
              visibleCount++;
            } else {
              card.style.display = "none";
            }
          });

          if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? "block" : "none";
          }
        });
      });

      this.initObserver();
    }, 50);
  }

  initObserver() {
    const revealTargets = this.querySelectorAll(".reveal-card");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        let delayCounter = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove(
                "opacity-0",
                "translate-y-12",
                "translate-y-8",
              );
            }, delayCounter * 100);
            delayCounter++;
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
}

/**
 * UCU Impact & Events Feed (Google News Asymmetric Layout)
 * UPGRADED: Two-State Architecture. Switches seamlessly between Editorial Layout and Grid Results.
 */
class UcuImpactFeed extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const targetYear = this.getAttribute("year") || "2025";
    const allEvents = window.UCU_EVENTS || [];

    // Save to instance for the dynamic filter engine
    this.pageEvents = allEvents.filter(
      (ev) => ev.isFeatured === true && ev.date.includes(targetYear),
    );
    this.highlights = this.pageEvents.filter((ev) => ev.isHighlights === true);
    this.recents = this.pageEvents.filter((ev) => ev.isHighlights !== true);

    this.SDG_COLORS = {
      1: "#E5243B",
      2: "#DDA63A",
      3: "#4C9F38",
      4: "#C5192D",
      5: "#FF3A21",
      6: "#26BDE2",
      7: "#FCC30B",
      8: "#A21942",
      9: "#FD6925",
      10: "#DD1367",
      11: "#FD9D24",
      12: "#BF8B2E",
      13: "#3F7E44",
      14: "#0A97D9",
      15: "#56C02B",
      16: "#00689D",
      17: "#19486A",
    };

    // 1. YEAR AT A GLANCE (Premium Glassmorphism Ribbon)
    const yearAtGlanceHtml = `
      <div class="mb-10 rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgba(36,48,94,0.06)] flex flex-col reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        <div class="bg-white/70 backdrop-blur-xl border border-white p-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4 text-center divide-x-0 md:divide-x divide-black/10 relative">
          
          <div class="flex flex-col items-center justify-center p-2 relative z-10">
            <span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">
              ${this.pageEvents.length}
            </span>
            <span class="text-[10px] font-bold text-muted uppercase tracking-widest">Events</span>
          </div>

          <div class="flex flex-col items-center justify-center p-2 relative z-10">
            <span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">12</span>
            <span class="text-[10px] font-bold text-muted uppercase tracking-widest">Programs</span>
          </div>

          <div class="flex flex-col items-center justify-center p-2 relative z-10">
            <span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">
              <!-- FIX: Explicit Hex Code for the Red Plus Sign -->
              5 <span class="text-[#c43643] text-2xl">+</span>
            </span>
            <span class="text-[10px] font-bold text-muted uppercase tracking-widest">Reached</span>
          </div>

          <div class="flex flex-col items-center justify-center p-2 relative z-10">
            <span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">9</span>
            <span class="text-[10px] font-bold text-muted uppercase tracking-widest">Partners</span>
          </div>

        </div>

        <!-- FIX: Explicit Hex Codes bypass the Tailwind CDN compiler bug. Added w-full for safety. -->
<div style="height: 6px; flex-shrink: 0; background: linear-gradient(to right, #24305e, #c43643);"></div>

      </div>
    `;

    // 2. SDG FILTER ENGINE (Buttons + Sticky Desktop Headers)
    const generateFilters = () => {
      let btns = `<button data-filter="all" class="filter-btn px-5 py-2.5 rounded-full text-xs font-bold border border-ucu-blue-dark/20 bg-white shadow-sm transition-all hover:bg-gray-50 data-[active=true]:bg-ucu-blue-dark data-[active=true]:text-white data-[active=true]:border-ucu-blue-dark text-main2" data-active="true">All Engagements</button>`;
      for (let i = 1; i <= 17; i++) {
        btns += `<button data-filter="${i}" style="--sdg-color: ${this.SDG_COLORS[i]};" class="filter-btn sdg-hover-btn px-4 py-2.5 rounded-full text-xs font-bold border border-gray-200 bg-white shadow-sm transition-all text-main2" data-active="false">SDG ${i}</button>`;
      }
      return btns;
    };

    const filterHtml = `
      <section class="sticky top-[70px] md:top-[80px] z-40 bg-[#f8fafc] pt-5 pb-4 mb-8 reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-black uppercase tracking-[0.2em] text-muted">Filter by Alignment</h2>
        </div>
        <div class="flex flex-wrap gap-3 pb-6" id="filter-group">
          ${generateFilters()}
        </div>

        <!-- DESKTOP STICKY HEADERS: Inside the filter so they hide cleanly when filtered -->
        <div id="desktop-headers-wrapper" class="hidden lg:grid grid-cols-1 gap-10 xl:gap-12 w-full transition-opacity duration-300">
          
          <div class="flex items-center w-full gap-4">
            <div class="w-1.5 h-6 bg-ucu-red rounded-full shadow-sm flex-shrink-0"></div>
            <h2 class="flex-shrink-0 text-xl md:text-2xl font-bold text-ucu-blue-dark tracking-tight m-0 pr-2">Top Stories</h2>
            <div class="flex-grow h-px bg-gray-300/70 rounded-full"></div>
          </div>
          
        </div>
      </section>
    `;

    // 3. EDITORIAL LAYOUT CARDS (Rendered initially)
    const highlightsHtml =
      this.highlights
        .map((ev) => {
          const tagsHtml = ev.relatedSdgs
            .map(
              (num) => `
        <div class="w-5 h-5 rounded-sm text-white text-[9px] flex items-center justify-center font-bold shadow-sm" style="background-color: ${this.SDG_COLORS[num]};">${num}</div>
      `,
            )
            .join("");

          return `
        <button data-modal-trigger="${ev.id}" class="event-card group text-left w-full flex flex-col focus:outline-none reveal-card opacity-0 translate-y-12 transition-all duration-[600ms] bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden hover:shadow-lg hover:border-gray-300">
          <div class="w-full aspect-video md:aspect-[21/9] overflow-hidden relative bg-gray-100 border-b border-gray-100">
            <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
          </div>
          <div class="flex flex-col p-6 md:p-8">
            <div class="flex items-center justify-between gap-4 mb-4">
              <p class="text-[10px] font-bold text-ucu-red uppercase tracking-[0.2em] flex items-center gap-2 m-0">
                <span class="w-1.5 h-1.5 rounded-full bg-ucu-red"></span>
                ${ev.date}
              </p>
              <div class="flex items-center gap-1.5 shrink-0">${tagsHtml}</div>
            </div>
            <h3 class="text-2xl md:text-3xl font-black text-ucu-blue-dark leading-tight tracking-tight group-hover:text-ucu-red transition-colors duration-300 mb-3">${ev.title}</h3>
            <p class="text-sm md:text-base font-medium leading-relaxed text-muted line-clamp-3 m-0">${ev.desc}</p>
          </div>
        </button>
      `;
        })
        .join("") ||
      `<p class="text-muted italic">No highlighted events found.</p>`;

    const recentsHtml =
      this.recents
        .map((ev) => {
          const tagsHtml = ev.relatedSdgs
            .slice(0, 3)
            .map(
              (num) => `
        <div class="w-4 h-4 rounded-sm text-white text-[8px] flex items-center justify-center font-bold" style="background-color: ${this.SDG_COLORS[num]};">${num}</div>
      `,
            )
            .join("");

          return `
        <button data-modal-trigger="${ev.id}" class="event-card group text-left w-full flex items-start gap-5 py-5 focus:outline-none hover:bg-gray-50/50 transition-colors px-6 -mx-6">
          <div class="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-gray-100">
             <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover" loading="lazy">
          </div>
          <div class="flex flex-col h-full justify-center flex-grow">
            <p class="text-[9px] font-bold text-ucu-red uppercase tracking-[0.2em] mb-1">${ev.date}</p>
            <h4 class="text-sm font-bold text-ucu-blue-dark leading-snug group-hover:text-ucu-red transition-colors duration-200 line-clamp-2 mb-2.5">${ev.title}</h4>
            <div class="flex items-center gap-1.5 mt-auto">${tagsHtml}</div>
          </div>
        </button>
      `;
        })
        .join("") ||
      `<div class="px-6 py-8 text-center"><p class="text-muted text-xs font-bold tracking-widest uppercase">No recent events found.</p></div>`;

    const modalsHtml = this.pageEvents
      .map(
        (ev) => `
      <ucu-modal-shell 
        modal-id="${ev.id}" 
        title="${ev.title}" 
        badge="${ev.date}" 
        content-src="${ev.src}"
        data-sdgs='${JSON.stringify(ev.relatedSdgs)}'>
      </ucu-modal-shell>
    `,
      )
      .join("");

    this.innerHTML = `
      <style>
        .sdg-hover-btn:hover { border-color: var(--sdg-color); color: var(--sdg-color); background-color: color-mix(in srgb, var(--sdg-color) 5%, white); }
        .sdg-hover-btn[data-active="true"] { background-color: var(--sdg-color); border-color: var(--sdg-color); color: white; }
      </style>

      ${yearAtGlanceHtml}
      ${filterHtml}

      <!-- STATE 1: DEFAULT EDITORIAL LAYOUT (7-col / 5-col) -->
      <div id="default-layout" class="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 relative w-full pb-16">
        
        <div class="lg:col-span-7 flex flex-col gap-6" id="highlights-container">
          <!-- MOBILE INLINE HEADER -->
          <div class="lg:hidden flex items-center w-full gap-4 mb-2" id="mobile-highlights-header">
            <div class="w-1.5 h-6 bg-ucu-red rounded-full shadow-sm flex-shrink-0"></div>
            <h2 class="flex-shrink-0 text-xl md:text-2xl font-bold text-ucu-blue-dark tracking-tight m-0 pr-2">Top Stories</h2>
            <div class="flex-grow h-px bg-gray-300/70 rounded-full"></div>
          </div>
          ${highlightsHtml}
        </div>

        <div class="lg:col-span-5 flex flex-col">
          <div class="bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h3 class="text-[10px] font-black text-ucu-blue-dark uppercase tracking-widest m-0">Recent Events Feed</h3>
            </div>
            <div class="flex flex-col divide-y divide-gray-100 px-6 pb-2">
              ${recentsHtml}
            </div>
          </div>
        </div>

      </div>

      <!-- STATE 2: FILTERED GRID LAYOUT (2-col grid, injected dynamically via JS) -->
      <div id="filtered-layout" style="display: none;" class="grid-cols-1 md:grid-cols-2 gap-6 w-full pb-16">
         <!-- Standalone cards will be injected here -->
      </div>
      
      <!-- EMPTY STATE -->
      <div id="global-empty-state" class="hidden py-24 text-center w-full bg-white border border-gray-200 rounded-[1.5rem] mb-16 shadow-sm">
        <p class="text-muted text-xs font-black uppercase tracking-[0.2em]">No engagements found for this specific goal.</p>
      </div>

      ${modalsHtml}
    `;

    setTimeout(() => this.initEngine(), 50);
  }

  // Helper method: Generates a beautiful standalone grid card
  generateStandaloneCard(ev) {
    const tagsHtml = ev.relatedSdgs
      .slice(0, 3)
      .map(
        (num) => `
      <div class="w-5 h-5 rounded-sm text-white text-[9px] flex items-center justify-center font-bold" style="background-color: ${this.SDG_COLORS[num]};">${num}</div>
    `,
      )
      .join("");

    return `
      <button data-modal-trigger="${ev.id}" class="group text-left w-full flex flex-col sm:flex-row items-start gap-5 p-5 bg-white border border-gray-200 rounded-[1.5rem] shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 focus:outline-none reveal-card opacity-0 translate-y-12">
        <div class="w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-gray-100 relative">
           <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
           <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div class="flex flex-col h-full justify-center flex-grow py-1">
          <p class="text-[9px] font-bold text-ucu-red uppercase tracking-[0.2em] mb-1.5">${ev.date}</p>
          <h4 class="text-[15px] font-bold text-ucu-blue-dark leading-snug group-hover:text-ucu-red transition-colors duration-200 line-clamp-2 mb-4">${ev.title}</h4>
          <div class="flex items-center gap-1.5 mt-auto">
            ${tagsHtml}
          </div>
        </div>
      </button>
    `;
  }

  initEngine() {
    // 1. Initial Scroll Observer
    const observeCards = (container) => {
      const targets = container.querySelectorAll(".reveal-card");
      const observer = new IntersectionObserver(
        (entries, obs) => {
          let delayCounter = 0;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.remove(
                  "opacity-0",
                  "translate-y-12",
                  "translate-y-8",
                );
              }, delayCounter * 100);
              delayCounter++;
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );
      targets.forEach((el) => observer.observe(el));
    };

    observeCards(this);

    // 2. The Multi-State Filter Engine
    const buttons = this.querySelectorAll(".filter-btn");
    const defaultLayout = this.getElementById("default-layout");
    const filteredLayout = this.getElementById("filtered-layout");
    const emptyState = this.getElementById("global-empty-state");
    const desktopHeaders = this.getElementById("desktop-headers-wrapper");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedFilter = btn.getAttribute("data-filter");

        buttons.forEach((b) => b.setAttribute("data-active", "false"));
        btn.setAttribute("data-active", "true");

        if (selectedFilter === "all") {
          // STATE 1: Show Original Layout
          defaultLayout.style.display = "";
          if (desktopHeaders) desktopHeaders.style.display = "";

          filteredLayout.style.display = "none";
          emptyState.style.display = "none";
        } else {
          // STATE 2: Show Filtered Grid
          defaultLayout.style.display = "none";
          if (desktopHeaders) desktopHeaders.style.display = "none"; // Hides the Top Stories headers

          const numFilter = parseInt(selectedFilter);
          const matchedEvents = this.pageEvents.filter((ev) =>
            ev.relatedSdgs.includes(numFilter),
          );

          if (matchedEvents.length === 0) {
            filteredLayout.style.display = "none";
            emptyState.style.display = "block";
          } else {
            // Dynamically inject standalone grid cards
            filteredLayout.innerHTML = matchedEvents
              .map((ev) => this.generateStandaloneCard(ev))
              .join("");
            filteredLayout.style.display = "grid"; // Activates the 2-column grid
            emptyState.style.display = "none";

            // Trigger load animations on newly created cards
            observeCards(filteredLayout);
          }
        }
      });
    });
  }

  getElementById(id) {
    return this.querySelector(`#${id}`);
  }
}

if (!customElements.get("ucu-impact-feed")) {
  customElements.define("ucu-impact-feed", UcuImpactFeed);
}

if (!customElements.get("ucu-research-feed")) {
  customElements.define("ucu-research-feed", UcuResearchFeed);
}

if (!customElements.get("ucu-ranking-carousel")) {
  customElements.define("ucu-ranking-carousel", UcuRankingCarousel);
}

if (!customElements.get("ucu-ranking-timeline")) {
  customElements.define("ucu-ranking-timeline", UcuRankingTimeline);
}

if (!customElements.get("ucu-header")) {
  customElements.define("ucu-header", UcuHeader);
}

if (!customElements.get("ucu-footer")) {
  customElements.define("ucu-footer", UcuFooter);
}

if (!customElements.get("ucu-hero-banner")) {
  customElements.define("ucu-hero-banner", UcuHeroBanner);
}

if (!customElements.get("ucu-partner-grid")) {
  customElements.define("ucu-partner-grid", UcuPartnerGrid);
}

if (!customElements.get("ucu-country-grid")) {
  customElements.define("ucu-country-grid", UcuCountryGrid);
}
