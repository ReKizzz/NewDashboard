import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { promotionRoutes } from "./modules/promotion/promotionRoutes";
import { userRoutes } from "./modules/user/userRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { deliveryRoutes } from "./modules/delivery/deliveryRoutes";
import { mediaRoutes } from "./modules/media/mediaRoute";
import { orderRoutes } from "./modules/order/orderRoutes";
import { categoryRoutes } from "./modules/category/categoryRoutes";
import { dashbardRoutes } from "./modules/dashboard/dashboardRoutes";
import { authorizationRoute } from "./modules/authorization/authorizationRoute";
import { settingRoutes } from "./modules/setting/settingRoutes";
import { discountRoutes } from "./modules/discount/discountRoutes";
import { memberOrderRoutes } from "./modules/memberOrder/memberOrderRoute";
import { countryRoutes } from "./modules/country/countryRoutes";
import { regionAndStateRoutes } from "./modules/regionAndState/regionAndStateRoutes";
import { ownerRoutes } from "./modules/owner/ownerRoute";
import { ownerAccRoutes } from "./modules/ownerAccCreate/ownerAccRoutes";
import { cornerRoutes } from "./modules/cornerCreate/cornerRoutes";
import { cityRoutes } from "./modules/cityCreate/cityRoutes";
import { townshipRoutes } from "./modules/townshipCreate/townshipRoutes";
import { wardRoutes } from "./modules/wardCreate/wardRoutes";
import { streetRoutes } from "./modules/streetCreate/streetRoutes";
import { wifiRoutes } from "./modules/wifiCreate/wifiRoutes";
import { landRoutes } from "./modules/landCreate/landRoutes";
import { renterRoutes } from "./modules/renterCreate/renterRoutes";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            ...dashbardRoutes,
            ...promotionRoutes,
            ...userRoutes,
            ...adminRoutes,
            ...categoryRoutes,
            ...deliveryRoutes,
            ...mediaRoutes,
            ...orderRoutes,
            ...discountRoutes,
            ...memberOrderRoutes,
            ...authorizationRoute,
            ...settingRoutes,
            ...countryRoutes,
            ...regionAndStateRoutes,
            ...ownerRoutes,
            ...ownerAccRoutes,
            ...cornerRoutes,
            ...cityRoutes,
            ...townshipRoutes,
            ...wardRoutes,
            ...streetRoutes,
            ...wifiRoutes,
            ...landRoutes,
            ...renterRoutes
        ]
    },
    {
        path: "auth",
        element: <BlankTemplate />,
        errorElement: <NotFound />,
        children: [
            {
                path: "login",
                element: <Login />
            }
        ]
    }
])