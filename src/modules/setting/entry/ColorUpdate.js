import React, { useState } from "react";
import { colors, defaultColor, keys } from "../../../constants/config";
import { setData } from "../../../helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { updateColor } from "../settingSlice";

export const ColorUpdate = () => {
  const [selectedColor, setColor] = useState(defaultColor);

  const dispatch = useDispatch();
  const { translate } = useSelector((state) => state.setting);

  const onChangeColor = (colorObj) => {
    setColor(colorObj);
    setData(keys.COLOR, colorObj);
    dispatch(updateColor(colorObj));
  };

  const handleColorInputChange = (e) => {
    const pickedColor = e.target.value;
    const matchedColor = colors.find(
      (c) => c.code.toLowerCase() === pickedColor.toLowerCase()
    );

    if (matchedColor) {
      onChangeColor(matchedColor);
    } else {
      onChangeColor({ name: "Custom", code: pickedColor });
    }
  };

  return (
    <div className="flex flex-column gap-3">
      <label htmlFor="colorPicker" className="text-black">
        {translate.change_color}
      </label>

      {/* Color dropdown for predefined colors */}
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.code}
            style={{
              backgroundColor: color.code,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border:
                selectedColor.code === color.code
                  ? "2px solid #000"
                  : "1px solid #ccc",
              cursor: "pointer",
            }}
            title={color.name}
            onClick={() => onChangeColor(color)}
          />
        ))}
      </div>

      {/* Color input for custom colors */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="color"
          id="colorPicker"
          value={selectedColor.code}
          onChange={handleColorInputChange}
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            background: "none",
          }}
        />
        <span className="text-sm">{selectedColor.name}</span>
      </div>
    </div>
  );
};
