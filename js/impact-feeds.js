/**
 * js/impact-feeds.js
 * Data-driven feed components for Events, Impact, and Research.
 */

/* ==========================================================================
   SHARED STYLES (DRY)
   ========================================================================== */

const IMPACT_FEED_STYLES = `
  <style>
    .sdg-hover-btn:hover { border-color: var(--sdg-color); color: var(--sdg-color); background-color: color-mix(in srgb, var(--sdg-color) 5%, white); }
    .sdg-hover-btn[data-active="true"] { background-color: var(--sdg-color); border-color: var(--sdg-color); color: white; }
  </style>
`;

/* ==========================================================================
   3. DATA FEED COMPONENTS
   ========================================================================== */

class UcuEventsPreview extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const limit = parseInt(this.getAttribute("limit") || "3", 10);
    const allEvents = window.UCU_EVENTS || [];
    
    const previewEvents = allEvents.filter(ev => ev.isHighlights === true).slice(0, limit);

    if (previewEvents.length === 0) {
      this.innerHTML = `<p class="text-muted text-sm italic font-medium">Event data initializing...</p>`;
      return;
    }

    const SDG_COLORS = {
      1: "#E5243B", 2: "#DDA63A", 3: "#4C9F38", 4: "#C5192D", 5: "#FF3A21", 
      6: "#26BDE2", 7: "#FCC30B", 8: "#A21942", 9: "#FD6925", 10: "#DD1367", 
      11: "#FD9D24", 12: "#BF8B2E", 13: "#3F7E44", 14: "#0A97D9", 15: "#56C02B", 
      16: "#00689D", 17: "#19486A"
    };

    const cardsHtml = previewEvents.map((ev, index) => {
      const delay = index * 100;
      const tagsHtml = (ev.relatedSdgs || []).slice(0, 3).map(num => `
        <div class="w-6 h-6 rounded-sm text-white text-[10px] flex items-center justify-center font-black shadow-sm" style="background-color: ${SDG_COLORS[num] || '#24305e'};">${num}</div>
      `).join('');

      return `
        <button data-modal-trigger="${ev.id}" class="reveal-card opacity-0 translate-y-12 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group flex flex-col text-left border border-gray-200 rounded-[1.5rem] overflow-hidden hover:shadow-xl hover:border-gray-300 hover:-translate-y-2 bg-white focus:outline-none" style="transition-delay: ${delay}ms;">
          <div class="relative aspect-video w-full overflow-hidden bg-gray-100 border-b border-gray-100 shrink-0">
            <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" onerror="this.style.display='none'">
            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div class="absolute bottom-4 right-4 flex gap-1.5 z-10">
              ${tagsHtml}
            </div>
          </div>
          <div class="flex flex-col flex-1 p-6 md:p-8 gap-3">
            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-ucu-red m-0 flex items-center gap-2">
               <span class="w-1.5 h-1.5 rounded-full bg-ucu-red"></span>
               ${ev.date}
            </p>
            <h3 class="text-xl font-black text-ucu-blue-dark leading-snug group-hover:text-ucu-red transition-colors duration-200 m-0 line-clamp-2">${ev.title}</h3>
            <p class="text-muted text-sm font-medium leading-relaxed flex-1 line-clamp-3 m-0">${ev.desc}</p>
          </div>
        </button>
      `;
    }).join('');

    this.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        ${cardsHtml}
      </div>
    `;

    setTimeout(() => {
      const targets = this.querySelectorAll(".reveal-card");
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-12");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      targets.forEach(el => observer.observe(el));
    }, 50);
  }
}

class UcuImpactFeed extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const targetYear = this.getAttribute("year") || "2025";
    const allEvents = window.UCU_EVENTS || [];

    this.pageEvents = allEvents.filter((ev) => ev.isFeatured === true && ev.date && ev.date.includes(targetYear));
    this.highlights = this.pageEvents.filter((ev) => ev.isHighlights === true);
    this.recents = this.pageEvents.filter((ev) => ev.isHighlights !== true);

    this.SDG_COLORS = {
      1: "#E5243B", 2: "#DDA63A", 3: "#4C9F38", 4: "#C5192D", 5: "#FF3A21",
      6: "#26BDE2", 7: "#FCC30B", 8: "#A21942", 9: "#FD6925", 10: "#DD1367",
      11: "#FD9D24", 12: "#BF8B2E", 13: "#3F7E44", 14: "#0A97D9", 15: "#56C02B",
      16: "#00689D", 17: "#19486A",
    };

    const generateFilters = () => {
      let btns = `<button data-filter="all" class="filter-btn px-5 py-2.5 rounded-full text-xs font-bold border border-ucu-blue-dark/20 bg-white shadow-sm transition-all hover:bg-gray-50 data-[active=true]:bg-ucu-blue-dark data-[active=true]:text-white data-[active=true]:border-ucu-blue-dark text-main2" data-active="true">All Engagements</button>`;
      for (let i = 1; i <= 17; i++) {
        btns += `<button data-filter="${i}" style="--sdg-color: ${this.SDG_COLORS[i]};" class="filter-btn sdg-hover-btn px-4 py-2.5 rounded-full text-xs font-bold border border-gray-200 bg-white shadow-sm transition-all text-main2" data-active="false">SDG ${i}</button>`;
      }
      return btns;
    };

    const highlightsHtml = this.highlights.map((ev) => {
      const tagsHtml = (ev.relatedSdgs || []).map((num) => `
        <div class="w-5 h-5 rounded-sm text-white text-[9px] flex items-center justify-center font-bold shadow-sm" style="background-color: ${this.SDG_COLORS[num]};">${num}</div>
      `).join("");

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
    }).join("") || `<p class="text-muted italic">No highlighted events found.</p>`;

    const recentsHtml = this.recents.map((ev) => {
      const tagsHtml = (ev.relatedSdgs || []).slice(0, 3).map((num) => `
        <div class="w-4 h-4 rounded-sm text-white text-[8px] flex items-center justify-center font-bold" style="background-color: ${this.SDG_COLORS[num]};">${num}</div>
      `).join("");

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
    }).join("") || `<div class="px-6 py-8 text-center"><p class="text-muted text-xs font-bold tracking-widest uppercase">No recent events found.</p></div>`;

    const modalsHtml = this.pageEvents.map((ev) => `
      <ucu-modal-shell modal-id="${ev.id}" title="${ev.title}" badge="${ev.date}" content-src="${ev.src}" data-sdgs='${JSON.stringify(ev.relatedSdgs || [])}'></ucu-modal-shell>
    `).join("");

    this.innerHTML = `
      ${IMPACT_FEED_STYLES}
      <div class="mb-10 rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgba(36,48,94,0.06)] flex flex-col reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div class="bg-white/70 backdrop-blur-xl border border-white p-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4 text-center divide-x-0 md:divide-x divide-black/10 relative">
          <div class="flex flex-col items-center justify-center p-2 relative z-10"><span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">${this.pageEvents.length}</span><span class="text-[10px] font-bold text-muted uppercase tracking-widest">Events</span></div>
          <div class="flex flex-col items-center justify-center p-2 relative z-10"><span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">12</span><span class="text-[10px] font-bold text-muted uppercase tracking-widest">Programs</span></div>
          <div class="flex flex-col items-center justify-center p-2 relative z-10"><span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">5 <span class="text-[#c43643] text-2xl">+</span></span><span class="text-[10px] font-bold text-muted uppercase tracking-widest">Reached</span></div>
          <div class="flex flex-col items-center justify-center p-2 relative z-10"><span class="text-4xl md:text-5xl font-black text-ucu-blue-dark mb-1 tracking-tight flex items-baseline gap-1">9</span><span class="text-[10px] font-bold text-muted uppercase tracking-widest">Partners</span></div>
        </div>
        <div style="height: 6px; flex-shrink: 0; background: linear-gradient(to right, #24305e, #c43643);"></div>
      </div>
      <section class="sticky top-[70px] md:top-[80px] z-40 bg-[#f8fafc] pt-5 pb-4 mb-8 reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div class="flex items-center justify-between mb-4"><h2 class="text-xs font-black uppercase tracking-[0.2em] text-muted">Filter by Alignment</h2></div>
        <div class="flex flex-wrap gap-3 pb-6" id="filter-group">${generateFilters()}</div>
        <div id="desktop-headers-wrapper" class="hidden lg:grid grid-cols-1 gap-10 xl:gap-12 w-full transition-opacity duration-300">
          <div class="flex items-center w-full gap-4">
            <div class="w-1.5 h-6 bg-ucu-red rounded-full shadow-sm flex-shrink-0"></div>
            <h2 class="flex-shrink-0 text-xl md:text-2xl font-bold text-ucu-blue-dark tracking-tight m-0 pr-2">Institutional Highlights</h2>
            <div class="flex-grow h-px bg-gray-300/70 rounded-full"></div>
          </div>
        </div>
      </section>
      <div id="default-layout" class="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 relative w-full pb-16">
        <div class="lg:col-span-7 flex flex-col gap-6" id="highlights-container">
          <div class="lg:hidden flex items-center w-full gap-4 mb-2" id="mobile-highlights-header">
            <div class="w-1.5 h-6 bg-ucu-red rounded-full shadow-sm flex-shrink-0"></div>
            <h2 class="flex-shrink-0 text-xl md:text-2xl font-bold text-ucu-blue-dark tracking-tight m-0 pr-2">Top Stories</h2>
            <div class="flex-grow h-px bg-gray-300/70 rounded-full"></div>
          </div>
          ${highlightsHtml}
        </div>
        <div class="lg:col-span-5 flex flex-col">
          <div class="bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden shadow-sm">
            <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50"><h3 class="text-[10px] font-black text-ucu-blue-dark uppercase tracking-widest m-0">Recent Engagements Feed</h3></div>
            <div class="flex flex-col divide-y divide-gray-100 px-6 pb-2">${recentsHtml}</div>
          </div>
        </div>
      </div>
      <div id="filtered-layout" style="display: none;" class="grid-cols-1 md:grid-cols-2 gap-6 w-full pb-16"></div>
      <div id="global-empty-state" class="hidden py-24 text-center w-full bg-white border border-gray-200 rounded-[1.5rem] mb-16 shadow-sm"><p class="text-muted text-xs font-black uppercase tracking-[0.2em]">No engagements found for this specific goal.</p></div>
      ${modalsHtml}
    `;

    setTimeout(() => this.initEngine(), 50);
  }

  generateStandaloneCard(ev) {
    const tagsHtml = (ev.relatedSdgs || []).slice(0, 3).map((num) => `
      <div class="w-5 h-5 rounded-sm text-white text-[9px] flex items-center justify-center font-bold" style="background-color: ${this.SDG_COLORS[num]};">${num}</div>
    `).join("");

    return `
      <button data-modal-trigger="${ev.id}" class="group text-left w-full flex flex-col sm:flex-row items-start gap-5 p-5 bg-white border border-gray-200 rounded-[1.5rem] shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 focus:outline-none reveal-card opacity-0 translate-y-12">
        <div class="w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-gray-100 relative">
           <img src="${ev.img}" alt="${ev.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
           <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="flex flex-col h-full justify-center flex-grow py-1">
          <p class="text-[9px] font-bold text-ucu-red uppercase tracking-[0.2em] mb-1.5">${ev.date}</p>
          <h4 class="text-[15px] font-bold text-ucu-blue-dark leading-snug group-hover:text-ucu-red transition-colors duration-200 line-clamp-2 mb-4">${ev.title}</h4>
          <div class="flex items-center gap-1.5 mt-auto">${tagsHtml}</div>
        </div>
      </button>
    `;
  }

  initEngine() {
    const observeCards = (container) => {
      const targets = container.querySelectorAll(".reveal-card");
      const observer = new IntersectionObserver((entries, obs) => {
          let delayCounter = 0;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => { entry.target.classList.remove("opacity-0", "translate-y-12", "translate-y-8"); }, delayCounter * 100);
              delayCounter++;
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      targets.forEach((el) => observer.observe(el));
    };

    observeCards(this);

    const buttons = this.querySelectorAll(".filter-btn");
    const defaultLayout = this.querySelector("#default-layout");
    const filteredLayout = this.querySelector("#filtered-layout");
    const emptyState = this.querySelector("#global-empty-state");
    const desktopHeaders = this.querySelector("#desktop-headers-wrapper");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedFilter = btn.getAttribute("data-filter");
        buttons.forEach((b) => b.setAttribute("data-active", "false"));
        btn.setAttribute("data-active", "true");

        if (selectedFilter === "all") {
          defaultLayout.style.display = "";
          if (desktopHeaders) desktopHeaders.style.display = "";
          filteredLayout.style.display = "none";
          emptyState.style.display = "none";
        } else {
          defaultLayout.style.display = "none";
          if (desktopHeaders) desktopHeaders.style.display = "none";

          const numFilter = parseInt(selectedFilter);
          const matchedEvents = this.pageEvents.filter((ev) => ev.relatedSdgs.includes(numFilter));

          if (matchedEvents.length === 0) {
            filteredLayout.style.display = "none";
            emptyState.style.display = "block";
          } else {
            filteredLayout.innerHTML = matchedEvents.map((ev) => this.generateStandaloneCard(ev)).join("");
            filteredLayout.style.display = "grid";
            emptyState.style.display = "none";
            observeCards(filteredLayout);
          }
        }
      });
    });
  }
}

class UcuResearchFeed extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const targetYear = this.getAttribute("year");
    const allResearch = window.UCU_RESEARCH || [];
    const research = targetYear ? allResearch.filter((paper) => paper.date && paper.date.includes(targetYear)) : allResearch;

    const sdgColors = {
      1: "#E5243B", 2: "#DDA63A", 3: "#4C9F38", 4: "#C5192D", 5: "#FF3A21",
      6: "#26BDE2", 7: "#FCC30B", 8: "#A21942", 9: "#FD6925", 10: "#DD1367",
      11: "#FD9D24", 12: "#BF8B2E", 13: "#3F7E44", 14: "#0A97D9", 15: "#56C02B",
      16: "#00689D", 17: "#19486A",
    };

    const generateFilters = () => {
      let btns = `<button data-filter="all" class="filter-btn px-5 py-2.5 rounded-full text-xs font-bold border border-ucu-blue-dark/20 bg-white shadow-sm transition-all hover:bg-gray-50 data-[active=true]:bg-ucu-blue-dark data-[active=true]:text-white data-[active=true]:border-ucu-blue-dark text-main2" data-active="true">All Research</button>`;
      for (let i = 1; i <= 17; i++) {
        btns += `<button data-filter="${i}" style="--sdg-color: ${sdgColors[i]};" class="filter-btn sdg-hover-btn px-4 py-2.5 rounded-full text-xs font-bold border border-gray-200 bg-white shadow-sm transition-all text-main2" data-active="false">SDG ${i}</button>`;
      }
      return btns;
    };

    if (research.length === 0) {
      this.innerHTML = `<div class="py-20 text-center w-full bg-white/50 border border-gray-200 rounded-2xl reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"><p class="text-muted text-sm font-black uppercase tracking-[0.2em]">No research publications found for ${targetYear || "this selection"}.</p></div>`;
      this.initObserver();
      return;
    }

    const cardsHtml = research.map((paper) => {
      const sdgDataStr = (paper.sdgs || []).join(" ");
      const sdgBadges = (paper.sdgs || []).map((sdgNum) => `
        <div class="flex items-center justify-center w-7 h-7 rounded text-white text-xs font-black shadow-sm" style="background-color: ${sdgColors[sdgNum] || "#24305e"};" title="SDG ${sdgNum}">${sdgNum}</div>
      `).join("");

      const keywordPills = paper.keywords ? paper.keywords.map((kw) => `<span class="text-[0.6rem] font-bold text-ucu-blue-dark bg-ucu-blue-dark/5 px-2.5 py-1 rounded border border-ucu-blue-dark/10 tracking-widest uppercase">${kw}</span>`).join("") : "";

      return `
        <article class="research-card reveal-card opacity-0 translate-y-12 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-lg flex flex-col" data-sdgs="${sdgDataStr}">
          <h3 class="text-xl md:text-2xl font-black text-ucu-blue-dark mb-2 leading-tight">${paper.title}</h3>
          <div class="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
            <span class="text-sm font-semibold text-main2 flex items-center gap-1.5"><svg class="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>${paper.authors}</span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span class="text-xs font-mono font-bold text-muted uppercase tracking-widest">${paper.date}</span>
          </div>
          <p class="text-sm text-muted leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">${paper.abstract}</p>
          ${keywordPills ? `<div class="flex flex-wrap gap-2 mb-8">${keywordPills}</div>` : ""}
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-5 mt-auto">
            <div><span class="text-[0.55rem] font-black text-muted uppercase tracking-[0.2em] mb-2 block">SDG Alignment</span><div class="flex flex-wrap gap-1.5">${sdgBadges}</div></div>
            <a href="${paper.pdfLink}" target="_blank" class="inline-flex items-center justify-center border border-ucu-blue-dark text-ucu-blue-dark px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-ucu-blue-dark hover:text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-ucu-blue-dark shrink-0">View PDF</a>
          </div>
        </article>
      `;
    }).join("");

    this.innerHTML = `
      ${IMPACT_FEED_STYLES}
      <section class="sticky top-[70px] md:top-[80px] z-30 bg-canvas/90 backdrop-blur-md py-5 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] reveal-card opacity-0 translate-y-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div class="flex items-center justify-between mb-4"><h2 class="text-xs font-black uppercase tracking-[0.2em] text-muted">Filter by Alignment</h2></div>
        <div class="flex flex-wrap gap-3" id="filter-group">${generateFilters()}</div>
      </section>
      <section class="max-w-4xl w-full">
        <div class="flex flex-col gap-6" id="research-feed">
          ${cardsHtml}
          <div id="empty-state" class="hidden py-16 text-center w-full bg-white/50 border border-gray-200 rounded-2xl"><p class="text-muted text-sm font-black uppercase tracking-[0.2em]">No research publications found for this specific goal.</p></div>
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
              card.style.display = "flex"; card.style.opacity = "0"; card.style.transform = "translateY(12px)";
              void card.offsetWidth; card.style.opacity = "1"; card.style.transform = "translateY(0)";
              visibleCount++;
            } else { card.style.display = "none"; }
          });
          if (emptyState) { emptyState.style.display = visibleCount === 0 ? "block" : "none"; }
        });
      });
      this.initObserver();
    }, 50);
  }

  initObserver() {
    const revealTargets = this.querySelectorAll(".reveal-card");
    const observer = new IntersectionObserver((entries, obs) => {
        let delayCounter = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.remove("opacity-0", "translate-y-12", "translate-y-8"); }, delayCounter * 100);
            delayCounter++;
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealTargets.forEach((el) => observer.observe(el));
  }
}

/* ==========================================================================
   4. COMPONENT REGISTRATION
   ========================================================================== */

if (!customElements.get("ucu-events-preview")) customElements.define("ucu-events-preview", UcuEventsPreview);
if (!customElements.get("ucu-impact-feed")) customElements.define("ucu-impact-feed", UcuImpactFeed);
if (!customElements.get("ucu-research-feed")) customElements.define("ucu-research-feed", UcuResearchFeed);
