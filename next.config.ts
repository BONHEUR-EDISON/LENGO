import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["fr", "en"], // langues supportées
    defaultLocale: "fr",   // langue par défaut
  },
};

export default nextConfig;
