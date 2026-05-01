class UcuMetricCards extends HTMLElement {
  connectedCallback() {
    const metricsData = this.getAttribute("data-metrics");
    if (!metricsData) return;

    const metrics = JSON.parse(metricsData);

    const themeStyles = {
      navy: {
        bg: "bg-ucu-blue-dark",
        value: "text-white",
        label: "text-white/90",
        icon: "text-ucu-yellow",
      },
      red: {
        bg: "bg-ucu-red",
        value: "text-white",
        label: "text-white/90",
        icon: "text-ucu-yellow",
      },
      yellow: {
        bg: "bg-ucu-yellow",
        value: "text-ucu-blue-dark",
        label: "text-ucu-blue-dark/90",
        icon: "text-ucu-red",
      },
    };

    const getGridClass = (count) => {
      if (count === 1) return "grid-cols-1";
      if (count === 2) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
      if (count >= 3) return "grid-cols-1 md:grid-cols-3 lg:grid-cols-3";
      return "grid-cols-1 md:grid-cols-3";
    };

    const cardsHtml = metrics
      .map((metric) => {
        const activeTheme = metric.theme || "navy";
        const styles = themeStyles[activeTheme];
        return `
        <div class="${styles.bg} rounded-xl p-5 shadow-md hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center min-h-[120px]">
          ${metric.svgIcon ? `<div class="flex items-center gap-2 mb-1.5 ${styles.icon} opacity-90 scale-90 origin-left">${metric.svgIcon}</div>` : ""}
          <h3 class="text-3xl font-extrabold tracking-tight leading-none ${styles.value}">${metric.value}</h3>
          <p class="${styles.label} text-xs font-medium mt-1.5">${metric.label}</p>
        </div>
      `;
      })
      .join("");

    this.innerHTML = `<div class="w-full grid gap-4 ${getGridClass(metrics.length)} mb-8">${cardsHtml}</div>`;
  }
}

if (!customElements.get("ucu-metric-cards"))
  customElements.define("ucu-metric-cards", UcuMetricCards);
