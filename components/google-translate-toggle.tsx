"use client";

import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          element: string
        ) => unknown;
      };
    };
  }
}

const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length < 2) return null;
  return parts.pop()!.split(";").shift() ?? null;
}

function setGoogTransCookie(value: string) {
  // Example values:
  // - "/en/uk" (translate EN -> UA)
  // - "/en/en" (reset)
  // IMPORTANT: keep raw `/en/uk` format (Google reads it as-is).
  document.cookie = `googtrans=${value}; path=/`;
  // Extra attempt for broader compatibility across subdomains/hosts.
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
}

function ensureGoogleTranslateScript() {
  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export function GoogleTranslateToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isUkrainian = useMemo(() => {
    if (!mounted) return false;
    const v = getCookie("googtrans") || "";
    return decodeURIComponent(v).toLowerCase().includes("/uk");
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    window.googleTranslateElementInit = () => {
      try {
        if (!window.google?.translate?.TranslateElement) return;
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          GOOGLE_TRANSLATE_ELEMENT_ID
        );
      } catch {
        // no-op: keep the site functional even if the widget fails
      }
    };

    // In dev (React strict mode), effects can run twice; this guard prevents duplicates.
    ensureGoogleTranslateScript();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div id={GOOGLE_TRANSLATE_ELEMENT_ID} className="google-translate-root" />

      <button
        type="button"
        className="google-translate-fab"
        onClick={() => {
          setGoogTransCookie(isUkrainian ? "/en/en" : "/en/uk");
          window.location.reload();
        }}
        aria-label={isUkrainian ? "Switch language to English" : "Translate to Ukrainian"}
      >
        {isUkrainian ? "EN" : "UA"}
      </button>
    </>
  );
}

