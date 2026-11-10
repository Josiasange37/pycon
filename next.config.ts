import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // a stray lockfile in the home folder would otherwise be taken as the workspace root
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
