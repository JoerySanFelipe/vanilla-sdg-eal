// js/modals.js

class UcuModalShell extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;
    
    this.modalId = this.getAttribute('modal-id'); 
    const title = this.getAttribute('title');
    const badge = this.getAttribute('badge');
    this.contentSrc = this.getAttribute('content-src');
    this.sdgsData = this.getAttribute('data-sdgs'); 
    
    this.isLoaded = false; 
    
    let tagsHtml = '';
    this.hasSdgs = false;

    if (this.sdgsData && this.sdgsData !== '[]') {
      try {
        const sdgs = JSON.parse(this.sdgsData).sort((a, b) => a - b);
        const SDG_COLORS = ['#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2', '#FCC30B', '#A21942', '#FD6925', '#DD1367', '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A'];
        const SDG_NAMES = [
          "No Poverty",
          "Zero Hunger",
          "Good Health and Well-being",
          "Quality Education",
          "Gender Equality",
          "Clean Water and Sanitation",
          "Affordable and Clean Energy",
          "Decent Work and Economic Growth",
          "Industry, Innovation and Infrastructure",
          "Reduced Inequalities",
          "Sustainable Cities and Communities",
          "Responsible Consumption and Production",
          "Climate Action",
          "Life Below Water",
          "Life on Land",
          "Peace, Justice and Strong Institutions",
          "Partnerships for the Goals"
        ];
        
        const basePath = window.ucuGetBasePath ? window.ucuGetBasePath() : './';

        tagsHtml = sdgs.map(num => `
          <a href="${basePath}sdg-reports/2025/sdg${num}.html" class="flex items-center justify-center w-8 h-8 rounded-md text-white text-xs font-black shadow-sm transition-transform hover:-translate-y-0.5 no-underline hover:text-white" style="background-color: ${SDG_COLORS[num-1] || '#24305e'};" title="SDG ${num} : ${SDG_NAMES[num-1] || ''}">${num}</a>
        `).join('');
        this.hasSdgs = true;
      } catch (e) {
        console.error("[UCU Architecture] Invalid SDG array passed to modal.");
      }
    }

    const footerClass = "shrink-0 sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]";

    const footerHtml = `
      <footer class="${footerClass}">
        <!-- Navigation Buttons (for both Desktop and Mobile) -->
        <div class="flex items-center gap-2">
          <button type="button" class="prev-btn flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-ucu-blue-dark hover:text-white transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none active:scale-95 shadow-sm" aria-label="Previous evidence">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button type="button" class="next-btn flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-ucu-blue-dark hover:text-white transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none active:scale-95 shadow-sm" aria-label="Next evidence">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <!-- SDG Alignment (aligned right/occupying remaining space) -->
        <div class="flex items-center gap-3 justify-end flex-grow">
          ${this.hasSdgs ? `
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">SDG Alignment</span>
            <div class="flex flex-wrap gap-2">${tagsHtml}</div>
          ` : ''}
        </div>
      </footer>
    `;

    this.innerHTML = `
      <dialog id="modal-${this.modalId}" class="main-evidence-modal backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm bg-white w-full max-w-3xl m-auto p-0 rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden open:animate-[pop-in_0.3s_ease-out_forwards]">
        <div class="flex flex-col w-full max-h-[90vh] relative">
          <header class="flex items-start justify-between px-6 py-4 border-b border-slate-100 sticky top-0 z-20 bg-white/95 backdrop-blur-sm shrink-0">
            <div class="flex flex-col gap-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full w-fit shadow-sm">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-ucu-blue-dark opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-ucu-blue-dark"></span>
                </span>
                <span class="text-[0.65rem] font-black uppercase tracking-[0.1em] text-ucu-blue-dark">${badge}</span>
              </div>
              <h1 class="text-base md:text-lg font-black tracking-tight pr-4 m-0 text-ucu-blue-dark">${title}</h1>
            </div>
            <form method="dialog" class="pt-2">
              <button type="button" class="close-btn group flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 shrink-0 shadow-sm bg-slate-100 hover:bg-ucu-red text-slate-500 hover:text-white" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </header>
          <article class="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow min-h-0 bg-white">
            <div class="ucu-prose-evidence evidence-content-container flex flex-col"></div>
          </article>
          ${footerHtml}
        </div>
      </dialog>
      
      <dialog id="lightbox-${this.modalId}" class="lightbox-dialog backdrop:bg-slate-900/90 backdrop:backdrop-blur-sm bg-transparent border-0 p-0 m-auto max-w-[95vw] max-h-[95vh] cursor-zoom-out shadow-2xl open:animate-[pop-in_0.2s_ease-out_forwards]">
        <img src="" alt="Expanded Media View" class="lightbox-img w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain rounded-xl" />
      </dialog>
    `;

    this.dialog = this.querySelector(`#modal-${this.modalId}`);
    this.lightbox = this.querySelector(`#lightbox-${this.modalId}`);
    this.lightboxImg = this.querySelector('.lightbox-img');
    this.contentContainer = this.querySelector('.evidence-content-container');
    this.closeBtn = this.querySelector('.close-btn');
    this.scrollContainer = this.querySelector('article');

    this.initEvents();
  }

  // --- PUBLIC API ---

  async open() {
    if (this.dialog.open) return; 
    
    // 1. Strict Body-Scroll Locking
    document.body.style.overflow = 'hidden';
    
    // 2. State Management (URL Injection - prevent duplicate history entries)
    const url = new URL(window.location);
    const currentId = url.searchParams.get('event') || url.searchParams.get('evidence');
    if (currentId !== this.modalId) {
      const paramName = url.searchParams.has('evidence') ? 'evidence' : 'event';
      url.searchParams.set(paramName, this.modalId);
      window.history.pushState({}, '', url);
    }

    // 3. Open Dialog
    this.dialog.showModal();
    if (this.scrollContainer) {
      this.scrollContainer.scrollTop = 0;
    }

    // 4. Update Navigation Buttons
    this.updateNavButtons();

    // 5. Await Content Fetch
    await this.loadContent();
  }

  close(isPopState = false) {
    if (!this.dialog.open) return;
    
    this.dialog.close();
    
    // 1. Safe Body-Scroll Locking
    if (document.querySelectorAll('.main-evidence-modal[open]').length <= 1) {
      document.body.style.overflow = '';
    }
    
    // 2. State Management (URL Cleanup - skip if closed due to back/forward navigation)
    if (!isPopState) {
      const url = new URL(window.location);
      url.searchParams.delete('event');
      url.searchParams.delete('evidence');
      window.history.pushState({}, '', url);
    }
  }

  // --- INTERNAL LOGIC ---

  updateNavButtons() {
    const parent = this.parentElement || document;
    const shells = Array.from(parent.querySelectorAll('ucu-modal-shell'));
    const currentIndex = shells.findIndex(shell => shell.modalId === this.modalId);

    const prevBtns = this.querySelectorAll('.prev-btn');
    const nextBtns = this.querySelectorAll('.next-btn');

    if (shells.length <= 1) {
      prevBtns.forEach(btn => btn.style.display = 'none');
      nextBtns.forEach(btn => btn.style.display = 'none');
      
      const footer = this.querySelector('footer');
      if (footer && !this.hasSdgs) {
        footer.style.display = 'none';
      }
      return;
    } else {
      prevBtns.forEach(btn => btn.style.display = '');
      nextBtns.forEach(btn => btn.style.display = '');
      
      const footer = this.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    }

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex !== -1 && currentIndex < shells.length - 1;

    prevBtns.forEach(btn => {
      btn.disabled = !hasPrev;
    });

    nextBtns.forEach(btn => {
      btn.disabled = !hasNext;
    });
  }

  async loadContent() {
    if (this.isLoaded) return;

    const isBaseDir = !this.contentSrc || 
                      this.contentSrc.endsWith('/') || 
                      this.contentSrc === '.' || 
                      this.contentSrc === '..' || 
                      this.contentSrc.endsWith('/.') || 
                      this.contentSrc.endsWith('/..') ||
                      this.contentSrc.split('/').pop() === '';

    if (isBaseDir) {
      this.contentContainer.innerHTML = `
        <div class="p-8 text-center flex flex-col items-center justify-center gap-3">
          <svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h4 class="text-sm font-bold text-ucu-blue-dark">Documentation Pending</h4>
          <p class="text-xs text-[var(--color-muted)] max-w-sm leading-relaxed mx-auto">Official coverage and full documentation for this event are currently being compiled by the External Affairs and Linkages Office.</p>
        </div>
      `;
      this.isLoaded = true;
      return;
    }

    this.contentContainer.innerHTML = `
      <div class="w-full flex flex-col items-center justify-center py-16 gap-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-ucu-blue-dark"></div>
        <p class="text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">Loading Document...</p>
      </div>
    `;

    try {
      // Add a cache-busting query parameter to prevent browser caching of fetched HTML fragments
      const response = await fetch(this.contentSrc + '?t=' + Date.now());
      if (response.ok) {
        this.contentContainer.innerHTML = await response.text();
        // Rewrite relative image/media paths: evidence files use paths relative to
        // their own directory (e.g. ../../images/...) but since the HTML is injected
        // into the parent page, the browser resolves them relative to the parent page's
        // URL instead. We fix this by resolving each src against the evidence file's
        // actual URL to produce correct absolute paths.
        const evidenceBaseUrl = response.url;
        this.contentContainer.querySelectorAll('img[src], video[src], source[src]').forEach(el => {
          const src = el.getAttribute('src');
          if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
            try { el.setAttribute('src', new URL(src, evidenceBaseUrl).href); } catch(e) {}
          }
        });
        this.isLoaded = true;
      } else {
        this.contentContainer.innerHTML = `<p class="text-ucu-red font-bold">Failed to load documentation (HTTP ${response.status}).</p>`;
      }
    } catch (error) {
      this.contentContainer.innerHTML = `<p class="text-ucu-red font-bold">Fetch Error. Local server required.</p>`;
    }
  }

  initEvents() {
    this.closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
    });

    this.dialog.addEventListener('cancel', (e) => {
      e.preventDefault(); 
      this.close();
    });

    this.dialog.addEventListener('click', (e) => {
      const img = e.target.closest('.ucu-prose-evidence img');
      if (img) {
        this.lightboxImg.src = img.src;
        this.lightboxImg.alt = img.alt;
        this.lightbox.showModal();
        return; 
      }
      
      if (e.target === this.dialog) {
        this.close();
      }
    });

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target === this.lightboxImg) {
        this.lightbox.close();
      }
    });

    // Navigation Buttons Event Listeners
    const handleNavClick = (direction) => {
      const parent = this.parentElement || document;
      const shells = Array.from(parent.querySelectorAll('ucu-modal-shell'));
      const currentIndex = shells.findIndex(shell => shell.modalId === this.modalId);
      
      if (currentIndex !== -1) {
        const targetIndex = currentIndex + direction;
        if (targetIndex >= 0 && targetIndex < shells.length) {
          const targetShell = shells[targetIndex];
          const url = new URL(window.location);
          const paramName = url.searchParams.has('evidence') ? 'evidence' : 'event';
          url.searchParams.set(paramName, targetShell.modalId);
          window.history.pushState({}, '', url);
          window.dispatchEvent(new Event('popstate'));
        }
      }
    };

    this.querySelectorAll('.prev-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavClick(-1);
      });
    });

    this.querySelectorAll('.next-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavClick(1);
      });
    });
  }
}

if (!customElements.get("ucu-modal-shell")) customElements.define("ucu-modal-shell", UcuModalShell);

/* =========================================
   GLOBAL ROUTER (Simplified Interceptor)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  
  const checkUrlForModals = () => {
    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('evidence') || params.get('event');
    
    if (targetId) {
      setTimeout(() => {
        const targetShell = document.querySelector(`ucu-modal-shell[modal-id="${targetId}"]`);
        if (targetShell) targetShell.open();
      }, 100);
    }
  };

  checkUrlForModals();

  window.addEventListener('popstate', () => {
    document.querySelectorAll('ucu-modal-shell').forEach(shell => {
      if (shell.dialog && shell.dialog.open) shell.close(true);
    });
    checkUrlForModals();
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.ucu-event-trigger, [data-modal-trigger]');
    if (!trigger) return;

    e.preventDefault();
    const targetId = trigger.getAttribute('data-event-id') || trigger.getAttribute('data-modal-trigger');
    
    const targetShell = document.querySelector(`ucu-modal-shell[modal-id="${targetId}"]`);
    if (targetShell) {
      targetShell.open();
    } else {
      console.warn(`[UCU Architecture] Modal Shell for ID '${targetId}' not found.`);
    }
  });
});