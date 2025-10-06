/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [new URL('https://assets.example.com/account123/**')],
  },
};

export default nextConfig;
