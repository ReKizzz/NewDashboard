import { paths } from "../../constants/paths";
import { LandList } from "./view/LandList";
import LandUpdate from "./entry/LandUpdate"

export const landRoutes = [
    {
        id: "landList",
        path: paths.landCreate,
        element : <LandList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "land List", url: paths.land },
                    // { label: "Create", url: paths.createland },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "landUpdate",
        path: `/${paths.landUpdate}/:id`,
        element : <LandUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "land List", url: paths.land },
                    // { label: "Create", url: paths.createland },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]