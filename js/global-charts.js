// js/global-charts.js

class UcuDataViz extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('data-type'); // 'progress', 'vertical', 'stacked'
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const payload = JSON.parse(this.getAttribute('data-payload') || '[]');

    let chartHtml = '';

    if (type === 'progress') {
      chartHtml = payload.map(item => `
        <div class="mb-4">
          <div class="flex justify-between items-end mb-1 text-sm font-bold text-ucu-blue-dark">
            <span>${item.label}</span>
            <span>${item.percentage}%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div class="${item.barColorClass || 'bg-ucu-blue-dark'} h-2.5 rounded-full" style="width: ${item.percentage}%"></div>
          </div>
        </div>
      `).join('');
    } 
    
    else if (type === 'vertical') {
      const cols = payload.map(item => `
        <div class="flex flex-col items-center justify-end h-full group">
          <div class="text-xs font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${item.textClass}">${item.value}</div>
          <div class="w-12 md:w-16 ${item.baseBgClass} hover:${item.hoverBgClass} rounded-t-md transition-all duration-300 cursor-pointer" style="height: ${item.heightPercent}%;"></div>
          <div class="mt-3 text-xs font-bold text-slate-500 uppercase tracking-widest">${item.year}</div>
        </div>
      `).join('');
      chartHtml = `<div class="flex items-end justify-around w-full h-64 border-b border-slate-300 pb-2">${cols}</div>`;
    } 
    
    else if (type === 'stacked') {
      const segments = payload.map(item => `
        <div class="${item.bgClass} h-full flex items-center justify-center cursor-help transition-all hover:brightness-110" style="width: ${item.percentage}%;" title="${item.label}: ${item.percentage}%">
          <span class="text-[10px] font-bold ${item.textClass} tracking-widest hidden md:block">${item.percentage}%</span>
        </div>
      `).join('');
      const legend = payload.map(item => `
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-sm ${item.bgClass}"></div>
          <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">${item.legendLabel || item.label}</span>
        </div>
      `).join('');
      chartHtml = `
        <div class="w-full h-8 rounded-full overflow-hidden flex mb-4 shadow-inner">${segments}</div>
        <div class="flex flex-wrap justify-center gap-4 md:gap-8">${legend}</div>
      `;
    }

    this.innerHTML = `
      <div class="w-full my-8 p-6 md:p-8 bg-white border border-slate-200 rounded-2xl shadow-sm not-prose">
        <h4 class="text-lg md:text-xl font-black text-ucu-blue-dark tracking-tight mb-1">${title}</h4>
        ${subtitle ? `<p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">${subtitle}</p>` : '<div class="mb-6"></div>'}
        ${chartHtml}
      </div>
    `;
  }
}

if (!customElements.get("ucu-data-viz")) customElements.define("ucu-data-viz", UcuDataViz);