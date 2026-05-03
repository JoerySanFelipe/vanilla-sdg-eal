// js/modals.js

class UcuModalShell extends HTMLElement {
  connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;
    
    this.modalId = this.getAttribute('modal-id'); 
    const title = this.getAttribute('title');
    const badge = this.getAttribute('badge');
    this.contentSrc = this.getAttribute('content-src');
    const sdgsData = this.getAttribute('data-sdgs'); 
    
    // NEW: Track if the content has been fetched to prevent duplicate network calls
    this.isLoaded = false; 
    
    let footerHtml = '';

    if (sdgsData && sdgsData !== '[]') {
      try {
        const sdgs = JSON.parse(sdgsData).sort((a, b) => a - b);
        const SDG_COLORS = ['#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2', '#FCC30B', '#A21942', '#FD6925', '#DD1367', '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A'];
        
        const tagsHtml = sdgs.map(num => `
          <div class="flex items-center justify-center w-8 h-8 rounded-md text-white text-xs font-black shadow-sm transition-transform hover:-translate-y-0.5" style="background-color: ${SDG_COLORS[num-1] || '#24305e'};" title="SDG ${num}">${num}</div>
        `).join('');

        footerHtml = `
          <footer class="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-8 py-5 flex items-center justify-end gap-4 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">SDG Alignment</span>
            <div class="flex flex-wrap gap-2">${tagsHtml}</div>
          </footer>
        `;
      } catch (e) {
        console.error("Invalid SDG array passed to modal.");
      }
    }

    this.innerHTML = `
      <dialog id="modal-${this.modalId}" class="main-evidence-modal backdrop:bg-black/40 backdrop:backdrop-blur-sm bg-transparent w-full max-w-3xl m-auto p-0 rounded-3xl shadow-2xl open:animate-[pop-in_0.3s_ease-out_forwards]">
        <div class="bg-white rounded-3xl overflow-hidden flex flex-col max-h-[90vh] w-full relative">
          <header class="flex items-start justify-between px-6 py-4 border-b border-black/5 sticky top-0 z-20 bg-white/90">
            <div class="flex flex-col gap-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-black/5 rounded-full w-fit shadow-sm">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-ucu-blue-dark opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-ucu-blue-dark"></span>
                </span>
                <span class="text-[0.65rem] font-black uppercase tracking-[0.1em] text-ucu-blue-dark">${badge}</span>
              </div>
              <h1 class="text-base md:text-lg font-black tracking-tight pr-4 m-0 text-ucu-blue-dark">${title}</h1>
            </div>
            <form method="dialog" class="pt-2">
              <button class="group flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 shrink-0 shadow-sm bg-gray-100 hover:bg-ucu-red text-gray-500 hover:text-white" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </header>
          <article class="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 min-h-0">
            <!-- Content is injected here dynamically ONLY when opened -->
            <div class="ucu-prose-evidence evidence-content-container flex flex-col"></div>
          </article>
          ${footerHtml}
        </div>
      </dialog>
      
      <dialog id="lightbox-${this.modalId}" class="lightbox-dialog backdrop:bg-black/90 backdrop:backdrop-blur-sm bg-transparent border-0 p-0 m-auto max-w-[95vw] max-h-[95vh] cursor-zoom-out shadow-2xl open:animate-[pop-in_0.2s_ease-out_forwards]">
        <img src="" alt="Expanded Media View" class="lightbox-img w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain rounded-xl" />
      </dialog>
    `;

    setTimeout(() => this.initEvents(this.modalId), 50);
  }

  // NEW: Dedicated fetch method called by the router
  async loadContent() {
    if (this.isLoaded || !this.contentSrc) return;

    const container = this.querySelector('.evidence-content-container');
    
    // Show a sleek loading spinner while fetching
    container.innerHTML = `
      <div class="w-full flex flex-col items-center justify-center py-16 gap-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-ucu-blue-dark"></div>
        <p class="text-xs font-bold text-muted uppercase tracking-widest">Loading Document...</p>
      </div>
    `;

    try {
      const response = await fetch(this.contentSrc);
      if (response.ok) {
        container.innerHTML = await response.text();
        this.isLoaded = true; // Mark as loaded so it never fetches again
      } else {
        container.innerHTML = `<p class="text-ucu-red font-bold">Failed to load documentation (HTTP ${response.status}).</p>`;
      }
    } catch (error) {
      container.innerHTML = `<p class="text-ucu-red font-bold">Fetch Error. Local server required.</p>`;
    }
  }

  initEvents(id) {
    const dialog = document.getElementById(`modal-${id}`);
    const lightbox = document.getElementById(`lightbox-${id}`);
    const lightboxImg = lightbox.querySelector('.lightbox-img');

    const unlockBodyScroll = () => {
      if (document.querySelectorAll('dialog[open]').length === 0) {
        document.body.style.overflow = '';
      }
    };

    // Event Delegation handles clicks perfectly even on dynamically loaded content
    dialog.addEventListener('click', (e) => {
      const img = e.target.closest('.ucu-prose-evidence img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.showModal();
        document.body.style.overflow = 'hidden'; 
      }
      if (e.target === dialog) dialog.close();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxImg) lightbox.close();
    });

    lightbox.addEventListener('close', unlockBodyScroll);

    dialog.addEventListener('close', () => {
      unlockBodyScroll(); 
      const params = new URLSearchParams(window.location.search);
      if (params.has('evidence') || params.has('event')) {
        window.history.pushState({}, '', window.location.pathname);
      }
    });
  }
}

if (!customElements.get("ucu-modal-shell")) customElements.define("ucu-modal-shell", UcuModalShell);


/* =========================================
   GLOBAL ROUTER & INTERCEPTOR
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  
  const checkUrlForModals = () => {
    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('evidence') || params.get('event');
    
    if (targetId) {
      setTimeout(() => {
        // NEW: Trigger the fetch before showing the modal
        const targetShell = document.querySelector(`ucu-modal-shell[modal-id="${targetId}"]`);
        if (targetShell) targetShell.loadContent();

        const targetModal = document.getElementById(`modal-${targetId}`);
        if (targetModal && !targetModal.open) {
          targetModal.showModal();
          document.body.style.overflow = 'hidden'; 
        }
      }, 100);
    }
  };

  checkUrlForModals();

  window.addEventListener('popstate', () => {
    document.querySelectorAll('.main-evidence-modal[open]').forEach(dialog => dialog.close());
    checkUrlForModals();
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-trigger]');
    if (!trigger) return;

    e.preventDefault();
    const targetId = trigger.getAttribute('data-modal-trigger');
    
    // NEW: Trigger the fetch
    const targetShell = document.querySelector(`ucu-modal-shell[modal-id="${targetId}"]`);
    if (targetShell) targetShell.loadContent();

    const targetModal = document.getElementById(`modal-${targetId}`);

    if (targetModal) {
      const url = new URL(window.location);
      url.searchParams.set('event', targetId);
      window.history.pushState({}, '', url);

      targetModal.showModal();
      document.body.style.overflow = 'hidden'; 
    } else {
      console.warn(`Modal Element ID 'modal-${targetId}' not found in the DOM.`);
    }
  });
});