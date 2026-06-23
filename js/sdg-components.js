/* 
  js/sdg-components.js
  Data-driven components for SDG Reports and Landing Pages.
*/

class SdgCard extends HTMLElement {
  connectedCallback() {
    const num = this.getAttribute("goal-num") || "";
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const hex = this.getAttribute("color") || window.UCU_SDG_COLORS[num] || "#000";
    const bgImg = this.getAttribute("bg-img") || "";
    const logoImg = this.getAttribute("logo-img") || "";
    const targets = this.getAttribute("targets") || "0";
    const exploreLink = this.getAttribute("explore-link") || "#";

    // --- ARCHITECTURAL UPGRADE: Data Registry Intercept ---
    let events = this.getAttribute("events") || "0";
    let research = this.getAttribute("research") || "0";

    if (num && window.UCU_METRICS) {
      const eventKey = `eventsSdg${num}`;
      const researchKey = `researchSdg${num}`;
      
      // If the dynamic getter exists, override the hardcoded attribute
      if (window.UCU_METRICS[eventKey] !== undefined) {
        events = window.UCU_METRICS[eventKey];
      }
      if (window.UCU_METRICS[researchKey] !== undefined) {
        research = window.UCU_METRICS[researchKey];
      }
    }
    // ------------------------------------------------------

    this.className =
      "group relative text-white aspect-[9/16] overflow-hidden cursor-pointer bg-[#111] focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#24305e] block isolate";
    this.setAttribute("tabindex", "0");

    this.innerHTML = `
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-focus:scale-110 z-0" style="background-image: url('${bgImg}');"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#111]/95 via-[#111]/60 to-[#111]/50 z-10 transition-opacity duration-700 group-hover:opacity-0 group-focus:opacity-0 pointer-events-none"></div>
      
      <img src="${logoImg}" alt="${title}" class="absolute bottom-3 right-3 w-[32%] max-w-[76px] aspect-square object-contain z-20 transition-all duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-right group-hover:opacity-0 group-hover:scale-75 group-hover:translate-y-4 group-focus:opacity-0 group-focus:scale-75 group-focus:translate-y-4" loading="lazy" />
      
      <div class="absolute inset-0 z-30 flex flex-col p-3 md:p-4 opacity-0 invisible translate-y-4 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus:opacity-100 group-focus:visible group-focus:translate-y-0 backdrop-blur-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" style="background-color: ${hex}E6;">
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

class UcuSdgPageHero extends HTMLElement {
  connectedCallback() {
    const colors = window.UCU_SDG_COLORS || {};
    const sdgAttr = this.getAttribute("sdg") || "1";
    const num = parseInt(sdgAttr);
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const hex = this.getAttribute("hex") || colors[sdgAttr] || "#E5243B";
    const bgImage = this.getAttribute("bg-image") || "";
    const iconImage = this.getAttribute("icon-image") || "";

    const rightFadeColor = hex + "BF";

    const spectrumHtml = Object.values(colors).map(
      (color) =>
        `<div class="flex-1 h-full" style="background-color: ${color};"></div>`,
    ).join("");

    // Observant Pagination Logic (Next/Prev)
    let navHtml = "";
    const prevSdg = num > 1 ? num - 1 : null;
    const nextSdg = num < 17 ? num + 1 : null;

    if (prevSdg || nextSdg) {
      navHtml = `
        <div class="absolute inset-0 z-40 pointer-events-none">
          <div class="w-full h-full max-w-[1280px] mx-auto relative px-4 sm:px-6 lg:px-8">
            <div class="absolute bottom-6 left-4 sm:left-6 lg:left-8 pointer-events-auto flex items-center bg-white/5 border border-white/10 rounded-[2px] hover:bg-white/15 hover:border-white/20 transition-all duration-300">
              ${
                prevSdg
                  ? `
                <a href="sdg${prevSdg}.html" class="flex items-center gap-1.5 px-3 py-1.5 text-white/60 hover:text-white transition-colors ${nextSdg ? 'border-r border-white/10' : ''} no-underline focus:outline-none focus:bg-white/10 group">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  <span class="text-[9px] uppercase tracking-[0.2em] font-black">Prev</span>
                </a>
              `
                  : ""
              }
              ${
                nextSdg
                  ? `
                <a href="sdg${nextSdg}.html" class="flex items-center gap-1.5 px-3 py-1.5 text-white/60 hover:text-white transition-colors no-underline focus:outline-none focus:bg-white/10 group">
                  <span class="text-[9px] uppercase tracking-[0.2em] font-black">Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
              `
                  : ""
              }
            </div>
          </div>
        </div>
      `;
    }

    this.innerHTML = `
      <div class="relative w-full h-64 md:h-80 xl:h-[400px] overflow-hidden flex items-center bg-ucu-blue-dark">
        <img src="${bgImage}" alt="SDG ${sdgAttr} Background" class="absolute inset-0 w-full h-full object-cover object-center z-0" loading="eager" />
        <div class="absolute inset-0 z-10" style="background: linear-gradient(to right, rgba(36, 48, 94, 0.98) 0%, rgba(36, 48, 94, 0.85) 45%, ${rightFadeColor} 100%);"></div>
        
        <div class="relative z-20 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 md:gap-8">
          <div class="shrink-0 drop-shadow-2xl">
            <img src="${iconImage}" alt="SDG ${sdgAttr} Icon" class="w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40 object-contain rounded-md border-2 border-white/20" />
          </div>
          <div class="flex flex-col text-white">
            <span class="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.25em] uppercase text-white/80 mb-1 md:mb-2 drop-shadow-md">
              Sustainable Development Goal ${sdgAttr}
            </span>
            <h1 class="text-3xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight mb-2 md:mb-3 drop-shadow-lg">${title}</h1>
            <p class="text-sm md:text-base xl:text-lg font-medium text-white/90 max-w-[600px] leading-relaxed drop-shadow-md">${subtitle}</p>
          </div>
        </div>

        ${navHtml}

        <div class="absolute bottom-0 left-0 w-full flex h-2 sm:h-2.5 z-30">${spectrumHtml}</div>
      </div>
    `;
  }
}

class UcuSdgRibbon extends HTMLElement {
  connectedCallback() {
    const activeSdg = parseInt(this.getAttribute("active") || "1");
    const colors = window.UCU_SDG_COLORS || {};

    const boxesHtml = Object.entries(colors).map(([numStr, hex]) => {
      const num = parseInt(numStr);
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

    // Hide component content initially to prevent FOUC (Flash of Unstyled Content)
    this.style.opacity = "0";
    this.style.transition = "opacity 0.25s ease-in-out";
    this.style.display = "block";

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startLoading());
    } else {
      this.startLoading();
    }
  }

  startLoading() {
    const base = window.ucuGetBasePath ? window.ucuGetBasePath() : './';

    const loadResearch = new Promise((resolve) => {
      if (window.UCU_RESEARCH) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `${base}js/research-data.js`;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      }
    });

    const loadEvents = new Promise((resolve) => {
      if (window.UCU_EVENTS) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `${base}js/events-data.js`;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      }
    });

    Promise.all([loadResearch, loadEvents]).then(() => {
      this.doRender();
    });
  }

  doRender() {
    const base = window.ucuGetBasePath ? window.ucuGetBasePath() : './';
    const narrativeContent = this.querySelector('[slot="description"]')?.innerHTML || "";
    const activeSdg = parseInt(this.getAttribute("sdg") || "1");
    const year = this.getAttribute("year") || "2025";
    const colors = window.UCU_SDG_COLORS || {};
    const sdgColor = colors[activeSdg] || "#24305e";

    const allEvents = window.UCU_EVENTS || [];
    const pageEvents = allEvents.filter(ev => ev.relatedSdgs && ev.relatedSdgs.includes(activeSdg));

    const allResearch = window.UCU_RESEARCH || [];
    const pageResearch = allResearch.filter(res => res.sdgs && res.sdgs.includes(activeSdg));

    const navItems = Array.from({ length: 17 }, (_, i) => i + 1)
      .map((num) => {
        const isActive = activeSdg === num;
        const classes = isActive
          ? "z-10 shadow-[0_0_20px_rgba(36,48,94,0.5)]"
          : "shadow-sm hover:shadow-md opacity-90 hover:opacity-100";
        return `
        <a href="sdg${num}.html" class="group relative block w-full transition-all duration-300 flex-shrink-0 bg-white rounded-[2px] ${classes}">
          <img src="${base}images/sdg-nav-banner/sdg${num}.jpg" alt="SDG ${num} Navigation" class="w-full h-auto block rounded-[2px]" loading="${num > 4 ? "lazy" : "eager"}" onerror="this.style.display='none'"/>
          ${!isActive ? `<div class="absolute inset-0 bg-[#24305e]/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none rounded-[2px]"></div>` : ""}
        </a>`;
      })
      .join("");

    const cardsHtml = pageEvents
      .map((ev) => {
        const tagsHtml = ev.relatedSdgs
          .map(
            (num) =>
              `<div class="flex items-center justify-center w-6 h-6 rounded text-white text-[10px] font-black shadow-sm" style="background-color: ${colors[num] || "#24305e"};">${num}</div>`,
          )
          .join("");
          
