import React, { useState } from "react";
import "./SliderCard.css";

const SliderCard: React.FC<{}> = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(220);

  return (
    <div
      style={{
        borderRadius: 6,
        backgroundColor: "black",
        backgroundImage: `linear-gradient(to right, rgba(84, 98, 176, ${
          +checked && brightness / 255
        }), rgba(188, 138, 244, ${+checked && brightness / 255})`,
      }}
    >
      <div>
        <div
          style={{
            padding: 16,
            color: "white",
            opacity: 0.7,
            userSelect: "none",
          }}
        >
          Living Room Lights
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: 16,
          paddingBottom: 24,
          backgroundColor: "rgba(255, 255, 255, 0.282)",
        }}
      >
        <div className="slidecontainer">
          <input
            className="slide"
            type="range"
            min="0"
            max="255"
            value={brightness}
            onChange={({ target: { value } }) => setBrightness(+value)}
          />
        </div>
        <span className="ui fitted right floated toggle checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked((c) => !c)}
          />
          <label></label>
        </span>
      </div>
    </div>
  );
};

export default SliderCard;
