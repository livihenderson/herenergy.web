"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { Dictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";

type Ctx = {
  dict: Dictionary;
  lang: Locale;
};

const DictionaryContext = createContext<Ctx | null>(null);

export function DictionaryProvider({
  dict,
  lang,
  children,
}: {
  dict: Dictionary;
  lang: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<Ctx>(() => ({ dict, lang }), [dict, lang]);
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDictionary must be used inside DictionaryProvider");
  }
  const { dict, lang } = ctx;
  const t = useCallback((key: string) => dict[key] ?? key, [dict]);
  return { t, lang };
}
