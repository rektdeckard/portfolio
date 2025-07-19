import { createSignal, type Signal } from "solid-js";

export type StepperProps = {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  class?: string;
  precision?: number;
  id?: string;
  name?: string;
  label?: string;
  onChange?: (value: number) => void;
} & (
    { defaultValue?: number; state?: never }
    | { state: Signal<number>; defaultValue?: never }
  );

export function Stepper(props: StepperProps) {
  const [value, setValue] = props.state ?? createSignal(props.defaultValue || 0);
  const min = props.min || 0;
  const step = props.step ?? 1;
  const precision = props.precision ?? getPrecision(step);

  let inputRef: HTMLInputElement;

  function getPrecision(step: number): number {
    return (step.toString().split(".")[1]?.length ?? 0);
  }

  function scaleByStep(val: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(val * factor) / factor;
  }

  function increment() {
    setValue((prev) => {
      const raw = prev + step;
      const newValue = scaleByStep(raw, precision);
      if (props.max !== undefined && newValue > props.max) return prev;
      props.onChange?.(newValue);
      return newValue;
    });
  }

  function decrement() {
    setValue((prev) => {
      const raw = prev - step;
      const newValue = scaleByStep(raw, precision);
      if (props.min !== undefined && newValue < props.min) return prev;
      props.onChange?.(newValue);
      return newValue;
    });
  }

  function enableDrag(event: PointerEvent) {
    const startX = event.clientX;
    const startValue = value();

    function onPointerMove(e: PointerEvent) {
      const deltaX = e.clientX - startX;
      const deltaValue = (deltaX / 100) * step; // Adjust sensitivity here
      let newValue = scaleByStep(startValue + deltaValue, precision);
      if (props.max !== undefined && newValue > props.max) newValue = props.max;
      if (props.min !== undefined && newValue < props.min) newValue = props.min;
      setValue(newValue);
      props.onChange?.(newValue);
    }

    function onPointerUp() {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  return (
    <div classList={{
      "inline-flex items-center gap-2 font-mono": true,
      [props.class || ""]: !!props.class,
    }}>
      <button
        class="appearance-none outline-1 focus:outline-dashed disabled:bg-warning disabled:text-black disabled:cursor-not-allowed active:text-black active:bg-success"
        onClick={decrement}
        disabled={value() <= min}
      >
        [-]
      </button>
      <input
        ref={(el) => inputRef = el}
        class="outline-1 focus:outline-dashed cursor-ew-resize min-w-16 px-2 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none whitespace-pre bg-[transparent]"
        type="number"
        value={value()}
        min={min}
        max={props.max}
        step={props.step}
        id={props.id}
        name={props.name}
        aria-label={props.label}
        disabled={props.disabled}
        onChange={(event) => {
          const newValue = scaleByStep(event.currentTarget.valueAsNumber, precision);
          setValue(newValue);
          props.onChange?.(newValue);
        }}
        onPointerDown={enableDrag}
      />
      <button
        class="appearance-none focus:outline-1 focus:outline-dashed disabled:bg-warning disabled:text-black disabled:cursor-not-allowed active:text-black active:bg-success"
        onClick={increment}
        disabled={props.disabled || (props.max !== undefined && value() >= props.max)}
      >
        [+]
      </button>
      {props.label && <label for={props.id} class="ps-4 uppercase">{props.label}</label>}
    </div>
  );
}
