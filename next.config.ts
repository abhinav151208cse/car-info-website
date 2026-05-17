import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.kia.com" },
      { protocol: "https", hostname: "www.hyundai.com" },
      { protocol: "https", hostname: "www.tatamotors.com" },
      { protocol: "https", hostname: "www.marutisuzuki.com" },
      { protocol: "https", hostname: "www.nexaexperience.com" },
      { protocol: "https", hostname: "www.skoda-auto.co.in" },
      { protocol: "https", hostname: "www.toyota.co.in" },
      { protocol: "https", hostname: "www.renault.co.in" },
      { protocol: "https", hostname: "www.volkswagen.co.in" },
      { protocol: "https", hostname: "www.citroen.in" },
    ],
  },
};

export default nextConfig;
