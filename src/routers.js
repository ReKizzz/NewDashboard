import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { userRoutes } from "./modules/user/userRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { categoryRoutes } from "./modules/category/categoryRoutes";
import { authorizationRoute } from "./modules/authorization/authorizationRoute";
import { settingRoutes } from "./modules/setting/settingRoutes";
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
      ...userRoutes,
      ...adminRoutes,
      ...categoryRoutes,
      ...authorizationRoute,
      ...settingRoutes,
      ...ownerRoutes,
      ...ownerAccRoutes,
      ...cornerRoutes,
      ...cityRoutes,
      ...townshipRoutes,
      ...wardRoutes,
      ...streetRoutes,
      ...wifiRoutes,
      ...landRoutes,
      ...renterRoutes,
    ],
  },
  {
    path: "auth",
    element: <BlankTemplate />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
