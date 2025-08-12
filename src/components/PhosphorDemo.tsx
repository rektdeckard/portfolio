import { createSignal } from "solid-js";
import { Icon } from '@iconify-icon/solid';
import { IconStyle } from "@phosphor-icons/core";
import { Slider } from "./Slider";
import { RadioGroup, type RadioGroupOption } from "./RadioGroup";

const weightOptions: RadioGroupOption[] = [
  { id: "regular", value: "", label: "Regular" },
  { id: "thin", value: `-${IconStyle.THIN}`, label: "Thin" },
  { id: "light", value: `-${IconStyle.LIGHT}`, label: "Light" },
  { id: "bold", value: `-${IconStyle.BOLD}`, label: "Bold" },
  { id: "fill", value: `-${IconStyle.FILL}`, label: "Fill" },
  { id: "duotone", value: `-${IconStyle.DUOTONE}`, label: "Duotone" },
];

const iconList = [
  "house",
  "cursor-click",
  "cherries",
  "radio",
  "sock",
];

export function PhosphorDemo() {
  const sizeState = createSignal(48);
  const weightState = createSignal(weightOptions[0].value);

  return (
    <div class="border border-dashed space-y-4 p-4 bg-surface">
      <div class="flex flex-wrap justify-between items-center gap-4 h-[96px]">
        {iconList.map((icon) => (
          <Icon
            icon={`ph:${icon}${weightState[0]()}`}
            height={sizeState[0]()}
            width={sizeState[0]()}
            style={weightState[0]() || undefined}
          />
        ))}
      </div>
      <RadioGroup name="radio-phosphor-weight" options={weightOptions} state={weightState} label="Weight" />
      <Slider state={sizeState} min={24} max={96} step={2} label="Size" />
    </div>
  );
}
