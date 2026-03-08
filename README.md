# 💰 Personal Finance Snapshot

A premium, visual-first personal finance tracker designed to help users master their money with style and clarity.

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

## 🎨 Design Thinking & Choices

Since no mockups were provided, I made intentional choices to create a **state-of-the-art "FinTech" feel**:

- **Premium Dark Mode**: Used a tailored HSL palette (`#10221b` background) to reduce eye strain and provide a sophisticated backdrop for financial data.
- **Glassmorphism**: Leveraged `backdrop-blur` and semi-transparent surfaces to create depth and a modern, high-end look.
- **Typography**: Chose `Inter` for its exceptional legibility in data-heavy interfaces.
- **Visual Hierarchy**: Crucial numbers (Net Balance) are prioritized with larger font weights and vibrant primary colors, while secondary meta-data uses muted tones to reduce noise.

---

## ⚡ Technical Stack

- **Frontend**: React 18 + TypeScript (Strict Mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Tailored design system)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Persistence**: 100% Client-side (LocalStorage)
- **State Management**: React Context API + Custom Hooks

---

## 🧠 Challenges & Solutions

### 1. The "Clipping" Problem
During development, the notification panel was initially clipped by the sticky header. 
- **Solution**: I refactored the architecture to render the Notification Panel at the Root level using a global state in `NotificationContext`, ensuring it takes full viewport height regardless of nested positioning.

### 2. Layout Persistence
Standard list animations often feel "jumpy" when items are filtered or added.
- **Solution**: Used the `layout` prop from Framer Motion on table rows to ensure they animate smoothly to their new positions without breaking the visual flow.

---

## 🔮 What’s Next? (Future Improvements)

If given more time, I would:
1. **Bank Syncing**: Integrate Plaid or similar APIs for real-time bank feeds.
2. **Data Export**: Allow users to download their financial snapshots as PDF or CSV.
3. **Smart Analytics**: Add AI-driven insights to predict overspending based on trends.
4. **Multi-Currency Support**: For global financial tracking.

---

## ⏱️ Development Time
This project was completed within approximately **2 days** of work.

---

### 📝 Notes
- **Persistence**: All data (Transactions, Budgets, Notifications, Auth) is persisted in `localStorage`.
- **Authenticity**: Every design choice, animation, and UX touch was crafted to feel like a production-ready premium product.
