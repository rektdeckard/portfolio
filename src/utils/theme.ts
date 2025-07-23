import { onCleanup } from "solid-js";

export const THEME_STORAGE_KEY = "tf_theme";

export const THEMES = ["paper", "console"] as const;
export type Theme = (typeof THEMES)[number];

export function initializeTheme() {
  if (typeof window === "undefined") return;
  const theme =
    (localStorage.getItem(THEME_STORAGE_KEY) as Theme) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "console"
      : "paper");
  applyTheme(theme);
}

export function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function toggleTheme() {
  const currentTheme =
    localStorage.getItem(THEME_STORAGE_KEY) || ("paper" as Theme);
  const nextTheme =
    THEMES[(THEMES.indexOf(currentTheme as Theme) + 1) % THEMES.length];
  applyTheme(nextTheme);
}

export function onThemeChange(callback: (theme: Theme) => void) {
  if (typeof window === "undefined") return;
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        const newTheme = document.documentElement.dataset.theme as Theme;
        callback(newTheme);
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });
  onCleanup(() => observer.disconnect());
}
