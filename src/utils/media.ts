export const colorSchemeQuery = window.matchMedia(
  "(prefers-color-scheme: dark)",
);

export function isDarkMode() {
  return colorSchemeQuery.matches;
}

export function onColorSchemeChange(callback: (isDark: boolean) => void) {
  function handleChange(event: MediaQueryListEvent) {
    callback(event.matches);
  }
  colorSchemeQuery.addEventListener("change", handleChange);
  return function cleanup() {
    colorSchemeQuery.removeEventListener("change", handleChange);
  };
}
