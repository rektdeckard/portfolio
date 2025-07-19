import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Signal,
} from "solid-js";

export type Primitive = string | number | boolean;

function parsePrimitive<T extends Primitive>(
  value: string | null,
  ty: string,
): T | null {
  if (value === null || value === undefined) return null;

  switch (ty) {
    case "string":
      return value as T;
    case "number":
      const parsedNumber = Number(value);
      return isNaN(parsedNumber) ? null : (parsedNumber as T);
    case "boolean":
      if (value === "true") return true as T;
      if (value === "false") return false as T;
      return null;
    default:
      return null;
  }
}

export function useStateParam<T extends Primitive>(
  key: string,
  fallback: T,
): Signal<T> {
  const [value, setValue] = createSignal(fallback);
  const ty = typeof fallback;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const valueAsString = params.get(key);
    if (valueAsString === null) return;
    setValue(() => parsePrimitive<T>(valueAsString, ty) ?? fallback);
  });

  createEffect<boolean>((isInitial) => {
    const v = value();
    // Don't store the fallback value in the URL
    if (isInitial) return false;

    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.set(key, v.toString());
      window.history.replaceState({}, "", url.toString());
    }, 100);

    onCleanup(() => clearTimeout(timeout));

    return false;
  }, true);

  return [value, setValue] as const;
}
