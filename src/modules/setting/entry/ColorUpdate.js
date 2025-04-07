import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../helpers/localstorage";
import { updateColor } from "../settingSlice";
import { keys } from "../../../constants/config";

export const ColorUpdate = () => {
  const dispatch = useDispatch();
  const { translate } = useSelector(state => state.setting);

  // Initial values from localStorage or default fallback
  const [sidebarColor, setSidebarColor] = useState(localStorage.getItem("sidebarColor") || "#2c3e50");
  const [fontColor, setFontColor] = useState(localStorage.getItem("sidebarFontColor") || "#ffffff");
  const [hoverColor, setHoverColor] = useState(localStorage.getItem("sidebarHoverColor") || "#3e5368");

  useEffect(() => {
    const savedSidebarColor = localStorage.getItem("sidebarColor");
    const savedFontColor = localStorage.getItem("sidebarFontColor");
    const savedHoverColor = localStorage.getItem("sidebarHoverColor");

    if (savedSidebarColor) setSidebarColor(savedSidebarColor);
    if (savedFontColor) setFontColor(savedFontColor);
    if (savedHoverColor) setHoverColor(savedHoverColor);
  }, []);

  // Handlers
  const handleSidebarColorChange = (e) => {
    const value = e.target.value;
    setSidebarColor(value);
    setData("sidebarColor", value);
    dispatch(updateColor({ key: "sidebarColor", value }));
  };

  const handleFontColorChange = (e) => {
    const value = e.target.value;
    setFontColor(value);
    setData("sidebarFontColor", value);
    dispatch(updateColor({ key: "sidebarFontColor", value }));
  };

  const handleHoverColorChange = (e) => {
    const value = e.target.value;
    setHoverColor(value);
    setData("sidebarHoverColor", value);
    dispatch(updateColor({ key: "sidebarHoverColor", value }));
  };

  return (
    <div className="flex flex-column gap-3">
      <label htmlFor="sidebarColor" className="text-black font-bold">
        {translate.change_sidebar_color}
      </label>
      <input
        type="color"
        id="sidebarColor"
        value={sidebarColor}
        onChange={handleSidebarColorChange}
        className="w-6rem"
      />

      <label htmlFor="fontColor" className="text-black font-bold">
        {translate.change_font_color}
      </label>
      <input
        type="color"
        id="fontColor"
        value={fontColor}
        onChange={handleFontColorChange}
        className="w-6rem"
      />

      <label htmlFor="hoverColor" className="text-black font-bold">
        {translate.change_hover_color}
      </label>
      <input
        type="color"
        id="hoverColor"
        value={hoverColor}
        onChange={handleHoverColorChange}
        className="w-6rem"
      />
    </div>
  );
};
