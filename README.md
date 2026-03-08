# 💰 Personal Finance Snapshot

[![Vercel Deployment](https://img.shields.io/badge/Vercel-View_Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://personalfinancesnapshot.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/A-Simie/PFS)
[![License: MIT](https://img.shields.io/badge/License-MIT-f1c40f?style=for-the-badge)](https://opensource.org/licenses/MIT)

A premium, visual-first personal finance tracker designed to help users master their money with style and clarity.

---

## 📸 Preview

![App Dashboard](./public/README_assets/dashboard.png)

---

## 🚀 Overview

Personal Finance Snapshot is more than just a ledger. It's a high-end financial dashboard built with a focus on **Visual Hierarchy**, **Thoughtful UX**, and **Small Delights**. It allows users to track income, manage budgets across multiple categories, and visualize their financial health through interactive charts and real-time notifications.

---

## ✨ Core Features

### 📊 Meaningful Visualization
- **Dynamic Dashboard**: Instantly see your Income, Expenses, Net Balance, and Savings Rate.
- **Interactive Charts**: Compare Income vs. Expenses over time with smooth, responsive visualizations.
- **Budget Tracking**: Visual progress bars that change state (color/animation) when nearing or exceeding limits.

### 📝 Thoughtful Transaction Management
- **Smooth CRUD**: Adding, editing, and deleting transactions is seamless, with real-time fly-out notifications providing instant feedback.
- **Smart Filtering**: Filter by category or transaction type to find exactly what you're looking for.
- **Premium Animations**: Table rows use staggered entry animations and layout persistence for a fluid, jitter-free experience.

### 🛠️ Basic Budgeting
- Set monthly limits for categories like Food, Transport, and Entertainment.
- Get visual cues on your spending health relative to your goals.

### 🧭 Interactive Onboarding
- A custom 4-step interactive tour for new users that spotlights key features and explains the app's value proposition.
- Finished with a celebration (confetti!) to delight the user upon completion.

---

## 💻 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/A-Simie/PFS.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
   npm run dev
   ```

---

## 🎨 Design Thinking & Choices

Since no mockups were provided, I made intentional choices to create a **state-of-the-art "FinTech" feel**:

- **Premium Dark Mode**: Used a tailored HSL palette (`#10221b` background) to reduce eye strain and provide a sophisticated backdrop for financial data.
- **Glassmorphism**: Leveraged `backdrop-blur` and semi-transparent surfaces to create depth and a modern, high-end look.
- **Typography**: Chose `Inter` for its exceptional legibility in data-heavy interfaces.
- **Visual Hierarchy**: Crucial numbers (Net Balance) are prioritized with larger font weights and vibrant primary colors, while secondary meta-data uses muted tones to reduce noise.

---

## ⚡ Technical Stack

- **Frontend**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: 100% Client-side (LocalStorage)

---

## 📁 Project Structure

```text
src/
├── app/          # App entry and global providers
├── components/   # Atomic & Layout components (UI, Auth, Charts)
├── constants/    # Category config and theme tokens
├── data/         # Default mock data
├── features/     # Feature-specific logic (Transactions, Budgets)
├── hooks/        # Custom React hooks
├── pages/        # Route-level components
├── schemas/      # Validation & Type definitions
├── services/     # API/Store interactions
├── store/        # Context API State Management
├── styles/       # Global CSS & Tailwind config
└── utils/        # Business logic helpers (Formatting, Totals)
```

---

## 🧠 Challenges & Solutions

### 1. The "Clipping" Problem
During development, the notification panel was initially clipped by the sticky header. 
- **Solution**: I refactored the architecture to render the Notification Panel at the Root level using a global state in `NotificationContext`, ensuring it takes full viewport height regardless of nested positioning.

### 2. Layout Persistence
Standard list animations often feel "jumpy" when items are filtered or added.
- **Solution**: Used the `layout` prop from Framer Motion on table rows to ensure they animate smoothly to their new positions without breaking the visual flow.

---

## ⏱️ Development Time

This project was completed within approximately **2 days** of work.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Contributor

**Simie Adeb** - [@A-Simie](https://github.com/A-Simie)

Project Link: [https://github.com/A-Simie/PFS](https://github.com/A-Simie/PFS)
