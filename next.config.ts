import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old product slugs → new slugs
      { source: "/products/polo-navy",  destination: "/products/ocaso-navy-polo",      permanent: true },
      { source: "/products/polo-olive", destination: "/products/olivo-polo",            permanent: true },
      { source: "/products/shirt-white", destination: "/products/sevilla-blanc-oxford", permanent: true },
      { source: "/products/shirt-sage",  destination: "/products/riviera-sage-linen",   permanent: true },
    ];
  },
};

export default nextConfig;
