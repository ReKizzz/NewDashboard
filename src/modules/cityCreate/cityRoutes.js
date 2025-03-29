import { paths } from "../../constants/paths";
import { CityList } from "./view/CityList";
import CityUpdate from "./entry/CityUpdate"

export const cityRoutes = [
    {
        id: "cityList",
        path: paths.cityCreate,
        element : <CityList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "city List", url: paths.city },
                    // { label: "Create", url: paths.createcity },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "cityUpdate",
        path: `/${paths.cityUpdate}/:id`,
        element : <CityUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "city List", url: paths.city },
                    // { label: "Create", url: paths.createcity },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]