export type UmamiEventData = Record<
  string,
  string | number | boolean | null | undefined
>;

export function track(event: string, data?: UmamiEventData) {
  if (typeof window === "undefined") return;

  try {
    window.umami?.track?.(event, data);
  } catch {
    // no-op: tracking must never break UX
  }
}

