class SdgCard extends HTMLElement {
  connectedCallback() {
    const num = this.getAttribute("goal-num") || "";
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const color = this.getAttribute("color") || "#000";
    const bgImg = this.getAttribute("bg-img") || "";
    const logoImg = this.getAttribute("logo-img") || "";
    const targets = this.getAttribute("targets") || "0";
    const events = this.getAttribute("events") || "0";
    const research = this.getAttribute("research") || "0";
    const exploreLink = this.getAttribute("explore-link") || "#";

    // Apply the wrapper classes directly to the custom element to preserve the 'group' state logic
    this.className =
      "group relative text-white aspect-[9/16] overflow-hidden cursor-pointer bg-[#111] focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#24305e] block isolate";
    this.setAttribute("tabindex", "0");

    this.innerHTML = `
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-focus:scale-110 z-0" style="background-image: url('${bgImg}');"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#111]/95 via-[#111]/60 to-[#111]/50 z-10 transition-opacity duration-700 group-hover:opacity-0 group-focus:opacity-0 pointer-events-none"></div>
      
      <img src="${logoImg}" alt="${title}" class="absolute bottom-3 right-3 w-[32%] max-w-[76px] aspect-square object-contain z-20 transition-all duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-right group-hover:opacity-0 group-hover:scale-75 group-hover:translate-y-4 group-focus:opacity-0 group-focus:scale-75 group-focus:translate-y-4" loading="lazy" />
      
      <div class="absolute inset-0 z-30 flex flex-col p-3 md:p-4 opacity-0 invisible translate-y-4 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus:opacity-100 group-focus:visible group-focus:translate-y-0 backdrop-blur-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" style="background-color: ${color}E6;">
        <div class="flex flex-col mb-auto shrink-0">
          <span class="text-[0.55rem] font-bold text-white/80 uppercase tracking-[0.2em] mb-1 drop-shadow-sm">Goal ${num}</span>
          <h4 class="text-sm md:text-base font-black m-0 leading-tight text-left text-white drop-shadow-sm tracking-tight">${title}</h4>
          <p class="text-[0.6rem] md:text-[0.65rem] leading-relaxed text-white/95 mt-1.5 mb-0 text-left font-medium drop-shadow-sm">${subtitle}</p>
        </div>

        <div class="flex flex-col gap-1 mb-3 bg-black/15 rounded-lg p-2.5 border border-white/10 backdrop-blur-sm shrink-0">
          <div class="flex justify-between items-end border-b border-white/10 pb-1">
            <span class="text-[0.5rem] md:text-[0.55rem] uppercase text-white/80 tracking-widest font-bold">Targets</span>
            <span class="text-sm md:text-base font-black text-white leading-none">${targets}</span>
          </div>
          <div class="flex justify-between items-end border-b border-white/10 pb-1 pt-1">
            <span class="text-[0.5rem] md:text-[0.55rem] uppercase text-white/80 tracking-widest font-bold">Events</span>
            <span class="text-sm md:text-base font-black text-white leading-none">${events}</span>
          </div>
          <div class="flex justify-between items-end pt-1">
            <span class="text-[0.5rem] md:text-[0.55rem] uppercase text-white/80 tracking-widest font-bold">Research</span>
            <span class="text-sm md:text-base font-black text-white leading-none">${research}</span>
          </div>
        </div>

        <a href="${exploreLink}" class="flex items-center justify-between w-full bg-white text-ucu-blue-dark text-[0.6rem] md:text-[0.65rem] uppercase font-extrabold tracking-widest py-2 md:py-2.5 px-3 rounded-lg no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gray-50 hover:shadow-lg group/btn relative overflow-hidden focus:outline-none shrink-0">
          <span class="relative z-10">Explore</span>
          <svg class="w-3 h-3 relative z-10 text-ucu-blue-dark transition-transform duration-300 group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    `;
  }
}

