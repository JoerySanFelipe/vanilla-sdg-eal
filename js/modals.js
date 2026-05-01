// js/modal-shell.js

class UcuModalShell extends HTMLElement {
  async connectedCallback() {
    if (this.hasRendered) return;
    this.hasRendered = true;
    
    const id = this.getAttribute('modal-id'); // e.g., "1_3"
    const title = this.getAttribute('title');
    const badge = this.getAttribute('badge');
    const contentSrc = this.getAttribute('content-src');
    
    let contentHtml = this.innerHTML; 

    this.innerHTML = `
      <dialog id="modal-${id}" class="main-evidence-modal backdrop:bg-black/40 backdrop:backdrop-blur-sm bg-transparent w-full max-w-5xl m-auto p-0 rounded-3xl shadow-2xl open:animate-[pop-in_0.3s_ease-out_forwards]">
        <div class="bg-white rounded-3xl overflow-hidden flex flex-col max-h-[90vh] w-full">
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
            <div class="ucu-prose-evidence evidence-content-container">
              <!-- Content injected here -->
            </div>
          </article>
        </div>
      </dialog>
      
      <dialog id="lightbox-${id}" class="lightbox-dialog backdrop:bg-black/90 backdrop:backdrop-blur-sm bg-transparent border-0 p-0 m-auto max-w-[95vw] max-h-[95vh] cursor-zoom-out shadow-2xl open:animate-[pop-in_0.2s_ease-out_forwards]">
        <img src="" alt="Expanded Media View" class="lightbox-img w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain rounded-xl" />
      </dialog>
    `;

    const container = this.querySelector('.evidence-content-container');

    if (contentSrc) {
      container.innerHTML = `<p class="text-muted font-medium text-sm animate-pulse">Loading document...</p>`;
      try {
        const response = await fetch(contentSrc);
        if (response.ok) {
          contentHtml = await response.text();
        } else {
          contentHtml = `<p class="text-ucu-red font-bold">Failed to load documentation (HTTP ${response.status}).</p>`;
        }
      } catch (error) {
        contentHtml = `<p class="text-ucu-red font-bold">Fetch Error. Local server required.</p>`;
      }
    }

    container.innerHTML = contentHtml;
    setTimeout(() => this.initEvents(id), 50);
  }

  initEvents(id) {
    const dialog = document.getElementById(`modal-${id}`);
    const lightbox = document.getElementById(`lightbox-${id}`);
    const lightboxImg = lightbox.querySelector('.lightbox-img');

    // 1. Image Click -> Lightbox
    dialog.addEventListener('click', (e) => {
      const img = e.target.closest('.ucu-prose-evidence img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.showModal();
      }
      if (e.target === dialog) dialog.close();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxImg) lightbox.close();
    });

    // 2. URL Router Cleanup: When modal closes, strip the ?evidence= tag from URL
    dialog.addEventListener('close', () => {
      if (new URLSearchParams(window.location.search).has('evidence')) {
        window.history.pushState({}, '', window.location.pathname);
      }
    });
  }
}

if (!customElements.get("ucu-modal-shell")) customElements.define("ucu-modal-shell", UcuModalShell);

/* =========================================
   GLOBAL ROUTER (Auto-opens modal on load)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const checkUrlForEvidence = () => {
    const params = new URLSearchParams(window.location.search);
    const evidenceId = params.get('evidence');
    
    if (evidenceId) {
      // Give the custom elements 100ms to mount before trying to open
      setTimeout(() => {
        const targetModal = document.getElementById(`modal-${evidenceId}`);
        if (targetModal && !targetModal.open) {
          targetModal.showModal();
        }
      }, 100);
    }
  };

  // Run on first load
  checkUrlForEvidence();

  // Run if user uses browser Back/Forward buttons
  window.addEventListener('popstate', () => {
    // Close all open modals first
    document.querySelectorAll('.main-evidence-modal[open]').forEach(dialog => dialog.close());
    checkUrlForEvidence();
  });
});