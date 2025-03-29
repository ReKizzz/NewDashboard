import { paths } from "../../constants/paths";
import { WifiList } from "./view/WifiList";
import WifiUpdate from "./entry/WifiUpdate"

export const wifiRoutes = [
    {
        id: "wifiList",
        path: paths.wifiCreate,
        element : <WifiList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "wifi List", url: paths.wifi },
                    // { label: "Create", url: paths.createwifi },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "wifiUpdate",
        path: `/${paths.wifiUpdate}/:id`,
        element : <WifiUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "wifi List", url: paths.wifi },
                    // { label: "Create", url: paths.createwifi },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]