class SdgSeeAllCard extends HTMLElement {
  connectedCallback() {
    const link = this.getAttribute("explore-link") || "#";
    this.className =
      "relative bg-[#111] flex flex-col items-center justify-center p-5 aspect-[9/16] group cursor-pointer transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#24305e] block isolate overflow-hidden";
    this.setAttribute("tabindex", "0");

    this.innerHTML = `
      <a href="${link}" class="absolute inset-0 z-30 flex flex-col items-center justify-center no-underline focus:outline-none w-full h-full">
        <img src="../images/sdg/bg/sdg-circle.svg" alt="Global SDG Framework" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] max-w-[500px] h-auto object-contain z-0 opacity-[0.35] transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[30deg] group-hover:scale-110 group-focus:rotate-[30deg]" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#111]/95 via-[#111]/60 to-[#111]/50 z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"></div>
        <div class="relative z-20 flex flex-col items-center gap-3 transition-transform duration-500 group-hover:-translate-y-2 group-focus:-translate-y-2">
          <div class="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:border-ucu-yellow/50 group-hover:bg-white/20 shadow-sm transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-ucu-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-white font-black text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-ucu-yellow">See all</span>
            <span class="text-[0.6rem] text-white/60 text-center font-bold tracking-widest uppercase">17 Goals</span>
          </div>
        </div>
      </a>
    `;
  }
}

class SdgHeroBanner extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.width = "100%";
    this.style.position = "sticky";
    this.style.top = "0";
    this.style.zIndex = "0";

    if (this.hasRendered) return;
    this.hasRendered = true;

    const bgColor = this.getAttribute("bg-color") || "bg-ucu-red";
    const bgImage = this.getAttribute("bg-image") || "";
    const iconImage = this.getAttribute("icon-image") || "";

    const eyebrow = this.getAttribute("eyebrow") || "";
    const headline =
      this.getAttribute("headline") ||
      this.getAttribute("title") ||
      "SDG Title";
    const highlight = this.getAttribute("highlight") || "";
    const description =
      this.getAttribute("description") || this.getAttribute("subtitle") || "";

    const colorMap = {
      "bg-ucu-blue-dark": "from-ucu-blue-dark/70 via-ucu-blue-dark/20",
      "bg-ucu-red": "from-ucu-red/70 via-ucu-red/20",
      "bg-dark-red": "from-dark-red/70 via-dark-red/20",
      "bg-ucu-blue": "from-ucu-blue/70 via-ucu-blue/20",
    };
    const gradientClasses =
      colorMap[bgColor] || "from-ucu-red/70 via-ucu-red/20";

    const eyebrowMarkup = eyebrow
      ? `<div class="mb-4 hero-fade-el"><span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/90 shadow-sm">${eyebrow}</span></div>`
      : "";
    const highlightMarkup = highlight
      ? `<span class="block text-ucu-yellow text-5xl md:text-6xl lg:text-7xl font-extrabold mt-1 md:mt-2 tracking-tighter drop-shadow-lg">${highlight}</span>`
      : "";
    const descriptionMarkup = description
      ? `<p class="text-white/85 text-base md:text-lg font-normal leading-relaxed mt-4 max-w-4xl text-balance hero-fade-el">${description}</p>`
      : "";

    this.innerHTML = `
            <div class="w-full relative z-0">
                <div class="sdg-banner-container w-full h-[320px] md:h-[360px] relative overflow-hidden ${bgColor}">
                    <img src="${bgImage}" class="absolute inset-0 w-full h-full object-cover opacity-30">
                    <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/20 flex items-center w-full">
                        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 font-sans relative">
                            <img src="${iconImage}" class="h-28 w-28 md:h-36 md:w-36 shadow-2xl rounded-2xl shrink-0 hero-fade-el" onerror="this.style.display='none'">
                            <div class="flex flex-col items-start justify-center">
                                ${eyebrowMarkup}
                                <h1 class="text-white text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] drop-shadow-md hero-fade-el">
                                    ${headline}
                                    ${highlightMarkup}
                                </h1>
                                ${descriptionMarkup}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="absolute top-full left-0 w-full h-24 md:h-40 bg-gradient-to-b ${gradientClasses} to-transparent pointer-events-none -z-10"></div>
            </div>
        `;

    // Initialize Scroll-based Line-by-Line Fade for SDG Banner
    setTimeout(() => {
      const bannerContainer = this.querySelector(".sdg-banner-container");
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
      this.scrollHandler();
    }, 50);
  }

  disconnectedCallback() {
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
  }
}

customElements.define("sdg-card", SdgCard);
customElements.define("sdg-see-all-card", SdgSeeAllCard);
