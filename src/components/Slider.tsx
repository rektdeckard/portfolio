import { createEffect, createSignal, onCleanup, onMount, type Signal } from "solid-js";

export type SliderProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  class?: string;
  precision?: number;
  id?: string;
  name?: string;
  label?: string;
  onInput?: (value: number) => void;
  onChange?: (value: number) => void;
} & (
    { defaultValue?: number; state?: never }
    | { state: Signal<number>; defaultValue?: never }
  )

export function Slider(props: SliderProps) {
  const [value, setValue] = props.state ?? createSignal(props.defaultValue || 0);
  const [resizes, resize] = createSignal();

  const min = props.min || 0;
  const step = props.step ?? 1;
  const precision = props.precision ?? getPrecision(step);
  const trackRef: { current?: HTMLInputElement } = {};

  function getPrecision(step: number): number {
    return (step.toString().split(".")[1]?.length ?? 0);
  }

  function scaleByStep(val: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(val * factor) / factor;
  }

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let newValue = parseFloat(target.value);
    if (isNaN(newValue)) newValue = min;
    newValue = scaleByStep(newValue, precision);
    if (props.max !== undefined && newValue > props.max) newValue = props.max;
    if (newValue < min) newValue = min;
    setValue(newValue);
    props.onInput?.(newValue);
  }

  createEffect(() => {
    if (!props.onChange) return;
    const currentValue = value();
    props.onChange(currentValue);
  });

  // Position the label above the thumb
  const thumbPosition = () => {
    const _ = resizes();
    const el = trackRef.current;
    if (!el) return 0;
    const percent = (value() - min) / ((props.max ?? 100) - min);
    return (el.clientWidth - 36) * percent;
  }
  onMount(() => {
    window.addEventListener("resize", resize);
    onCleanup(() => window.removeEventListener("resize", resize));
  })

  return (
    <div classList={{ "flex items-center font-mono focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-dashed": true, [props.class || ""]: !!props.class }}>
      {props.label && <label for={props.id} class="pe-4 uppercase">{props.label}</label>}
      <div classList={{
        "relative grow h-6": true,
        "cursor-not-allowed text-warning": props.disabled,
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute w-full h-full pointer-events-none"
        >
          <defs>
            <pattern id="vertical-lines" patternUnits="userSpaceOnUse" width="10" height="24">
              <rect x="3" y="2" width="1" height="20" fill="currentcolor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vertical-lines)" />
        </svg>

        <div
          classList={{
            "absolute top-0 bottom-0 bg-primary text-surface w-12 pointer-events-none flex items-center justify-center leading-none": true,
            "cursor-not-allowed bg-warning text-surface": props.disabled,
          }}
          style={{
            left: `calc(${thumbPosition()}px)`,
          }}
        >
          <span>{value().toFixed(precision)}</span>
        </div>

        <input
          ref={(el) => (trackRef.current = el)}
          class="outline-none w-full h-full z-10 bg-transparent accent-current disabled:cursor-not-allowed"
          type="range"
          value={value()}
          min={min}
          max={props.max}
          step={step}
          onInput={onInput}
          disabled={props.disabled}
          id={props.id}
          name={props.name}
          aria-label={props.label}
        />
      </div>
    </div>
  );
}
