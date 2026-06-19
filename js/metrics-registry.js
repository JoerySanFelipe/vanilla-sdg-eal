// js/metrics-registry.js

/**
 * UCU Unified Metrics Registry
 * Single Source of Truth for all standalone institutional data and calculated array lengths.
 */
window.UCU_METRICS = {
  // --- FLAT / HARDCODED METRICS ---
  sdgTargets: "169",
  activeMous: "150+",
  facultyCount: "420",
  studentPopulation: "15,000+",
  universityRankings: "4",

  // --- BASE AGGREGATES ---
  get totalEvents() {
    return window.UCU_EVENTS ? window.UCU_EVENTS.length.toLocaleString() : "0";
  },
  get totalPartners() {
    return window.UCU_PARTNERS ? window.UCU_PARTNERS.length.toLocaleString() : "0";
  },
  get totalResearch() {
    return window.UCU_RESEARCH ? window.UCU_RESEARCH.length.toLocaleString() : "0";
  },
  get totalCountries() {
    return window.UCU_COUNTRIES ? window.UCU_COUNTRIES.length.toLocaleString() : "0";
  },

  // --- PARTNERSHIP SPECIFIC FILTERS ---
  get localPartners() {
    if (!window.UCU_PARTNERS) return "0";
    return window.UCU_PARTNERS.filter(p => p.category === "local-academic" || p.category === "local-industry").length.toLocaleString();
  },
  get globalPartners() {
    if (!window.UCU_PARTNERS) return "0";
    return window.UCU_PARTNERS.filter(p => p.category === "international-academic" || p.category === "international-industry").length.toLocaleString();
  },
  get membershipPartners() {
    if (!window.UCU_PARTNERS) return "0";
    return window.UCU_PARTNERS.filter(p => p.category === "membership").length.toLocaleString();
  }
};

// --- DYNAMIC SDG CROSS-REFERENCING (1-17) ---
for (let i = 1; i <= 17; i++) {
  // 1. Event Cross-Referencer (Bulletproofed)
  Object.defineProperty(window.UCU_METRICS, `eventsSdg${i}`, {
    get: function() {
      if (!window.UCU_EVENTS) return "0";
      const count = window.UCU_EVENTS.filter(event => {
        if (!event.relatedSdgs) return false;
        return event.relatedSdgs.some(sdg => parseInt(sdg, 10) === i);
      }).length;
      return count.toLocaleString();
    },
    enumerable: true
  });

  // 2. Research Cross-Referencer (Bulletproofed)
  Object.defineProperty(window.UCU_METRICS, `researchSdg${i}`, {
    get: function() {
      if (!window.UCU_RESEARCH) return "0";
      const count = window.UCU_RESEARCH.filter(item => {
        if (!item.sdgs) return false;
        return item.sdgs.some(sdg => parseInt(sdg, 10) === i);
      }).length;
      return count.toLocaleString();
    },
    enumerable: true
  });
}