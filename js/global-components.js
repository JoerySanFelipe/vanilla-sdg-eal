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
      <footer class="mt-10 bg-ucu-blue w-full relative overflow-hidden border-t-[4px] border-ucu-red font-sans pb-8">
        
        <div class="absolute top-[10%] left-[5%] w-[32vw] h-[32vw] bg-[radial-gradient(circle,rgba(196,54,67,0.06)_0%,transparent_60%)] rounded-full pointer-events-none z-0"></div>
        <div class="absolute -bottom-[10%] -right-[5%] w-[360px] h-[360px] bg-contain bg-no-repeat bg-center opacity-5 pointer-events-none z-0" style="background-image: url('${base}images/ucu-seal.png');"></div>

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

    // Semantic Typography Variables
    const eyebrow = this.getAttribute("eyebrow") || "";
    const headline =
      this.getAttribute("headline") ||
      this.getAttribute("title") ||
      "UCU External Office";
    const highlight = this.getAttribute("highlight") || "";
    const description =
      this.getAttribute("description") || this.getAttribute("subtitle") || "";
    const carouselData = this.getAttribute("carousel");

    // Bottom transition fade mapping
    const colorMap = {
      "bg-ucu-blue-dark": "from-ucu-blue-dark/70 via-ucu-blue-dark/20",
      "bg-ucu-red": "from-ucu-red/70 via-ucu-red/20",
      "bg-dark-red": "from-dark-red/70 via-dark-red/20",
      "bg-ucu-blue": "from-ucu-blue/70 via-ucu-blue/20",
    };
    const gradientClasses =
      colorMap[bgColor] || "from-ucu-blue/70 via-ucu-blue/20";

    // Typography Markup Implementation with fade tracking classes
    const eyebrowMarkup = eyebrow
      ? `<div class="mb-4 hero-fade-el"><span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/90 shadow-sm">${eyebrow}</span></div>`
      : "";
    const highlightMarkup = highlight
      ? `<span class="block text-ucu-yellow text-5xl md:text-6xl lg:text-7xl font-extrabold mt-1 md:mt-2 tracking-tighter drop-shadow-lg">${highlight}</span>`
      : "";
    const descriptionMarkup = description
      ? `<p class="text-white/85 text-base md:text-lg font-normal leading-relaxed mt-4 max-w-4xl text-balance hero-fade-el">${description}</p>`
      : "";

    let carouselMarkup = "";
    if (carouselData) {
      try {
        const items = JSON.parse(carouselData);
        if (items.length > 0) {
          carouselMarkup = `
                        <div class="relative mt-4 h-8 [perspective:800px] ucu-carousel-container w-full max-w-3xl hero-fade-el">
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
                    `;
        }
      } catch (e) {
        console.error("Invalid carousel data provided to ucu-hero-banner.");
      }
    }

    this.innerHTML = `
            <div class="w-full relative z-0">
                <div class="ucu-banner-container w-full h-[320px] md:h-[360px] relative overflow-hidden ${bgColor}">
                    <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/20 flex items-center w-full">
                        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center font-sans relative">
                            ${eyebrowMarkup}
                            <h1 class="text-white text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] drop-shadow-md hero-fade-el">
                                ${headline}
                                ${highlightMarkup}
                            </h1>
                            ${descriptionMarkup}
                            ${carouselMarkup}
                        </div>
                    </div>
                </div>
                <div class="absolute top-full left-0 w-full h-24 md:h-40 bg-gradient-to-b ${gradientClasses} to-transparent pointer-events-none -z-10"></div>
            </div>
        `;

    // Initialize Carousel
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
          // Absolute position from the top of the sticky banner container
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
      this.scrollHandler(); // Trigger on mount
    }, 50);
  }

  disconnectedCallback() {
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
  }
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

if (!customElements.get("sdg-hero-banner")) {
  customElements.define("sdg-hero-banner", SdgHeroBanner);
}
