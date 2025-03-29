import { configureStore } from "@reduxjs/toolkit";
import promotionSlice from "./modules/promotion/promotionSlice";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/adminSlice";
import userSlice from "./modules/user/userSlice";
import categorySlice from "./modules/category/categorySlice";
import deliverySlice from "./modules/delivery/deliverySlice";
import mediaSlice from "./modules/media/mediaSlice";
import orderSlice from "./modules/order/orderSlice";
import dashboardSlice from "./modules/dashboard/dashboardSlice";
import authorizationSlice from "./modules/authorization/authorizationSlice";
import settingSlice from "./modules/setting/settingSlice";
import discountSlice from "./modules/discount/discountSlice";
import memberOrderSlice from "./modules/memberOrder/memberOrderSlice";
import countrySlice from "./modules/country/countrySlice";
import regionAndStateSlice from "./modules/regionAndState/regionAndStateSlice";
import ownerSlice from "./modules/owner/ownerSlice";
import ownerAccSlice from "./modules/ownerAccCreate/ownerAccSlice";
import cornerSlice from "./modules/cornerCreate/cornerSlice";
import citySlice from "./modules/cityCreate/citySlice";
import townshipSlice from "./modules/townshipCreate/townshipSlice";
import wardSlice from "./modules/wardCreate/wardSlice";
import streetSlice from "./modules/streetCreate/streetSlice";
import wifiSlice from "./modules/wifiCreate/wifiSlice";
import landSlice from "./modules/landCreate/landSlice";
import renterSlice from "./modules/renterCreate/renterSlice"

export const stores = configureStore({
   reducer: {
    promotion: promotionSlice,
    share: shareSlice,
    admin: adminSlice,
    user: userSlice,
    category: categorySlice,
    delivery: deliverySlice,
    media: mediaSlice,
    order: orderSlice,
    dashboard: dashboardSlice,
    auth : authorizationSlice,
    setting: settingSlice,
    discount: discountSlice,
    memberOrder: memberOrderSlice,
    country: countrySlice,
    regionAndState: regionAndStateSlice,
    owner: ownerSlice,
    ownerAcc: ownerAccSlice,
    corner: cornerSlice,
    city: citySlice,
    township: townshipSlice,
    ward: wardSlice,
    street: streetSlice,
    wifi: wifiSlice,
    land: landSlice,
    renter: renterSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })

})