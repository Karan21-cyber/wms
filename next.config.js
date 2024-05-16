/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["qsxrxkrvawahleigrwoc.supabase.co", "cloudinary.com"],
  },
};

module.exports = nextConfig;
