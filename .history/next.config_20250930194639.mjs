/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [new URL('http://localhost:5000/uploads/posts/**')],
  },
};

export default nextConfig;
