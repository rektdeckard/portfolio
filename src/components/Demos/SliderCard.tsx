import { useState } from "react";
import "./SliderCard.css";

const SliderCard = () => {
  const [powerState, setPowerState] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(220);
  const alpha = +powerState && brightness / 255;

  return (
    <div
      className="slider-card"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(84, 98, 176, ${alpha}), rgba(188, 138, 244, ${alpha})`,
      }}
    >
      <div className="slide-header">Living Room Lights</div>
      <div className="slide-body">
        <div className="slide-container">
          <input
            className="slide"
            type="range"
            min="0"
            max="255"
            value={brightness}
            onChange={({ target: { value } }) => setBrightness(+value)}
          />
        </div>
        <span className="ui toggle checkbox">
          <input
            type="checkbox"
            checked={powerState}
            onChange={() => setPowerState((c) => !c)}
          />
          <label></label>
        </span>
      </div>
    </div>
  );
};

export default SliderCard;
