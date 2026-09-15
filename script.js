/**
 * WORKFORCE SAUDIA - MOHAMED RAFI NIYAZ DEEN
 * Executive QR Digital Visiting Card & Portfolio Engine
 * Production-Quality Client Logic & Make.com Webhook Integration
 */

// ==========================================================
// CENTRAL CONFIGURATION
// ==========================================================
const CARD_CONFIG = {
  person: {
    name: "Mohamed Rafi Niyaz Deen",
    shortName: "Mohamed Rafi",
    arabicName: "محمد رافي نياز دين",
    designation: "Head of Business Development | Area Sales Manager",
    company: "WORKFORCE SAUDIA",
    phone: "+966 55 395 1303",
    normalizedPhone: "+966553951303",
    email: "mohamed.rafi@workforcesaudi.com",
    personalEmail: "mohamedrafi2512@gmail.com",
    profileImage: "assets/rafi bg removed.png",
    badgeImage: "assets/Rafi image.png",
    cvUrl: "Mohamed-Rafi-CV.pdf",
    linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
    bio: "Strategic commercial leader with 15+ years of GCC experience driving mega-workforce outsourcing (10,000+ personnel), Saudi labor GRC compliance (Qiwa, GOSI, WPS), and industrial 3PL logistics."
  },
  company: {
    name: "WORKFORCE SAUDIA",
    arabicName: "القوات العاملة السعودية",
    logo: "assets/WORKFORCE LOGO.png",
    website: "https://workforcesaudi.com",
    address: "6588 King Fahd Bin Abdul Aziz Road, Al Khalidiyah Al Shamaliyah, Dammam 32231, Saudi Arabia",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("6588 King Fahd Bin Abdul Aziz Road, Al Khalidiyah Al Shamaliyah, Dammam 32231, Saudi Arabia")
  },
  automation: {
    // Live Make.com Custom Webhook Endpoint
    makeWebhook: "https://hook.eu1.make.com/irql77cgi6tfik2iko1652h1ivtlcnvk"
  },
  whatsappPresetMessage: "Hello Mohamed Rafi, I reviewed your Workforce Saudia executive card and would like to discuss workforce solutions."
};

// ==========================================================
// INITIALIZATION
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  // 1. Dynamic Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Form & Skip Handlers
  initializeForm();

  // 3. Action Links
  initializeActions();

  // 4. Initialize Particles for Hero
  initParticles();

  // 5. Automatic vCard trigger once per session
  setTimeout(() => {
    attemptAutomaticVCardDownload();
  }, 450);
}

// ==========================================================
// AMBIENT GOLD PARTICLES GENERATOR
// ==========================================================
function initParticles() {
  const host = document.getElementById("particles-host");
  if (!host) return;
  host.innerHTML = "";

  for (let i = 0; i < 26; i++) {
    const p = document.createElement("span");
    p.className = "gold-particle";
    p.style.left = `${Math.random() * 100}%`;
    const size = 1.2 + Math.random() * 2.8;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.opacity = (0.15 + Math.random() * 0.45).toString();
    p.style.animationDuration = `${11 + Math.random() * 13}s`;
    p.style.animationDelay = `${Math.random() * -20}s`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 60}px`);
    host.appendChild(p);
  }
}

// ==========================================================
// VCARD GENERATION & DOWNLOAD
// ==========================================================
function generateVCard() {
  const vcardText = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CARD_CONFIG.person.name}`,
    "N:Deen;Mohamed Rafi Niyaz;;;",
    `TITLE:${CARD_CONFIG.person.designation}`,
    `ORG:${CARD_CONFIG.company.name}`,
    `TEL;TYPE=CELL:${CARD_CONFIG.person.normalizedPhone}`,
    `EMAIL:${CARD_CONFIG.person.email}`,
    `EMAIL;TYPE=HOME:${CARD_CONFIG.person.personalEmail}`,
    "ADR;TYPE=WORK:;;6588 King Fahd Bin Abdul Aziz Road;Dammam;;32231;Saudi Arabia",
    `URL:${CARD_CONFIG.company.website}`,
    `X-SOCIALPROFILE;type=linkedin:${CARD_CONFIG.person.linkedin}`,
    "NOTE:Workforce Saudia - Head of Business Development | 15+ Years GCC Experience",
    "END:VCARD"
  ].join("\r\n");

  return new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
}

function downloadVCard() {
  try {
    const blob = generateVCard();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mohamed-rafi.vcf";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 300);

    return true;
  } catch (err) {
    console.error("vCard download error:", err);
    return false;
  }
}

function attemptAutomaticVCardDownload() {
  if (sessionStorage.getItem("workforce_vcard_downloaded")) {
    return;
  }
  sessionStorage.setItem("workforce_vcard_downloaded", "true");
  downloadVCard();
}

// ==========================================================
// FORM HANDLING & WEBHOOK INTEGRATION
// ==========================================================
function initializeForm() {
  const form = document.getElementById("lead-contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit();
    });
  }

  // Fallback vCard button inside form
  const vcardFallbackBtn = document.getElementById("form-vcard-fallback-btn");
  if (vcardFallbackBtn) {
    vcardFallbackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadVCard();
      showToast("Mohamed Rafi's vCard downloaded!");
    });
  }

  // Skip to full profile button
  const skipBtn = document.getElementById("btn-skip-to-profile");
  if (skipBtn) {
    skipBtn.addEventListener("click", (e) => {
      e.preventDefault();
      revealProfile();
    });
  }
}

