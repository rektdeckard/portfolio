import { createSignal, onMount, onCleanup } from "solid-js";

export interface ActionButtonProps {
  action?: (e: Event) => void;
  disabled?: boolean;
  class?: string;
  id?: string;
  name?: string;
  label: string;
  type?: "button" | "submit" | "reset";
  key?: string | number;
}

export function ActionButton(props: ActionButtonProps) {
  const [keyActive, setKeyActive] = createSignal(false);


  const key = typeof props.key === "number" ? String.fromCharCode(props.key) :
    typeof props.key === "string" ? props.key : null;

  onMount(() => {
    if (!props.key || props.disabled) return;

    const targetKey = (typeof key === "number" ? String.fromCharCode(key) : key!).toLowerCase();

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) && event.key.toLowerCase() === targetKey) {
        setKeyActive(true);
        props.action?.(event);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === targetKey) {
        setKeyActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    });
  });

  const renderLabel = () => {
    if (!key || !props.label.toLowerCase().includes(key.toLowerCase())) {
      return <span>{props.label}</span>;
    }

    const index = props.label.toLowerCase().indexOf(key.toLowerCase());

    return (
      <>
        {props.label.slice(0, index)}
        <u>{props.label[index]}</u>
        {props.label.slice(index + 1)}
      </>
    );
  };

  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type || "button"}
      classList={{
        "appearance-none focus:outline-1 focus:outline-dashed active:bg-primary active:text-surface disabled:bg-warning disabled:text-surface disabled:cursor-not-allowed uppercase font-mono px-1": true,
        "bg-primary text-surface": keyActive(),
        [props.class || ""]: !!props.class,
      }}
      onClick={props.action}
      disabled={props.disabled}
    >
      [{renderLabel()}]
    </button>
  );
}
