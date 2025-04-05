import React, { useState } from "react";
import { colors, defaultColor, keys } from "../../../constants/config";
import { Dropdown } from "primereact/dropdown";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { setData } from "../../../helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { updateColor } from "../settingSlice";

export const ColorUpdate = () => {
  const [selectedColor, setColor] = useState(defaultColor);

  const dispatch = useDispatch();
  const { translate } = useSelector(state => state.setting);

  const onChangeColor = (e) => {
    setColor(e);
    setData(keys.COLOR, e);
    dispatch(updateColor(e));
  };

  const selectedColorTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div className="mr-2" style={{ width: "18px", height: "18px", backgroundColor: option.code, borderRadius: "50%" }}></div>
          <div>{option.name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const colorOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div className="mr-2" style={{ width: "18px", height: "18px", backgroundColor: option.code, borderRadius: "50%" }}></div>
        <div>{option.name}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedColor ? (
          <span>
            <b>{selectedColor.name}</b> selected.
          </span>
        ) : (
          "No color selected."
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="color" className="text-black">
        {translate.change_color}
      </label>
      <Dropdown
        value={selectedColor}
        onChange={(e) => onChangeColor(e.value)}
        options={colors}
        optionLabel="name"
        placeholder="Select a Color"
        valueTemplate={selectedColorTemplate}
        itemTemplate={colorOptionTemplate}
        panelFooterTemplate={panelFooterTemplate}
        dropdownIcon={(opts) => {
          return opts.iconProps["data-pr-overlay-visible"] ? (
            <ChevronRightIcon {...opts.iconProps} />
          ) : (
            <ChevronDownIcon {...opts.iconProps} />
          );
        }}
      />
    </div>
  );
};
