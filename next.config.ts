import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Cho phép tất cả các đường dẫn hình ảnh từ Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**', // Cho phép tải ảnh đại diện từ Google
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Cho phép tải ảnh fallback từ Unsplash
      },
    ],
  },
};

export default nextConfig;