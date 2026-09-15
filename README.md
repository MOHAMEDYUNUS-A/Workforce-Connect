# WORKFORCE SAUDIA — Mohamed Rafi Digital QR Visiting Card Platform

A modern, mobile-first digital visiting card landing page built for **Mohamed Rafi**, Area Sales Manager at **WORKFORCE SAUDIA**.

---

## 1. Core User Journey

```
           VISITOR SCANS QR / TAPS NFC
                       ↓
         ┌───────────────────────────┐
         │ 1. FORM APPEARS INSTANTLY │
         │                           │
         │ Full Name *               │
         │ Company Name              │
         │ Job Title                 │
         │ Phone Number *            │
         │ Email *                   │
         │ Message                   │
         │ [SUBMIT & CONTINUE]       │
         └───────────────────────────┘
                       +
         2. AUTOMATIC VCARD DOWNLOAD (.vcf)
                       ↓
             3. VISITOR FILLS FORM
                       ↓
             4. MAKE.COM WEBHOOK PING
                       ↓
            5. SUCCESSFUL SUBMISSION
                       ↓
         6. FORM SMOOTHLY DISAPPEARS
                       ↓
         7. MOHAMED RAFI DIGITAL PROFILE
            (Call, WhatsApp, Email, Maps,
             Workforce Saudia Bio, etc.)
```

---

## 2. File Structure (Hostinger Ready)

This project runs with **zero backend dependencies**, making it 100% compatible with Hostinger, cPanel, Apache, Nginx, or GitHub Pages.

```
workforce/
├── index.html           # Main markup (Immediate form + post-submit profile)
├── style.css            # Responsive styles, typography, animations
├── script.js            # vCard generation, validation, Make.com webhook
├── manifest.json        # PWA manifest
├── sw.js                # Service worker for offline caching
├── README.md            # Setup & documentation
└── assets/
    ├── workforce-saudia-logo.svg  # Vector brand logo (Arabic + English)
    ├── profile.svg                # Executive monogram badge
    ├── favicon.svg                # Browser tab icon
    └── card-facets.svg            # Geometric card line artwork
```

---

## 3. Hostinger Deployment Guide

1. Log into your **Hostinger hPanel**.
2. Navigate to **File Manager** (or connect via FTP).
3. Open the `public_html/` directory of your domain or subdomain (e.g. `card.workforcesaudi.com` or `workforcesaudi.com/mohamed-rafi`).
4. Upload all files and folders directly:
   - `index.html`
   - `style.css`
   - `script.js`
   - `manifest.json`
   - `sw.js`
   - `assets/` folder
5. Visit your domain in any browser or scan your QR code.

---

## 4. Make.com Webhook Integration Setup

### Step 1: Create Scenario in Make.com
1. Log in to [Make.com](https://www.make.com/).
2. Click **Create a new scenario**.

### Step 2: Add Custom Webhook
1. Click the `+` icon and search for **Webhooks**.
2. Select **Custom Webhook**.
3. Click **Create a webhook** and enter a name (e.g., `Workforce Mohamed Rafi Leads`).
4. Click **Save**.
5. Copy the generated Webhook URL (e.g., `https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`).

### Step 3: Configure `script.js`
Open `script.js` and locate `CARD_CONFIG`:
```javascript
automation: {
  makeWebhook: "https://hook.eu1.make.com/YOUR_ACTUAL_HOOK_ID"
}
```

### Step 4: Webhook Payload Structure
When a visitor submits the form, Make.com receives:
```json
{
  "source": "QR Digital Visiting Card",
  "tracking": {
    "source": "qr",
    "utm_source": "business_card",
    "utm_medium": "qr",
    "utm_campaign": "mohamed_rafi"
  },
  "person": {
    "name": "Mohamed Rafi",
    "designation": "Area Sales Manager",
    "company": "WORKFORCE SAUDIA"
  },
  "visitor": {
    "name": "Abdullah Al-Mansoor",
    "company_name": "Al-Mansoor Industrial Corp",
    "job_title": "Operations Director",
    "phone": "+966553951303",
    "email": "abdullah@almansoor.sa",
    "message": "Interested in industrial manpower staffing solutions."
  },
  "consent": true,
  "page_url": "https://workforcesaudi.com/card/mohamed-rafi?source=qr",
  "timestamp": "2026-09-15T22:00:00.000Z"
}
```

---

## 5. Google Sheets CRM Integration (Optional)

In your Make.com scenario, add a **Google Sheets → Add a Row** module immediately following the Webhook module:

| Column Header | Make.com Field Value |
|---|---|
| **Timestamp** | `{{1.timestamp}}` |
| **Source** | `{{1.tracking.source}}` |
| **Full Name** | `{{1.visitor.name}}` |
| **Company** | `{{1.visitor.company_name}}` |
| **Job Title** | `{{1.visitor.job_title}}` |
| **Phone** | `{{1.visitor.phone}}` |
| **Email** | `{{1.visitor.email}}` |
| **Message** | `{{1.visitor.message}}` |
| **Consent** | `{{1.consent}}` |
| **Page URL** | `{{1.page_url}}` |

---

## 6. WhatsApp Internal Lead Alert Automation (Optional)

In Make.com, add a **WhatsApp Business Cloud** or **Twilio / Chat-API** module to notify Mohamed Rafi instantly when an enquiry arrives:

**Message Template:**
```text
🔔 NEW DIGITAL CARD LEAD

👤 Name: {{1.visitor.name}}
🏢 Company: {{1.visitor.company_name}}
💼 Job Title: {{1.visitor.job_title}}
📞 Phone: {{1.visitor.phone}}
✉️ Email: {{1.visitor.email}}
📝 Message: {{1.visitor.message}}
🌐 Source: {{1.tracking.source}}
⏰ Time: {{1.timestamp}}
```

---

## 7. vCard Contact Details Embedded

The generated `mohamed-rafi.vcf` file conforms strictly to RFC 2426 (vCard 3.0):
- **Full Name:** Mohamed Rafi
- **Title:** Area Sales Manager
- **Organization:** WORKFORCE SAUDIA
- **Phone:** `+966553951303`
- **Email:** `mohamed.rafi@workforcesaudi.com`
- **Address:** 6588 King Fahd Bin Abdul Aziz Road, Dammam 32231, Saudi Arabia
- **Website:** `https://workforcesaudi.com`
