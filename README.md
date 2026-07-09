<h1 align="center">🏨 My Hotel - Next-Gen Booking Platform</h1>

<div align="center">
  A modern, high-performance hotel booking web application built with <strong>Next.js (App Router)</strong>, focusing on <strong>Clean Architecture, Type Safety, and Premium UI/UX.</strong><br/><br/>
  
  <a href="#-why-this-project-stands-out-for-engineering-teams">Why this stands out</a> • 
  <a href="#-tech-stack">Tech Stack</a> • 
  <a href="#-architecture--folder-structure">Architecture</a> • 
  <a href="#-getting-started">Getting Started</a>
</div>

---

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/NextAuth-121212?style=for-the-badge&logo=nextdotjs&logoColor=green" alt="NextAuth" />
  <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
</div>

## 📌 Project Overview
**My Hotel** is not just a booking site; it's a showcase of modern web development practices. It aims to solve real-world hospitality business needs by providing a seamless, fast, and secure reservation experience. From dynamic cabin exploration to secure account management, every feature is built with scalability and user experience in mind.

## 🌟 Why This Project Stands Out (For Engineering Teams)
If you're reviewing this repository, here is a quick summary of the technical decisions and best practices implemented:
- **Next.js App Router Leverage**: Utilized SSR (Server-Side Rendering) for SEO-heavy pages (like cabin lists) and CSR (Client-Side Rendering) for highly interactive UI components (Modals, filters, stateful forms).
- **Advanced Middleware Integration**: Implemented Next.js Edge Middleware (`middleware.ts`) for robust route protection, ensuring unauthorized users are gracefully redirected before the page even begins to render on the server.
- **Strict Type Safety**: Fully typed with `TypeScript`, including complex API responses, props, and internal state, virtually eliminating runtime `undefined` errors.
- **Modern State Management**: Utilized **Zustand** for lightweight, predictable global state management instead of heavy context providers or prop-drilling.
- **Optimized UI/UX**: Built a premium design system with **Tailwind CSS**. Used `AOS` for subtle scroll animations, custom SVG icons, and Next.js Image components for blazing fast LCP (Largest Contentful Paint) and Core Web Vitals optimization.

## 🚀 Key Features
- **🛡️ Secure Authentication**: Full integration with `NextAuth.js` handling secure user sessions and route protection.
- **🏡 Dynamic Cabin Browsing**: Explore luxury cabins with detailed descriptions, pricing calculations, and availability statuses.
- **📅 Advanced Booking System**: Integrated date pickers (`react-datepicker`, `date-fns`, `dayjs`) for intuitive check-in/check-out selection and validation.
- **👤 User Dashboard**: A protected `/account` layout where users can view booking history, update profiles (Nationality, National ID), and manage account settings.
- **🔔 Interactive Feedback**: Real-time toast notifications (`react-hot-toast`) for API mutations, form submissions, and error handling.

## 💻 Tech Stack
- **Core Framework**: Next.js (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS, PostCSS.
- **State Management**: Zustand.
- **Date Handling**: `date-fns`, `dayjs`.
- **Authentication**: NextAuth.js.
- **Animations/UI Tools**: AOS (Animate on Scroll), React Hot Toast.

## 🏗 Architecture & Folder Structure
Following a feature-first and clean architecture approach:
```text
/app
 ├── (page)/          # Route groups for logical separation (account, cabins, explore)
 │    ├── account/    # Protected user dashboard routes
 │    └── cabins/     # Public dynamic routing for cabin details
 ├── components/      # Reusable, atomic UI components (Buttons, Modals, Cards)
 ├── lib/             # API services, helper utilities, and fetch logic
 ├── types/           # Global TypeScript definitions & interfaces
 └── middleware.ts    # Edge middleware for authentication & routing logic
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn / pnpm

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/nguyenxuanthanh09122005-commits/My-hotel.git
   cd My-hotel
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://your-backend-api-url.com
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_a_strong_secret_key_here
   ```
4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧠 Future Roadmap
- [ ] Integration with a headless CMS (e.g., Sanity or Strapi) for dynamic content management by hotel staff.
- [ ] E2E Testing using Cypress or Playwright to ensure critical user journeys.
- [ ] Stripe Payment Gateway integration for real deposit processing.

## 📩 Contact
**Nguyen Xuan Thanh**  
Feel free to reach out if you want to discuss this project or potential opportunities!
- GitHub: [@nguyenxuanthanh09122005-commits](https://github.com/nguyenxuanthanh09122005-commits)

---
*If you like this project or find it helpful, please consider giving it a ⭐!*
