// js/partners-data.js

/**
 * UCU Institutional Linkages & Memberships Data Store
 * Schema:
 * - name: Official name of the institution/organization
 * - category: 'international' | 'local' | 'membership'
 * - logoSrc: Relative path to the logo image
 * - url: Official website (leave empty string "" if none exists to disable linking)
 */

window.UCU_PARTNERS = [
  // --- INTERNATIONAL PARTNERS ---
  { name: "American University of Sovereign Nations", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Universitas Persada Indonesia", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Konan University", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "University of Liberal Arts Bangladesh", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Universitas Pendidikan Ganeshia", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Chandigarh Group of Colleges", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Global Peace Foundation", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Richmond American University, London", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Tongmyong University", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "University of Technology and Applied Sciences", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Portsworls Academy Malaysia", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Institut Teknologi Sepuluh Nopember (ITS) Indonesia", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "University of Mostar", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "International Society of Teachers, Administrators and Researchers Inc.", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "SSIST University, and SDG Management School", category: "international", logoSrc: "./images/partners/placeholder.png", url: "" },

  // --- LOCAL PARTNERS ---
  { name: "Benguet State University", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Beyond Books Publication", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Commission on Human Rights-RO1", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Center for Pangasinan Studies", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Global Professional Advancement", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Iloilo Science and Technology University", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Lananpin National High School", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "SDO-Urdaneta City", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Urdaneta District Jail Male Dorm", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Northwestern University", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Leyte Normal University", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Kalinga State University", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "St. Bernadette Lourdes College", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Philippine Red Cross", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "University of Baguio", category: "local", logoSrc: "./images/partners/placeholder.png", url: "" },

  // --- MEMBERSHIPS ---
  { name: "Global School Alliance", category: "membership", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "Global University Network for Innovation", category: "membership", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "United Nations Academic Impact", category: "membership", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "SDSN", category: "membership", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "ATENEO-EEC", category: "membership", logoSrc: "./images/partners/placeholder.png", url: "" },
  { name: "3ZERO", category: "membership", logoSrc: "./images/partners/placeholder.png", url: "" }
];

/**
 * UCU Global Reach - Countries Represented
 */
window.UCU_COUNTRIES = [
  "Philippines", "Turkey", "Bangladesh", "Indonesia", "Japan", "Oman", "South Korea", 
  "Thailand", "Taiwan", "Vietnam", "Malaysia", "China", 
  "Bosnia and Herzegovina", "United Kingdom", "Switzerland", "Poland", 
  "USA", "Canada"
];