function validateForm(formData) {
  let isValid = true;
  clearErrors();

  if (!formData.name || formData.name.length < 2) {
    showFieldError("name", "Please enter your full name.");
    isValid = false;
  }

  if (!formData.phone || formData.phone.length < 8) {
    showFieldError("phone", "Please enter a valid phone number (e.g. 055 395 1303 or +966...)");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    showFieldError("email", "Please enter a valid business email address.");
    isValid = false;
  }

  if (!formData.consent) {
    showFieldError("consent", "Please confirm consent to proceed.");
    isValid = false;
  }

  return isValid;
}

async function handleFormSubmit() {
  const honeypot = document.getElementById("website_hp")?.value;
  if (honeypot) return;

  const nameInput = document.getElementById("visitor_name");
  const companyInput = document.getElementById("visitor_company");
  const jobTitleInput = document.getElementById("visitor_job_title");
  const phoneInput = document.getElementById("visitor_phone");
  const emailInput = document.getElementById("visitor_email");
  const messageInput = document.getElementById("visitor_message");
  const consentInput = document.getElementById("visitor_consent");

  const formData = {
    name: nameInput?.value.trim() || "",
    company_name: companyInput?.value.trim() || "",
    job_title: jobTitleInput?.value.trim() || "",
    phone: phoneInput?.value.trim() || "",
    email: emailInput?.value.trim() || "",
    message: messageInput?.value.trim() || "",
    consent: consentInput?.checked || false
  };

  if (!validateForm(formData)) return;

  const urlParams = new URLSearchParams(window.location.search);
  const payload = {
    source: "QR / NFC Digital Visiting Card",
    tracking: {
      source: urlParams.get("source") || "qr",
      utm_source: urlParams.get("utm_source") || "business_card",
      utm_medium: urlParams.get("utm_medium") || "qr",
      utm_campaign: urlParams.get("utm_campaign") || ""
    },
    person: {
      name: CARD_CONFIG.person.name,
      designation: CARD_CONFIG.person.designation,
      company: CARD_CONFIG.company.name
    },
    visitor: formData,
    consent: formData.consent,
    page_url: window.location.href,
    timestamp: new Date().toISOString()
  };

  setSubmittingState(true);

  try {
    const success = await sendToMakeWebhook(payload);
    if (success) {
      showToast("Thank you! Connecting with Mohamed Rafi...");
      revealProfile();
    } else {
      showError("Unable to submit right now. Please connect directly.");
    }
  } catch (err) {
    console.error("Submission failed:", err);
    showError("Network error. Please try again or connect directly.");
  } finally {
    setSubmittingState(false);
  }
}

async function sendToMakeWebhook(payload) {
  const webhookUrl = CARD_CONFIG.automation.makeWebhook;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (err) {
    console.warn("Webhook fetch encountered error, fallback saving lead locally:", err);
    try {
      const stored = JSON.parse(localStorage.getItem("workforce_leads") || "[]");
      stored.push(payload);
      localStorage.setItem("workforce_leads", JSON.stringify(stored));
    } catch (e) {}
    return true; // Still reveal profile smoothly
  }
}

function revealProfile() {
  const formView = document.getElementById("form-view-container");
  const profileView = document.getElementById("profile-landing-container");
  const stickyBar = document.getElementById("sticky-profile-bar");

  if (formView) {
    formView.classList.add("hidden-screen");
  }

  if (profileView) {
    profileView.classList.add("visible-screen");
    initParticles();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (stickyBar) {
    stickyBar.classList.add("visible-bar");
  }
}

function setSubmittingState(isSubmitting) {
  const submitBtn = document.getElementById("btn-form-submit");
  const btnText = document.getElementById("btn-submit-text");
  const spinner = document.getElementById("btn-submit-spinner");

  if (!submitBtn) return;
  submitBtn.disabled = isSubmitting;
  if (btnText) btnText.textContent = isSubmitting ? "CONNECTING..." : "CONNECT WITH MOHAMED RAFI";
  if (spinner) spinner.style.display = isSubmitting ? "inline-block" : "none";
}

function showError(message) {
  const errorBanner = document.getElementById("form-error-banner");
  const errorText = document.getElementById("form-error-text");
  if (errorBanner && errorText) {
    errorText.textContent = message;
    errorBanner.style.display = "block";
  }
}

function showFieldError(fieldId, msg) {
  const errorEl = document.getElementById(`error_${fieldId}`);
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add("visible");
  }
}

function clearErrors() {
  document.querySelectorAll(".field-error-msg").forEach((el) => {
    el.textContent = "";
    el.classList.remove("visible");
  });
}

// ==========================================================
// ACTIONS & COMMUNICATORS
// ==========================================================
function initializeActions() {
  // Download vCard buttons
  document.querySelectorAll(".action-download-vcard").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadVCard();
      showToast("Mohamed Rafi's vCard downloaded!");
    });
  });

  // WhatsApp preset link
  const waUrl = `https://wa.me/${CARD_CONFIG.person.normalizedPhone.replace('+', '')}?text=${encodeURIComponent(CARD_CONFIG.whatsappPresetMessage)}`;
  document.querySelectorAll(".link-whatsapp").forEach((link) => {
    link.href = waUrl;
  });

  // Direct Call links
  document.querySelectorAll(".link-call").forEach((link) => {
    link.href = `tel:${CARD_CONFIG.person.normalizedPhone}`;
  });

  // Email links
  document.querySelectorAll(".link-email").forEach((link) => {
    link.href = `mailto:${CARD_CONFIG.person.email}`;
  });
}

// Toast notification helper
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    background: #FFFFFF;
    color: #1A2226;
    border: 1.5px solid #009688;
    border-radius: 9999px;
    padding: 11px 24px;
    font-size: 0.86rem;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(0,77,64,0.18), 0 0 15px rgba(0,150,136,0.25);
    margin-bottom: 10px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}
