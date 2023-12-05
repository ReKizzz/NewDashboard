import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { promotionRoutes } from "./modules/promotion/promotionRoutes";
import { userRoutes } from "./modules/user/userRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { mainCategoryRoutes } from "./modules/category/mainCategoryRoutes"; 
import { itemRoutes } from "./modules/item/itemRoutes";
import { deliveryRoutes } from "./modules/delivery/deliveryRoutes";
import { mediaRoutes } from "./modules/media/mediaRoute";
import { pointRoutes } from "./modules/point/pointRoutes";
import { orderRoutes } from "./modules/order/orderRoutes";
import { faqRoutes } from "./modules/faq/faqRoutes";
import { regionRoutes } from "./modules/region/regionRoutes";
import { shopRoutes } from "./modules/shop/shopRoutes";
import { categoryRoutes } from "./modules/category/categoryRoute";
import { dashbardRoutes } from "./modules/dashboard/dashboardRoutes";

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
            ...mainCategoryRoutes,
            ...categoryRoutes,
            ...itemRoutes,
            ...deliveryRoutes,
            ...mediaRoutes,
            ...pointRoutes,
            ...orderRoutes,
            ...faqRoutes,
            ...regionRoutes,
            ...shopRoutes
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