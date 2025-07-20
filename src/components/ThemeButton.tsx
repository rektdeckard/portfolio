import { ActionButton } from "./ActionButton";
import { toggleTheme } from "@utils/theme";

export interface ThemeButtonProps {
  class?: string;
}

export function ThemeButton(props: ThemeButtonProps) {
  return (
    <ActionButton
      label="Change theme"
      class={props.class}
      action={toggleTheme}
      key="t"
    />
  );
}
