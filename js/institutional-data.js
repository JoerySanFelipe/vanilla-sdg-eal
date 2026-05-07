/**
 * js/institutional-data.js
 * Components for rankings, partnerships, and global footprint data visualization.
 */

/* ==========================================================================
   3. DATA CAROUSEL & GRID COMPONENTS
   ========================================================================== */

class UcuRankingCarousel extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const rankings = window.UCU_RANKINGS || [];
    const highlights = rankings.filter((r) => r.shortDescription);
    if (highlights.length === 0) return;

    const formatCrownRank = (val) => {
      if (typeof val === "string" && val.includes("#")) {
        return val.replace(/#/g, '<span class="text-ucu-red text-[0.7em] mr-[3px] relative -top-[0.08em] inline-block font-black">#</span>');
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
            <div class="flex items-center gap-1.5 mt-4"><div class="w-7 h-1 rounded-full bg-ucu-blue"></div><div class="w-3 h-1 rounded-full bg-ucu-red"></div></div>
          </div>
          <div class="mt-8 border-t border-black/5 pt-6"><p class="text-muted/90 text-xs font-medium leading-relaxed">${rank.shortDescription}</p></div>
        </div>
      </div>
    `;

    const marqueeItems = [...highlights, ...highlights, ...highlights];
    const marqueeHtml = marqueeItems.map(generateCard).join("");

    this.innerHTML = `
      <style>
        .ucu-custom-scroll::-webkit-scrollbar { height: 8px; }
        .ucu-custom-scroll::-webkit-scrollbar-track { background: rgba(36,48,94,0.05); border-radius: 10px; margin-inline: 16px; }
        .ucu-custom-scroll::-webkit-scrollbar-thumb { background: rgba(36,48,94,0.25); border-radius: 10px; cursor: pointer; }
        .ucu-custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(196,54,67,0.8); }
        .ucu-custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(36,48,94,0.25) rgba(36,48,94,0.05); }
      </style>
      <div class="w-full relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div id="carousel-track" class="flex gap-6 overflow-x-auto pb-6 ucu-custom-scroll will-change-scroll">
          ${marqueeHtml}
        </div>
      </div>
    `;

    setTimeout(() => {
      const track = this.querySelector("#carousel-track");
      if (!track) return;
      let isHovered = false;
      const speed = 1.5;
      const autoScroll = () => {
        if (!isHovered) {
          track.scrollLeft += speed;
          const singleSetWidth = track.scrollWidth / 3;
          if (track.scrollLeft >= singleSetWidth) { track.scrollLeft -= singleSetWidth; }
        }
        requestAnimationFrame(autoScroll);
      };
      track.addEventListener("mouseenter", () => (isHovered = true));
      track.addEventListener("mouseleave", () => (isHovered = false));
      requestAnimationFrame(autoScroll);
    }, 100);
  }
}

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
        return val.replace(/#/g, '<span class="text-[0.6em] text-white/60 font-bold mr-[1px] relative -top-[0.05em]">#</span>');
      }
      return val;
    };

    const timelineHtml = rankings.map((rank, index) => {
      const isRightAligned = index % 2 === 0;
      const alignClass = isRightAligned ? "md:pr-14 md:text-right" : "md:pl-14 md:order-last text-left";
      const pointerClass = isRightAligned ? "md:before:-right-[9px] md:before:border-r md:before:border-t" : "before:-left-[9px] before:border-l before:border-b";

      const metricsHtml = (rank.metrics || []).map((metric) => {
        let bgColor = metric.color || "#394a8a";
        const officialExceptionColors = ["#E5243B", "#4C9F38", "#C5192D", "#FF3A21", "#00689D", "#19486A"];
        if (!officialExceptionColors.includes(bgColor)) {
          bgColor = ["#1", "#2"].includes(metric.value.trim()) ? "#c43643" : "#394a8a";
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
      }).join("");

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
                <div class="flex items-center gap-1.5 mt-5"><div class="w-9 h-1 rounded-full bg-ucu-blue"></div><div class="w-5 h-1 rounded-full bg-ucu-red"></div></div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 w-full pt-2">${metricsHtml}</div>
              <div class="border-t border-black/5 mt-10 pt-5 flex justify-between items-center w-full">
                <a href="${rank.publicationUrl}" target="_blank" class="text-[10px] font-black text-ucu-blue-dark/80 hover:text-ucu-red uppercase tracking-widest transition-colors flex items-center gap-1.5 group/link">See Publication<svg class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></a>
                <span class="text-[9px] font-bold text-muted/60 uppercase tracking-widest">${rank.publicationDate}</span>
              </div>
            </div>
          </div>
          <div class="hidden md:block w-1/2"></div>
        </div>
      `;
    }).join("");

    this.innerHTML = `
      <div class="relative pl-8 md:pl-0 w-full">
        <div class="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-gray-300 -translate-x-1/2"></div>
        <div class="space-y-16 relative w-full" id="timeline-list">${timelineHtml}</div>
        <div id="empty-state" class="hidden py-16 text-center w-full relative z-10"><p class="text-muted text-sm font-black uppercase tracking-[0.2em] bg-white/50 border border-white inline-block px-6 py-3 rounded-xl shadow-sm">No rankings found for this category.</p></div>
      </div>
    `;

    setTimeout(() => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.remove("opacity-0", "translate-y-12"); obs.unobserve(entry.target); } });
      }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
      this.querySelectorAll(".timeline-reveal").forEach((el) => observer.observe(el));
    }, 100);
  }
}

