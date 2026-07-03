/** @type {import('next').NextConfig} */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '';

const nextConfig = {
  output: 'export',
  outputFileTracingRoot: import.meta.dirname,
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  env: {
    FORM_EMAIL: process.env.FORM_EMAIL,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
