/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    swcMinify: true,
  },
  optimizePackageImports: [
    "quill",
    "quill-cursors",
    "stripe",
    "react-stripe-js",
    "@stripe/stripe-js",
    "@stripe/react-stripe-js",
    "react-quill",
    "react-quilljs",
    "react-quilljs-editor",
    "react-quilljs-viewer",
    "react-quilljs-lite",
    "react-quilljs-lite-editor",
    "react-quilljs-lite-viewer",
  ],
  images: {
    domains: ["qsxrxkrvawahleigrwoc.supabase.co", "cloudinary.com"],
  },
};

export default nextConfig;