        return `
        <button class="ucu-event-trigger group block relative w-full text-left overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col cursor-pointer" data-event-id="${ev.id}">
          <span class="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-ucu-blue-dark to-ucu-red origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-20"></span>
          <div class="w-full aspect-video overflow-hidden relative bg-slate-100 shrink-0">
            <img src="${base}${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)]" loading="lazy" />
            <div class="absolute top-2.5 right-2.5 bg-ucu-red/85 backdrop-blur-md border border-white/20 text-white text-[8px] font-black px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-widest z-10">EVENT</div>
          </div>
          <div class="p-4 pb-5 flex flex-col gap-1.5 relative z-10 bg-white flex-grow w-full">
            <p class="text-[9px] text-ucu-red font-bold uppercase tracking-widest">${ev.date}</p>
            <h4 class="text-sm font-black text-ucu-blue-dark group-hover:text-ucu-red leading-tight transition-colors duration-300 line-clamp-2">${ev.title}</h4>
            <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed m-0 mb-2">${ev.desc}</p>
            <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2 w-full">
              <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">SDG Alignment</span>
              <div class="flex flex-wrap gap-1.5 justify-end">${tagsHtml}</div>
            </div>
          </div>
        </button>`;
      })
      .join("");

    const modalsHtml = pageEvents
      .map(
        (ev) => `
      <ucu-modal-shell 
        modal-id="${ev.id}" 
        title="${ev.title}" 
        badge="${ev.date}" 
        content-src="${base}${ev.src}"
        data-sdgs='${JSON.stringify(ev.relatedSdgs)}'>
      </ucu-modal-shell>
    `,
      )
      .join("");

    // Research HTML Content
    const researchHtml = pageResearch.length > 0 
      ? pageResearch.map(res => {
          const keywordPills = res.keywords && res.keywords.length > 0
            ? res.keywords.map(kw => `<span class="px-2 py-0.5 text-[9px] font-semibold rounded bg-slate-100 text-slate-500 border border-slate-200">${kw}</span>`).join("")
            : "";
          
          let resolvedPdfLink = res.pdfLink;
          if (resolvedPdfLink && resolvedPdfLink.startsWith("../")) {
            resolvedPdfLink = base + resolvedPdfLink.substring(3);
          }
          
          const pdfBtn = resolvedPdfLink && resolvedPdfLink !== "#"
            ? `<a href="${resolvedPdfLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 bg-ucu-blue-dark text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-ucu-red hover:shadow-md transition-all duration-300 no-underline">
                 <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 View Research PDF
               </a>`
            : `<span class="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded border border-slate-200 cursor-not-allowed select-none" title="PDF availability pending publication">
                 <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 Access Restricted
               </span>`;

          return `
            <div class="p-5 md:p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col gap-3">
              <div class="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <h4 class="text-xs md:text-sm font-black text-ucu-blue-dark m-0 leading-snug text-left max-w-[80%]">${res.title}</h4>
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">${res.date}</span>
              </div>
              <p class="text-[10px] font-bold text-ucu-red m-0 text-left">Authors: <span class="text-slate-600 font-medium">${res.authors}</span></p>
              <div class="text-[11px] leading-relaxed text-slate-600 text-left m-0">
                <strong class="text-slate-700 font-black block mb-1 text-[9px] uppercase tracking-widest">Abstract</strong>
                ${res.abstract}
              </div>
              <div class="flex flex-wrap gap-1.5 mt-1 items-center">
                ${keywordPills}
              </div>
              <div class="mt-2 flex justify-start">
                ${pdfBtn}
              </div>
            </div>
          `;
        }).join('<div class="h-4"></div>')
      : `<div class="p-8 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center gap-2">
           <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
             <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
           </svg>
           <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">No publications recorded for this goal in 2025 yet</span>
         </div>`;

    // ── PARSE SLOT DESCRIPTION INTO SUB-ACCORDIONS (GROUPED BY H2) ──
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = narrativeContent;

    let introHtml = "";
    const subSections = [];
    let currentSection = null;

    Array.from(tempDiv.children).forEach((child) => {
      // Look for H2 element in child (either child is H2 or contains H2)
      const h2Element = child.tagName === "H2" ? child : child.querySelector("h2");
      if (h2Element) {
        currentSection = {
          title: h2Element.innerText.trim(),
          content: "",
          events: []
        };
        subSections.push(currentSection);
      } else {
        if (currentSection) {
          currentSection.content += child.outerHTML;
        } else {
          introHtml += child.outerHTML;
        }
      }
    });

    // ── MATCH EVENTS TO H2 SUB-SECTIONS ──
    const matchedEventIds = new Set();
    subSections.forEach(sec => {
      // Match if the section content mentions the event ID (e.g. kalahi-cidss)
      const matched = pageEvents.filter(ev => sec.content.toLowerCase().includes(ev.id.toLowerCase()));
      matched.forEach(ev => {
        sec.events.push(ev);
        matchedEventIds.add(ev.id);
      });
    });

    let reportBodyHtml = "";
    if (subSections.length > 0) {
      // Build collapsible drawers for each H2 section
      const subAccordionsHtml = subSections.map((sec, index) => {
        const isOpen = false; // All sections collapsed on load by default
        
        // Render section events if any are matched
        let sectionEventsHtml = "";
        if (sec.events.length > 0) {
          const eventCards = sec.events.map(ev => {
            const tagsHtml = ev.relatedSdgs
              .map(num => `<div class="flex items-center justify-center w-5 h-5 rounded text-white text-[9px] font-black shadow-sm" style="background-color: ${colors[num] || "#24305e"};">${num}</div>`)
              .join("");
              
            return `
              <button class="ucu-event-trigger group block relative w-full text-left overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer max-w-[280px]" data-event-id="${ev.id}">
                <div class="w-full aspect-video overflow-hidden relative bg-slate-100 shrink-0">
                  <img src="${base}${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[0.6s]" loading="lazy" />
                  <div class="absolute top-2 right-2 bg-ucu-red/90 backdrop-blur-md border border-white/10 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-widest">EVENT</div>
                </div>
                <div class="p-3.5 flex flex-col gap-1 relative bg-white flex-grow w-full">
                  <p class="text-[8px] text-ucu-red font-bold uppercase tracking-widest">${ev.date}</p>
                  <h5 class="text-xs font-black text-ucu-blue-dark group-hover:text-ucu-red leading-tight transition-colors duration-200 line-clamp-2">${ev.title}</h5>
                  <p class="text-[10px] text-slate-500 line-clamp-2 leading-relaxed m-0 mb-2">${ev.desc}</p>
                  <div class="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 w-full">
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">SDG Alignment</span>
                    <div class="flex flex-wrap gap-1 justify-end">${tagsHtml}</div>
                  </div>
                </div>
              </button>
            `;
          }).join("");

          sectionEventsHtml = `
            <div class="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
              <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <svg class="w-3.5 h-3.5" style="color: ${sdgColor};" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Aligned Community Engagement
              </h4>
              <div class="flex flex-wrap gap-4">
                ${eventCards}
              </div>
            </div>
          `;
        }

        return `
          <div class="border border-slate-200/80 bg-white rounded-xl overflow-hidden mb-4 hover:border-slate-300/80 transition-all duration-300">
            <button 
              id="sub-header-${index}"
              aria-controls="sub-panel-${index}"
              aria-expanded="${isOpen ? 'true' : 'false'}"
              class="ucu-sub-accordion-header w-full flex items-center justify-between p-4.5 text-left font-black text-ucu-blue-dark transition-colors duration-300 cursor-pointer focus:outline-none"
              style="background-color: ${sdgColor}05;"
            >
              <span class="text-[13px] md:text-sm font-black tracking-tight text-slate-700">${sec.title}</span>
              <svg class="ucu-sub-chevron w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}" style="color: ${sdgColor};" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              id="sub-panel-${index}" 
              role="region"
              aria-labelledby="sub-header-${index}"
              class="p-5 md:p-6 border-t border-slate-100 bg-white ${isOpen ? 'ucu-slide-down' : 'hidden'}"
            >
              <article class="w-full max-w-[65ch] text-lg leading-relaxed prose prose-lg prose-slate transition-colors">
                ${sec.content}
              </article>
              ${sectionEventsHtml}
            </div>
          </div>
        `;
      }).join("");

      reportBodyHtml = `
        <div class="flex flex-col gap-4">
          ${introHtml}
          <div class="mt-4 flex flex-col">
            ${subAccordionsHtml}
          </div>
        </div>
      `;
    } else {
      reportBodyHtml = `
        <article class="w-full max-w-[65ch] text-lg leading-relaxed prose prose-lg prose-slate transition-colors">
          ${narrativeContent}
        </article>
      `;
    }

    this.innerHTML = `
      <style>
        @keyframes ucuSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ucu-slide-down {
          animation: ucuSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ucu-accordion-header {
          transition: background-color 0.2s ease;
        }
        .ucu-accordion-header:hover {
          background-color: ${sdgColor}12 !important;
        }
        .ucu-sub-accordion-header {
          transition: background-color 0.2s ease;
        }
        .ucu-sub-accordion-header:hover {
          background-color: ${sdgColor}0E !important;
        }
      </style>
      
      <div class="w-full min-h-screen bg-slate-50 font-sans pb-8 xl:pb-12 pt-8 xl:pt-10">
        <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-12">
          
          <aside class="hidden lg:flex flex-col lg:col-span-3 z-10 transition-all duration-300">
            <div class="w-full shadow-sm flex-shrink-0 bg-white mb-4 xl:mb-5">
              <img src="${base}images/sdg-nav-banner/sdg-title.jpg" alt="SDG Reports ${year}" class="w-full h-auto block rounded-t-sm" onerror="this.style.display='none'"/>
            </div>
            <nav class="flex flex-col gap-3 xl:gap-4 pb-6">${navItems}</nav>
          </aside>

          <div class="col-span-1 lg:col-span-9 flex flex-col gap-6">
            
            <!-- ACCORDION 1: SDG REPORT -->
            <div class="border border-slate-200/80 bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button 
                id="header-report"
                aria-controls="panel-report"
                aria-expanded="true"
                class="ucu-accordion-header w-full flex items-center justify-between p-5 md:p-6 text-left font-black text-ucu-blue-dark hover:bg-slate-50/50 transition-colors duration-300 cursor-pointer focus:outline-none border-l-4"
                style="border-left-color: ${sdgColor}; background-color: ${sdgColor}08;"
              >
                <div class="flex items-center gap-3">
                  <span class="text-sm md:text-base tracking-tight font-black uppercase">SDG Report</span>
                  <span class="px-2.5 py-0.5 text-[9px] font-black rounded-full text-white uppercase tracking-wider shadow-sm" style="background-color: ${sdgColor};">Overview</span>
                </div>
                <svg class="ucu-chevron-icon w-5 h-5 transition-transform duration-300 rotate-180" style="color: ${sdgColor};" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                id="panel-report" 
                role="region" 
                aria-labelledby="header-report"
                class="p-5 md:p-8 border-t border-slate-100 ucu-slide-down"
              >
                ${reportBodyHtml}
              </div>
            </div>

            <!-- ACCORDION 2: SDG RESEARCHES -->
            <div class="border border-slate-200/80 bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button 
                id="header-research"
                aria-controls="panel-research"
                aria-expanded="false"
                class="ucu-accordion-header w-full flex items-center justify-between p-5 md:p-6 text-left font-black text-ucu-blue-dark hover:bg-slate-50/50 transition-colors duration-300 cursor-pointer focus:outline-none border-l-4"
                style="border-left-color: ${sdgColor}; background-color: ${sdgColor}08;"
              >
                <div class="flex items-center gap-3">
                  <span class="text-sm md:text-base tracking-tight font-black uppercase">SDG Researches</span>
                  <span class="px-2.5 py-0.5 text-[9px] font-black rounded-full text-white uppercase tracking-wider shadow-sm" style="background-color: ${sdgColor};">Publications [${pageResearch.length}]</span>
                </div>
                <svg class="ucu-chevron-icon w-5 h-5 transition-transform duration-300" style="color: ${sdgColor};" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                id="panel-research" 
                role="region" 
                aria-labelledby="header-research"
                class="p-5 md:p-8 border-t border-slate-100 hidden"
              >
                <div class="flex flex-col gap-4">
                  ${researchHtml}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      ${modalsHtml}
    `;

    // Accordion Toggle JavaScript
    const headers = this.querySelectorAll(".ucu-accordion-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const isExpanded = header.getAttribute("aria-expanded") === "true";
        const targetId = header.getAttribute("aria-controls");
        const targetPanel = this.querySelector(`#${targetId}`);
        const chevron = header.querySelector(".ucu-chevron-icon");
        
        if (targetPanel) {
          if (isExpanded) {
            header.setAttribute("aria-expanded", "false");
            targetPanel.classList.add("hidden");
            targetPanel.classList.remove("ucu-slide-down");
            if (chevron) chevron.classList.remove("rotate-180");
          } else {
            header.setAttribute("aria-expanded", "true");
            targetPanel.classList.remove("hidden");
            targetPanel.classList.add("ucu-slide-down");
            if (chevron) chevron.classList.add("rotate-180");
          }
        }
      });
    });

    // Sub-accordion Toggle JavaScript
    const subHeaders = this.querySelectorAll(".ucu-sub-accordion-header");
    subHeaders.forEach(header => {
      header.addEventListener("click", () => {
        const isExpanded = header.getAttribute("aria-expanded") === "true";
        const targetId = header.getAttribute("aria-controls");
        const targetPanel = this.querySelector(`#${targetId}`);
        const chevron = header.querySelector(".ucu-sub-chevron");
        
        if (targetPanel) {
          if (isExpanded) {
            header.setAttribute("aria-expanded", "false");
            targetPanel.classList.add("hidden");
            targetPanel.classList.remove("ucu-slide-down");
            if (chevron) chevron.classList.remove("rotate-180");
          } else {
            header.setAttribute("aria-expanded", "true");
            targetPanel.classList.remove("hidden");
            targetPanel.classList.add("ucu-slide-down");
            if (chevron) chevron.classList.add("rotate-180");
          }
        }
      });
    });

    this.querySelectorAll(".ucu-event-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eventId = e.currentTarget.getAttribute("data-event-id");
        window.history.pushState({}, "", "?event=" + eventId);
        window.dispatchEvent(new Event("popstate")); 
      });
    });

    // Re-initialize scroll reveal observer for newly created DOM nodes
    const localReveals = this.querySelectorAll(".reveal-on-scroll");
    if (localReveals.length > 0) {
      const localRevealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -50px 0px",
          threshold: 0.1,
        }
      );
      localReveals.forEach((el) => localRevealObserver.observe(el));
    }

    // Fade component into view smoothly after DOM is updated
    requestAnimationFrame(() => {
      this.style.opacity = "1";
    });
  }
}

if (!customElements.get("sdg-card")) customElements.define("sdg-card", SdgCard);
if (!customElements.get("sdg-see-all-card")) customElements.define("sdg-see-all-card", SdgSeeAllCard);
if (!customElements.get("ucu-sdg-page-hero")) customElements.define("ucu-sdg-page-hero", UcuSdgPageHero);
if (!customElements.get("ucu-sdg-ribbon")) customElements.define("ucu-sdg-ribbon", UcuSdgRibbon);
if (!customElements.get("ucu-sdg-layout")) customElements.define("ucu-sdg-layout", UcuSdgLayout);
