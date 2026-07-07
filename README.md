# 🏨 My Hotel - Next.js Booking Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-121212?style=for-the-badge&logo=nextdotjs&logoColor=green)

**My Hotel** is a modern, responsive, and fully-featured hotel booking web application built with the latest web technologies. It provides users with a seamless experience to browse luxury cabins, manage their bookings, and update their personal profiles.

## ✨ Key Features

- **🛡️ Secure Authentication**: Integrated with `NextAuth.js` for secure user sessions and login management.
- **🏡 Cabin Browsing & Booking**: Explore beautiful cabins, view details, and make reservations seamlessly.
- **👤 User Dashboard**: A dedicated `/account` layout for users to manage their profiles and track their reservation history.
- **📝 Interactive Profile Management**: Update personal details (National ID, Nationality, Country Flag) via a polished, responsive Modal interface.
- **🎨 Premium UI/UX**: Designed with `Tailwind CSS` focusing on modern aesthetics, beautiful spacing, and interactive micro-animations (spinners, hover effects, toast notifications).
- **🚀 Server-Side Rendering (SSR)**: Leveraging Next.js App Router for optimal performance and SEO.

## 💻 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Icons & UI**: Heroicons, Custom SVG SVGs, and Native Next.js Image Optimization

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nguyenxuanthanh09122005-commits/My-hotel.git
   cd My-hotel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the necessary environment variables:
   ```env
   # API Endpoint
   NEXT_PUBLIC_API_URL=http://your-backend-api-url.com

   # NextAuth Settings
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_super_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: Contains all Next.js App Router pages (`/cabins`, `/account`, etc.) and global layouts.
- `/app/components`: Reusable UI components (Modals, Buttons, SideNavigation).
- `/app/lib`: Helper functions and API fetch logic (`account.ts`, `cabin.ts`).
- `/app/types`: TypeScript interfaces and type definitions ensuring type safety across the app.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/nguyenxuanthanh09122005-commits/My-hotel/issues).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
