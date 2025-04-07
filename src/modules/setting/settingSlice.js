import { createSlice } from "@reduxjs/toolkit";
import { defaultLanguage } from "../../constants/config";
import { defaultColor } from "../../constants/config";
import en from "../../assets/i18n/en.json";
import mm from "../../assets/i18n/mm.json";
import cn from "../../assets/i18n/cn.json";
import white from "../../assets/i18n/color.json"

// Get default language
const getDefaultLanguage = defaultLanguage.code?.toLowerCase();

// Set initial CSS variable for sidebar color
const getDefaultColor = defaultColor.code;

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        language: defaultLanguage,
        translate: getDefaultLanguage === "mm"
            ? mm
            : getDefaultLanguage === "uk"
            ? en
            : getDefaultLanguage === "cn"
            ? cn
            : mm,
        sidebarColor: localStorage.getItem("sidebarColor") || "#2c3e50",
        sidebarFontColor: localStorage.getItem("sidebarFontColor") || "#ffffff",
        sidebarHoverColor: localStorage.getItem("sidebarHoverColor") || "#3e5368",
    },
    reducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
            const selectedLanguage = action.payload.code.toLowerCase();

            if (selectedLanguage === 'mm') {
                state.translate = mm;
            } else if (selectedLanguage === 'uk') {
                state.translate = en;
            } else if (selectedLanguage === 'cn') {
                state.translate = cn;
            }
        },
        updateColor: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value;
        }
    }
});

export const { updateLanguage, updateColor } = settingSlice.actions;
export default settingSlice.reducer;
