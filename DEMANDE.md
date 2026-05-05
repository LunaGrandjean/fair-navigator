Update the existing mobile-first L’Étudiant fair app prototype to introduce a **pre-fair onboarding and account creation flow**, while keeping all existing features (QR scanning, journey tracking, dashboard, etc.).

The goal is to simulate a **“digital-first student persona”** who prepares before attending the fair.

---

## 🔄 Replace the current first screen (QR scan entry)

### ❌ REMOVE:

* “Scan your badge” as the first action

### ✅ REPLACE WITH:

## 1. 🔐 Authentication Screen

### UI:

* Title: “Welcome to L’Étudiant”

* Subtitle: “Start your personalized fair journey”

* Two main buttons:

  * “Log in”
  * “Create an account”

* Secondary option (small):

  * “Continue as guest (demo mode)”

---

## 2. 🧠 Account Creation Flow (MULTI-STEP — VERY IMPORTANT)

Design a smooth, mobile-friendly onboarding experience with **progress indicator (step 1/5, 2/5, etc.)**

Each step = one question (card-based UI, large buttons)

### Step 1 — Basic info

* “What is your current level?”

  * High school (Seconde / Première / Terminale)
  * Post-bac
  * Reorientation

---

### Step 2 — Academic background

* “What are your specialties?” (multi-select)

  * Math
  * Economics
  * Science
  * Literature
  * Other

---

### Step 3 — Study preferences

* “What kind of studies are you looking for?”

  * Short (2–3 years)
  * Long (5+ years)
  * Not sure

---

### Step 4 — Interests

* “What fields interest you most?” (multi-select)

  * Business / Management
  * Engineering
  * Health
  * Arts / Communication
  * IT / Tech

---

### Step 5 — Learning style

* “How do you prefer to learn?”

  * Practical / hands-on
  * Theoretical
  * Mixed

---

### Step 6 — Location preference

* “Where would you like to study?”

  * Big city
  * Medium city
  * Campus environment
  * No preference

---

### Final Step — Confirmation

* “Your profile is ready 🎉”
* CTA: “Start my fair journey”

---

## 🎯 UX Goals of onboarding

* Fast (under 1 minute)
* Visual and engaging
* No typing (buttons only)
* Feels like a “smart orientation assistant”

---

## 🔗 After onboarding

Redirect user to existing screen:

👉 “Your Fair Journey” (KEEP EXACTLY AS IT IS)

* QR scan functionality stays
* Stand tracking stays
* Quiz stays
* Progress bar stays

---

## 📊 Dashboard IMPROVEMENT (IMPORTANT)

Enhance personalization using onboarding data:

### Add section:

“Based on your profile”

* Explain recommendations:

  * “Because you selected Business + Short studies + Practical learning…”

### Improve match score logic visually:

* Show why each school matches

---

## 📩 Export screen (KEEP but IMPROVE)

Since user may already have an account:

* If logged in:
  → “Send my results to my email”

* If guest:
  → ask for email (as before)

---

## 🧠 Product Logic (CRITICAL FOR DEMO)

This version represents:
👉 a **high-intent student who prepared before the fair**

Explain through UI:

* onboarding = declared data
* fair activity = behavioral data
* dashboard = combination of both

---

## 🎨 Design consistency

* Keep red/white theme
* Keep existing UI style
* Maintain smooth transitions between onboarding steps
* Add progress bar during onboarding

---

## ✨ Optional improvements

* Add small icons per answer
* Add subtle animations between steps
* Add “Skip for now” option (important for realism)

---

## 🚫 Important constraint

Do NOT overcomplicate with forms or typing
→ everything must be tap-based and mobile-first

---

## 🎯 Final goal

Show a seamless experience where:

* the student builds a profile BEFORE the fair
* interacts DURING the fair
* receives a HIGHLY personalized dashboard AFTER

This must feel like a real product used by thousands of students.