class UcuPartnerCarousel extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;
    const partners = window.UCU_PARTNERS || [];
    const validPartners = partners.filter(p => p.logoSrc && p.logoSrc !== "");
    const renderList = validPartners.length > 0 ? validPartners : Array(10).fill({name: "Partner", logoSrc: "./images/partner-placeholder.png"});
    const generateLogos = () => renderList.map(p => `
      <div class="flex-none w-32 md:w-40 h-20 md:h-24 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-4 mx-3 shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0">
        <img src="${p.logoSrc}" alt="${p.name} Logo" class="max-w-full max-h-full object-contain" loading="lazy" onerror="this.style.display='none'">
      </div>
    `).join("");
    this.innerHTML = `
      <style>@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; } .animate-marquee:hover { animation-play-state: paused; }</style>
      <div class="w-full overflow-hidden relative group">
        <div class="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-canvas to-transparent z-10"></div>
        <div class="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-canvas to-transparent z-10"></div>
        <div class="flex w-[200%] animate-marquee"><div class="flex w-1/2">${generateLogos()}</div><div class="flex w-1/2">${generateLogos()}</div></div>
      </div>
    `;
  }
}

class UcuPartnerGrid extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;
    const category = this.getAttribute("category");
    const partners = window.UCU_PARTNERS ? window.UCU_PARTNERS.filter((p) => p.category === category) : [];
    if (partners.length === 0) { this.innerHTML = `<p class="text-muted text-sm italic">Partner data currently initializing...</p>`; return; }
    const gridHtml = partners.map((partner) => {
      const innerHtml = `
        <img src="${partner.logoSrc}" alt="${partner.name} Logo" class="w-[75%] h-[75%] object-contain transition-all duration-300 group-hover:-translate-y-3 group-hover:scale-75 group-hover:opacity-20 relative z-10" loading="lazy" onerror="this.style.display='none'" />
        <div class="absolute inset-0 flex items-center justify-center p-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none z-10"><span class="text-center text-[0.65rem] font-black text-ucu-blue-dark uppercase tracking-widest whitespace-normal leading-tight text-balance drop-shadow-sm">${partner.name}</span></div>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ucu-blue to-ucu-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center z-20"></div>
      `;
      const baseClasses = "bg-white/80 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-[0_4px_15px_rgba(36,48,94,0.03)] hover:shadow-[0_8px_25px_rgba(36,48,94,0.08)] transition-all duration-300 flex items-center justify-center aspect-[2/1] group relative overflow-hidden";
      return partner.url ? `<a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="${baseClasses} cursor-pointer">${innerHtml}</a>` : `<div class="${baseClasses} cursor-default">${innerHtml}</div>`;
    }).join("");
    this.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">${gridHtml}</div>`;
  }
}

class UcuCountryGrid extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;
    const countries = window.UCU_COUNTRIES || [];
    if (countries.length === 0) { this.innerHTML = `<p class="text-muted text-sm italic text-center w-full">Country data currently initializing...</p>`; return; }
    const flagMap = { Philippines: "ph", Turkey: "tr", Bangladesh: "bd", Indonesia: "id", Japan: "jp", Oman: "om", "South Korea": "kr", Thailand: "th", Taiwan: "tw", Vietnam: "vn", Malaysia: "my", China: "cn", "Bosnia and Herzegovina": "ba", "United Kingdom": "gb", Switzerland: "ch", Poland: "pl", USA: "us", Canada: "ca" };
    const pillsHtml = countries.map((country) => {
      const isoCode = flagMap[country] || "un"; 
      return `
      <div class="group inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-[0_2px_10px_rgba(36,48,94,0.04)] hover:shadow-[0_8px_20px_rgba(36,48,94,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-default">
        <span class="fi fi-${isoCode} shrink-0 text-base transform transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-0.5 drop-shadow-sm origin-center rounded-sm overflow-hidden"></span>
        <span class="text-[0.65rem] font-bold text-ucu-blue-dark uppercase tracking-widest">${country}</span>
      </div>
    `;
    }).join("");
    this.innerHTML = `<div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 p-4 md:p-8 bg-slate-100/50 rounded-[2rem] border border-black/5">${pillsHtml}</div>`;
  }
}

/* ==========================================================================
   4. COMPONENT REGISTRATION
   ========================================================================== */

if (!customElements.get("ucu-ranking-carousel")) customElements.define("ucu-ranking-carousel", UcuRankingCarousel);
if (!customElements.get("ucu-ranking-timeline")) customElements.define("ucu-ranking-timeline", UcuRankingTimeline);
if (!customElements.get("ucu-partner-carousel")) customElements.define("ucu-partner-carousel", UcuPartnerCarousel);
if (!customElements.get("ucu-partner-grid")) customElements.define("ucu-partner-grid", UcuPartnerGrid);
if (!customElements.get("ucu-country-grid")) customElements.define("ucu-country-grid", UcuCountryGrid);
