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

// Append to js/sdg-components.js

const SDG_COLORS = [
  "#E5243B",
  "#DDA63A",
  "#4C9F38",
  "#C5192D",
  "#FF3A21",
  "#26BDE2",
  "#FCC30B",
  "#A21942",
  "#FD6925",
  "#DD1367",
  "#FD9D24",
  "#BF8B2E",
  "#3F7E44",
  "#0A97D9",
  "#56C02B",
  "#00689D",
  "#19486A",
];

class UcuSdgPageHero extends HTMLElement {
  connectedCallback() {
    const num = this.getAttribute("sdg") || "1";
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const hex = this.getAttribute("hex") || "#E5243B";
    const bgImage = this.getAttribute("bg-image") || "";
    const iconImage = this.getAttribute("icon-image") || "";

    // Convert hex to semi-transparent for the gradient fade
    const rightFadeColor = hex + "BF";

    const spectrumHtml = SDG_COLORS.map(
      (color) =>
        `<div class="flex-1 h-full" style="background-color: ${color};"></div>`,
    ).join("");

    this.innerHTML = `
      <div class="relative w-full h-64 md:h-80 xl:h-[400px] overflow-hidden flex items-center bg-ucu-blue-dark">
        <img src="${bgImage}" alt="SDG ${num} Background" class="absolute inset-0 w-full h-full object-cover object-center z-0" loading="eager" />
        <div class="absolute inset-0 z-10" style="background: linear-gradient(to right, rgba(36, 48, 94, 0.98) 0%, rgba(36, 48, 94, 0.85) 45%, ${rightFadeColor} 100%);"></div>
        <div class="relative z-20 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 md:gap-8">
          <div class="shrink-0 drop-shadow-2xl">
            <img src="${iconImage}" alt="SDG ${num} Icon" class="w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40 object-contain rounded-md border-2 border-white/20" />
          </div>
          <div class="flex flex-col text-white">
            <span class="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.25em] uppercase text-white/80 mb-1 md:mb-2 drop-shadow-md">
              Sustainable Development Goal ${num}
            </span>
            <h1 class="text-3xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight mb-2 md:mb-3 drop-shadow-lg">${title}</h1>
            <p class="text-sm md:text-base xl:text-lg font-medium text-white/90 max-w-[600px] leading-relaxed drop-shadow-md">${subtitle}</p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full flex h-2 sm:h-2.5 z-30">${spectrumHtml}</div>
      </div>
    `;
  }
}

class UcuSdgRibbon extends HTMLElement {
  connectedCallback() {
    const activeSdg = parseInt(this.getAttribute("active") || "1");
    const year = this.getAttribute("year") || "2025";

    const boxesHtml = SDG_COLORS.map((hex, index) => {
      const num = index + 1;
      const isActive = activeSdg === num;
      const classes = isActive
        ? "ring-4 ring-ucu-yellow ring-offset-2 ring-offset-slate-50 scale-110 shadow-md z-10"
        : "hover:scale-105 opacity-80 hover:opacity-100";

      return `<a href="sdg${num}.html" class="flex-none w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md text-white font-bold text-sm sm:text-base transition-all duration-300 ${classes}" style="background-color: ${hex};">${num}</a>`;
    }).join("");

    this.innerHTML = `
      <div class="w-full bg-slate-50 border-t border-gray-200 pt-12 pb-8 relative z-40 shadow-sm mt-10">
        <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h3 class="text-lg font-bold text-ucu-blue-dark tracking-tight mb-5">Explore More Goals</h3>
          <div class="flex items-center w-full gap-2.5 lg:gap-0 lg:justify-between overflow-x-auto py-4 px-3 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            ${boxesHtml}
          </div>
          <div class="flex justify-center mt-8 w-full">
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="group flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold text-ucu-blue-dark hover:text-ucu-red hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              Back to Top
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:-translate-y-1 transition-transform duration-300"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

class UcuSdgLayout extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const narrativeContent = this.querySelector('[slot="narrative"]')?.innerHTML || "";
    const activeSdg = parseInt(this.getAttribute("sdg") || "1");
    const year = this.getAttribute("year") || "2025";
    
    // 1. Fetch from Global Store and FILTER by activeSdg
    const allEvents = window.UCU_EVENTS || [];
    const pageEvents = allEvents.filter(ev => ev.relatedSdgs.includes(activeSdg));

    // Generate Vertical Nav
    const navItems = Array.from({ length: 17 }, (_, i) => i + 1)
      .map((num) => {
        const isActive = activeSdg === num;
        const classes = isActive
          ? "z-10 shadow-[0_0_20px_rgba(36,48,94,0.5)]"
          : "shadow-sm hover:shadow-md opacity-90 hover:opacity-100";
        return `
        <a href="sdg${num}.html" class="group relative block w-full transition-all duration-300 flex-shrink-0 bg-white rounded-[2px] ${classes}">
          <img src="../../images/sdg-nav-banner/sdg${num}.jpg" alt="SDG ${num} Navigation" class="w-full h-auto block rounded-[2px]" loading="${num > 4 ? "lazy" : "eager"}" onerror="this.style.display='none'"/>
          ${!isActive ? `<div class="absolute inset-0 bg-[#24305e]/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none rounded-[2px]"></div>` : ""}
        </a>`;
      })
      .join("");

// Replace this block inside UcuSdgLayout connectedCallback() in js/sdg-components.js

    // Generate Event Cards dynamically based on filtered pageEvents
    const cardsHtml = pageEvents
      .map((ev) => {
        const tagsHtml = ev.relatedSdgs
          .map(
            (num) =>
              `<div class="flex items-center justify-center w-6 h-6 rounded text-white text-[10px] font-black shadow-sm" style="background-color: ${SDG_COLORS[num - 1] || "#24305e"};">${num}</div>`,
          )
          .join("");
          
