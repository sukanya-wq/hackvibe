# 🏆 L'Étoile AI — Next-Gen Smart Restaurant OS (SaaS)
LIVE DEMO LINK https://hackvibe-nine.vercel.app/

> **VibeAthon 6.0 (Vibe Coding Hackathon) – 2K26 Submission**  
> **Problem Statement (PS):** Smart Restaurant Management System  
> **Platinum Level Achieved (User Stories 1–5)**  

---

## 👥 Team Details — **Blue Zone**

| Role | Member Name |
| :--- | :--- |
| **Team Leader** | **G. Sukanya Lakshmi** |
| **Team Member** | **B. Sirisha** |

---

## 🌐 Project Links & Quick Demo

- **Hosted Application (Live Public URL):** [https://ais-pre-qimhvq3jh4kvfveua7t77k-38039613677.asia-southeast1.run.app](https://ais-pre-qimhvq3jh4kvfveua7t77k-38039613677.asia-southeast1.run.app)
- **Deployment Platform:** Vercel / Cloud Run (Vite Single Page Application with zero build errors)

---

## 🎯 Executive Problem Statement

Traditional restaurants suffer from manual friction across customer and management workflows:
1. **Uncertainty & Delays:** Guests face long wait times to verify dish availability or request staff.
2. **Limited Engagement:** Static paper menus lack ingredient transparency, wine pairing expertise, or custom dietary options.
3. **Manual POS & Inventory:** Kitchen staff rely on paper tickets, causing order bottlenecks and untracked stock depletion.
4. **Lack of Personalization:** Returning loyal guests are treated as first-timers with zero memory of prior preferences or dietary needs.

**L'Étoile AI** by **Team Blue Zone** bridges customer dining and back-of-house operations into a seamless digital SaaS platform.

---

## 🚀 Ranking Compliance & User Stories Completed

### 🥉 Bronze Level — User Experience (User Story 1)
- [x] **3-Michelin-Star Luxury Interface:** High-contrast responsive design with dark/light theme switching, smooth animations, sound effects, and glassmorphism cards.
- [x] **Universal Accessibility:** Touch targets optimized for mobile browsers and desktop interactive displays.

### 🥈 Silver Level — Authentication & Digital Operations (User Stories 2 & 3)
- [x] **Role-Based Authentication:** Multi-role login supporting Customer, Chef, and Restaurant Manager profiles.
- [x] **Dual Verification:** Email & Password with OTP verification + Google OAuth instant sign-in.
- [x] **Digital Menu & Live Availability:** Real-time stock toggle indicators (In Stock vs. Sold Out).
- [x] **Table Stand QR Code System:** Table-specific QR code generator with downloadable print cards.
- [x] **In-App Direct QR Bill Settlement:** Itemized digital billing with gratuity calculator, tax breakdown, and instant QR payment verification.
- [x] **Smart Reservations & Queue Management:** Live waitlist counter, party size selector, and real-time floor seat map.

### 🥇 Gold Level — Restaurant Management POS (User Story 4)
- [x] **POS Mission Control Dashboard:** Centralized management dashboard for restaurant staff.
- [x] **Real-Time Ticket Management:** Live kitchen order queue with status progression (*Received* ➔ *Cooking* ➔ *Ready* ➔ *Served*).
- [x] **Automated Low-Stock Inventory Alerts:** Real-time ingredient depletion tracking with automated restock warnings.
- [x] **Floor Seat Map & Table Status:** Interactive floorplan showing occupied, reserved, and available tables.
- [x] **Staff Roster & Duty Logs:** Shift scheduling and active staff monitoring.
- [x] **Business Analytics:** Sales charts, revenue trends, and peak hour traffic metrics.

### 💎 Platinum Level — Intelligent Operations (User Story 5)
- [x] **Gemini AI Wine Sommelier:** Real-time vintage wine cellar pairing recommendation engine.
- [x] **AI Mood Recommender:** Tailored multi-course culinary recommendations based on guest mood and occasion.
- [x] **Return-Visitor Memory Engine:** Mail-authenticated visitor memory remembering past orders, dietary preferences, and loyalty perks.
- [x] **Interactive 3D Burger Studio:** Layer-by-layer gourmet custom burger builder with live price updates.
- [x] **Bespoke Tasting Menu Builder:** Customized multi-course tasting experience creator.

---

## 🤖 AI Integration & Features

- **Gemini AI Model SDK (`@google/genai`):** Used server-side to generate bespoke sommelier wine pairing notes and culinary suggestions based on flavor profiles.
- **Dynamic Recommender Engine:** Context-aware mood analyzer for instant meal selection.

---

## 🛠️ Technical Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS v4, Motion (`motion/react`)
- **Icons & Graphics:** Lucide React, Custom SVG QR Generator
- **State Management:** React Context + LocalStorage Persistence Engine
- **Build & Deployment System:** Vite, ESBuild, Vercel (`vercel.json`)

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/smart-restaurant-system.git
   cd smart-restaurant-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🏆 Hackathon Judge Tour Guide

The application includes an embedded **"Hackathon Judge Guide"** floating widget in the bottom-right corner, allowing judges to test every key feature in one click:
- **Feature Hints:** Direct shortcuts to AI Sommelier, 3D Studio, QR Billing, and POS Dashboard.
- **PS Levels (1-5):** Interactive verification breakdown of Bronze, Silver, Gold, and Platinum user stories.
- **Tech Stack & Pitch:** One-click copyable pitch summary for quick evaluation.

---

*Submitted with pride by **Team Blue Zone** (G. Sukanya Lakshmi & B. Sirisha) for **VibeAthon 6.0**.*
