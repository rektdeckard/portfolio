import { useState, UIEvent } from "react";
import {
  RocketLaunch,
  GameController,
  GlobeHemisphereWest,
  PencilLine,
  IconContext,
} from "@phosphor-icons/react";
import Select from "react-dropdown-select";

import "./IconPalette.css";

type Weight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
type WeightOption = { key: string; value: Weight; icon: JSX.Element };

const options: WeightOption[] = [
  {
    key: "Thin",
    value: "thin",
    icon: <PencilLine size={24} weight="thin" />,
  },
  {
    key: "Light",
    value: "light",
    icon: <PencilLine size={24} weight="light" />,
  },
  {
    key: "Regular",
    value: "regular",
    icon: <PencilLine size={24} weight="regular" />,
  },
  {
    key: "Bold",
    value: "bold",
    icon: <PencilLine size={24} weight="bold" />,
  },
  {
    key: "Fill",
    value: "fill",
    icon: <PencilLine size={24} weight="fill" />,
  },
  {
    key: "Duotone",
    value: "duotone",
    icon: <PencilLine size={24} weight="duotone" />,
  },
];

const IconPalette = () => {
  const [size, setSize] = useState<number>(64);
  const [weight, setWeight] = useState<Weight>("light");

  const handleStyleChange = (values: WeightOption[]) =>
    setWeight(values[0].value as Weight);

  const handleFocus = (event: UIEvent<HTMLInputElement>) => {
    event.currentTarget.focus();
  };

  const handleBlur = (event: UIEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  return (
    <div className="icon-palette">
      <div className="icons">
        <IconContext.Provider
          // value={{ size, color: "white", weight, mirrored: false }}
          // value={{ size, color: "#FFD171", weight, mirrored: false }} // Yellow
          // value={{ size, color: "#A8FF60", weight, mirrored: false }} // Green
          // value={{ size, color: "#96CBFE", weight, mirrored: false }} // Blue
          // value={{ size, color: "#C6C5FE", weight, mirrored: false }} // Lavender
          value={{ size, color: "#c4e456", weight, mirrored: false }} // Acid
          // value={{ size, color: "#FF73FD", weight, mirrored: false }} // Magenta
        >
          <RocketLaunch />
          <GameController />
          <GlobeHemisphereWest />
        </IconContext.Provider>
      </div>
      <div className="icon-controls">
        <div style={{ flex: 1 }}>
          <Select
            options={options}
            values={[options[1]]}
            searchable={false}
            labelField="key"
            onChange={handleStyleChange}
            itemRenderer={({
              item,
              itemIndex,
              state: { cursor, values },
              methods,
            }) => (
              <span
                role="option"
                aria-selected={item.key === values[0].key}
                className={`react-dropdown-select-item ${
                  itemIndex === cursor
                    ? "react-dropdown-select-item-active"
                    : ""
                }`}
                onClick={() => methods.addItem(item)}
              >
                {item.icon}
                {item.key}
              </span>
            )}
            contentRenderer={({ state: { values } }) => (
              <div className="react-dropdown-select-content">
                {values[0].icon}
                {values[0].key}
              </div>
            )}
          />
        </div>
        <div className="size-bar">
          <label htmlFor="size-input">{`${size}px`}</label>
          <input
            id="size-input"
            name="size-input"
            value={size}
            type="range"
            min={16}
            max={96}
            onChange={({ target: { value } }) => setSize(+value)}
            onTouchStart={handleFocus}
            onTouchEnd={handleBlur}
            onMouseUp={handleBlur}
            step={4}
          />
        </div>
      </div>
    </div>
  );
};

export default IconPalette;
