/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.imagin.studio", "lh3.googleusercontent.com", "i.ytimg.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
