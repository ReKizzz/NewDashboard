import { configureStore } from "@reduxjs/toolkit";
import promotionSlice from "./modules/promotion/promotionSlice";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/adminSlice";

export const stores = configureStore({
   reducer: {
    promotion: promotionSlice,
    share: shareSlice,
    admin: adminSlice
   }
})