        return `
        <button class="ucu-event-trigger group block relative w-full text-left overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col" data-event-id="${ev.id}">
          
          <!-- THICKER GRADIENT BAR: Increased from h-[4px] to h-[6px] -->
          <span class="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-ucu-blue-dark to-ucu-red origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-20"></span>
          
          <div class="w-full aspect-video overflow-hidden relative bg-slate-100 shrink-0">
            <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)]" loading="lazy" />
            <div class="absolute top-2.5 right-2.5 bg-ucu-red/85 backdrop-blur-md border border-white/20 text-white text-[8px] font-black px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-widest z-10">EVENT</div>
          </div>
          <div class="p-4 pb-5 flex flex-col gap-1.5 relative z-10 bg-white flex-grow w-full">
            <p class="text-[9px] text-ucu-red font-bold uppercase tracking-widest">${ev.date}</p>
            <h4 class="text-sm font-black text-ucu-blue-dark group-hover:text-ucu-red leading-tight transition-colors duration-300 line-clamp-2">${ev.title}</h4>
            <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed m-0 mb-2">${ev.desc}</p>
            
            <!-- RIGHT ALIGNED TAGS: Added mt-auto to push to bottom, justify-between to split text and tags -->
            <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2 w-full">
              <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">SDG Alignment</span>
              <div class="flex flex-wrap gap-1.5 justify-end">${tagsHtml}</div>
            </div>
          </div>
        </button>`;
      })
      .join("");

    // Generate Modal Shells passing the data-sdgs array
    const modalsHtml = pageEvents
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
      <div class="w-full min-h-screen bg-slate-50 font-sans pb-8 xl:pb-12 pt-8 xl:pt-10">
        <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-12">
          
          <aside class="hidden lg:flex flex-col lg:col-span-3 z-10 transition-all duration-300">
            <div class="w-full shadow-sm flex-shrink-0 bg-white mb-4 xl:mb-5">
              <img src="../../images/sdg-nav-banner/sdg-title.jpg" alt="SDG Reports ${year}" class="w-full h-auto block rounded-t-sm" onerror="this.style.display='none'"/>
            </div>
            <nav class="flex flex-col gap-3 xl:gap-4 pb-6">${navItems}</nav>
          </aside>

          <div class="col-span-1 lg:col-span-9 flex flex-col gap-16">
            <article class="w-full max-w-[65ch] text-lg leading-relaxed prose prose-lg prose-slate transition-colors">
              ${narrativeContent}
            </article>

            ${
              pageEvents.length > 0
                ? `
            <section class="flex flex-col mt-10 pt-10 border-t border-gray-100">
              <div class="flex items-center w-full mb-10 gap-4">
                <div class="w-1.5 h-6 bg-ucu-red rounded-full shadow-sm flex-shrink-0"></div>
                <h3 class="flex-shrink-0 text-2xl font-bold text-ucu-blue-dark tracking-tight m-0 pr-2">Events & Documentation</h3>
                <div class="flex-grow h-px bg-gray-300/70 rounded-full"></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">${cardsHtml}</div>
            </section>
            `
                : ""
            }
          </div>

        </div>
      </div>
      ${modalsHtml}
    `;

    // Attach Event Routing logic to the generated cards
    this.querySelectorAll(".ucu-event-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eventId = e.currentTarget.getAttribute("data-event-id");
        window.history.pushState({}, "", "?event=" + eventId);
        window.dispatchEvent(new Event("popstate")); 
      });
    });
  }
}

if (!customElements.get("sdg-card")) customElements.define("sdg-card", SdgCard);
if (!customElements.get("sdg-see-all-card"))
  customElements.define("sdg-see-all-card", SdgSeeAllCard);

if (!customElements.get("ucu-sdg-page-hero"))
  customElements.define("ucu-sdg-page-hero", UcuSdgPageHero);
if (!customElements.get("ucu-sdg-ribbon"))
  customElements.define("ucu-sdg-ribbon", UcuSdgRibbon);
if (!customElements.get("ucu-sdg-layout"))
  customElements.define("ucu-sdg-layout", UcuSdgLayout);
