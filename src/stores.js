import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/adminSlice";
import userSlice from "./modules/user/userSlice";
import categorySlice from "./modules/category/categorySlice";
import authorizationSlice from "./modules/authorization/authorizationSlice";
import settingSlice from "./modules/setting/settingSlice";
import ownerSlice from "./modules/owner/ownerSlice";
import ownerAccSlice from "./modules/ownerAccCreate/ownerAccSlice";
import cornerSlice from "./modules/cornerCreate/cornerSlice";
import citySlice from "./modules/cityCreate/citySlice";
import townshipSlice from "./modules/townshipCreate/townshipSlice";
import wardSlice from "./modules/wardCreate/wardSlice";
import streetSlice from "./modules/streetCreate/streetSlice";
import wifiSlice from "./modules/wifiCreate/wifiSlice";
import landSlice from "./modules/landCreate/landSlice";
import renterSlice from "./modules/renterCreate/renterSlice";

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    admin: adminSlice,
    user: userSlice,
    category: categorySlice,
    auth: authorizationSlice,
    setting: settingSlice,
    owner: ownerSlice,
    ownerAcc: ownerAccSlice,
    corner: cornerSlice,
    city: citySlice,
    township: townshipSlice,
    ward: wardSlice,
    street: streetSlice,
    wifi: wifiSlice,
    land: landSlice,
    renter: renterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
