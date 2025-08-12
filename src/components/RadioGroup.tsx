import { createSignal, type Signal } from "solid-js";

export type RadioGroupProps = {
  label?: string;
  options: RadioGroupOption[];
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  class?: string;
  onChange?: (value: string) => void;
} & (
    { defaultValue?: string; state?: never }
    | { state: Signal<string>; defaultValue?: never }
  );

export interface RadioGroupOption {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
}

export function RadioGroup(props: RadioGroupProps) {
  const [value, setValue] = props.state ?? createSignal(props.defaultValue || "");

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
    props.onChange?.(target.value);
  };

  return (
    <div class="flex items-start gap-2">
      {props.label && <label class="pe-4 uppercase">{props.label}</label>}
      <div classList={{
        "flex gap-2": true,
        [props.class || '']: !!props.class,
      }}>
        {props.options.map((option) => {
          const checked = value() === option.value;
          return (
            <div class="relative">
              <label
                tabIndex={0}
                for={option.id}
                classList={{
                  "inline-flex items-center justify-between active:bg-primary active:text-surface disabled:bg-warning disabled:text-surface disabled:cursor-not-allowed uppercase font-mono px-1 cursor-pointer select-none": true,
                  "text-surface bg-primary": checked,
                  "pointer-events-none text-surface bg-warning": props.disabled || option.disabled,
                }}>
                [{option.label}]
              </label>
              <input
                type="radio"
                name={props.name}
                id={option.id}
                value={option.value}
                checked={checked}
                disabled={option.disabled || props.disabled}
                class="absolute inset-0 pointer-events-none peer invisible focus:outline-1 focus:outline-dashed"
                onChange={handleChange}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};
