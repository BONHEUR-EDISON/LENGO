"use client";

import { usePathname, useRouter } from "next/navigation";
import fr from "@/locales/fr/common.json";
import en from "@/locales/en/common.json";

const translations: Record<string, any> = { fr, en };

export function useTranslation() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  const t = (key: string) => translations[locale][key] || key;

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return { t, locale, changeLocale };
}