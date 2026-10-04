/** @type {import('next').NextConfig} */

// BASE_PATH is injected by the GitHub Actions workflow.
// - User site  (repo: <name>.github.io)  -> BASE_PATH is empty
// - Project site (repo: anything else)   -> BASE_PATH = /<repo-name>
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
