// js/eco-components.js

class UcuIndicatorLayout extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    const descriptionContent = this.querySelector('[slot="description"]')?.innerHTML || '';
    
    const base = this.getAttribute("base-path") || "../";
    const activeNum = this.getAttribute("active-num") || "01";
    const pillarTitle = this.getAttribute("pillar-title") || "Sustainability Pillar";
    
    // 1. Parse the Manifest
    const evidenceManifest = JSON.parse(this.getAttribute("data-evidence") || "[]");

    const pillars = [
      { num: "01", title: "Setting & Infrastructure", img: "images/smart-eco-assets/setting_and_infrastructure.jpg", link: "infrastructure.html" },
      { num: "02", title: "Energy & Climate", img: "images/smart-eco-assets/energy_and_climate_change.jpg", link: "energy.html" },
      { num: "03", title: "Waste", img: "images/smart-eco-assets/waste.jpg", link: "waste.html" },
      { num: "04", title: "Water", img: "images/smart-eco-assets/water.jpg", link: "water.html" },
      { num: "05", title: "Transportation", img: "images/smart-eco-assets/transportation.jpg", link: "transportation.html" },
      { num: "06", title: "Education & Research", img: "images/smart-eco-assets/education_and_research.jpg", link: "education.html" },
      { num: "07", title: "Digitalization", img: "images/smart-eco-assets/digitalization.jpg", link: "digitalization.html" },
    ];

    const navHtml = pillars.map(pillar => {
      const isActive = pillar.num === activeNum;
      return `
        <a href="${base}smart-eco-campus/${pillar.link}" class="group relative flex-1 aspect-square md:aspect-auto md:h-[148px] overflow-hidden block" title="${pillar.title}">
          <div class="h-full w-full overflow-hidden bg-black">
            <img src="${base}${pillar.img}" alt="${pillar.title}" loading="lazy" decoding="async" class="h-full w-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'scale-100 grayscale-0 brightness-100 opacity-100' : 'scale-110 grayscale-[100%] brightness-50 opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100'}" />
          </div>
          ${isActive ? `<div class="absolute bottom-0 left-0 h-[5px] w-full bg-gradient-to-r from-ucu-blue-dark to-ucu-red z-10"></div>` : ''}
        </a>
      `;
    }).join("");

    // 2. Generate Evidence Cards dynamically
    const cardsHtml = evidenceManifest.map(ev => `
      <ucu-evidence-card 
        title="${ev.title}" 
        meta="UI GreenMetric" 
        img="${ev.img || base + 'images/smart-eco-assets/ui-green-seal.png'}" 
        evidence-id="${ev.id}">
      </ucu-evidence-card>
    `).join("");

    // 3. Generate Modal Shells dynamically
    const modalsHtml = evidenceManifest.map(ev => `
      <ucu-modal-shell 
        modal-id="${ev.id}" 
        title="${ev.title}" 
        badge="${ev.badge}" 
        content-src="${ev.src}">
      </ucu-modal-shell>
    `).join("");

    this.innerHTML = `
      <div class="flex w-full flex-col items-center py-12 bg-canvas min-h-screen font-sans">
        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="reveal translate-y-8 opacity-0 transition-all duration-900 ease-out relative z-10 flex w-full justify-center rounded-t-[1.2rem] bg-ucu-blue-dark shadow-2xl overflow-hidden flex-wrap md:flex-nowrap">
            ${navHtml}
          </nav>
          <section class="grid grid-cols-1 lg:grid-cols-[6.5fr_3.5fr] w-full items-stretch shadow-2xl rounded-b-[1.5rem] overflow-hidden">
            <div class="reveal translate-y-8 opacity-0 transition-all duration-900 ease-out bg-white p-6 md:p-12 z-20 h-full">
              <span class="block text-xs font-extrabold uppercase tracking-[0.2rem] text-ucu-red mb-4">Sustainable Pillar</span>
              <h2 class="group relative inline-block text-3xl md:text-[3rem] font-black leading-[1.05] tracking-[-0.03em] text-ucu-blue-dark mb-10">
                ${pillarTitle}
                <span class="absolute -bottom-[12px] left-0 h-[5px] w-[64px] rounded-full bg-gradient-to-r from-ucu-blue-dark to-ucu-red transition-all duration-500 ease-out group-hover:w-[100px]"></span>
              </h2>
              <div class="space-y-6">
                ${descriptionContent}
              </div>
            </div>
            <aside class="reveal translate-y-8 opacity-0 transition-all duration-900 ease-out relative flex flex-col gap-8 bg-gray-50 p-6 md:p-8 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-black/5 h-full z-20">
              <h3 class="flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.15rem] text-ucu-blue-dark z-10 relative">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-ucu-red opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-ucu-red"></span>
                </span>
                Evidence & Documentation
              </h3>
              <div class="flex flex-col gap-5 relative z-10 w-full max-h-[640px] overflow-y-auto overflow-x-hidden pr-3 custom-scrollbar [&>*]:shrink-0">
                ${cardsHtml}
              </div>
            </aside>
          </section>
        </div>
      </div>
      <!-- Inject dynamically generated modals outside the main grid -->
      ${modalsHtml}
    `;

    setTimeout(() => this.initReveal(), 100);
  }

  initReveal() {
    const revealTargets = this.querySelectorAll(".reveal");
    if (revealTargets.length > 0) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("opacity-0", "translate-y-8");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      revealTargets.forEach((el) => observer.observe(el));
    }
  }
}

class UcuEvidenceCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const meta = this.getAttribute('meta') || '';
    const img = this.getAttribute('img') || '';
    const evidenceId = this.getAttribute('evidence-id');

    this.innerHTML = `
      <button class="ucu-evidence-trigger group relative w-full text-left flex items-center gap-4 bg-white p-4 rounded-2xl border border-black/5 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gray-50 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
        <span class="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-ucu-blue-dark to-ucu-red origin-bottom scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"></span>
        <div class="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <img src="${img}" alt="${title} Documentation" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div class="flex flex-col gap-1 overflow-hidden">
          <span class="text-[0.8rem] font-extrabold leading-[1.3] tracking-[-0.01em] text-ucu-blue-dark transition-colors duration-300 group-hover:text-ucu-red line-clamp-2">${title}</span>
          <span class="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted whitespace-nowrap">
            <span class="block h-1 w-1 shrink-0 rounded-full bg-ucu-red"></span>${meta}
          </span>
        </div>
      </button>
    `;

    // 4. Update the URL instead of just opening the modal directly
    this.querySelector('.ucu-evidence-trigger').addEventListener('click', () => {
      // Update the URL without reloading the page
      window.history.pushState({}, '', '?evidence=' + evidenceId);
      // Manually trigger the popstate event so our router opens the modal
      window.dispatchEvent(new Event('popstate'));
    });
  }
}

if (!customElements.get("ucu-indicator-layout")) customElements.define("ucu-indicator-layout", UcuIndicatorLayout);
if (!customElements.get("ucu-evidence-card")) customElements.define("ucu-evidence-card", UcuEvidenceCard);