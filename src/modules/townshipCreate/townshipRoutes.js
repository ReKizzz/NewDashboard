import { paths } from "../../constants/paths";
import { TownshipList } from "./view/TownshipList";
import TownshipUpdate from "./entry/TownshipUpdate"

export const townshipRoutes = [
    {
        id: "townshipList",
        path: paths.townshipCreate,
        element : <TownshipList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "township List", url: paths.township },
                    // { label: "Create", url: paths.createtownship },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "townshipUpdate",
        path: `/${paths.townshipUpdate}/:id`,
        element : <TownshipUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "township List", url: paths.township },
                    // { label: "Create", url: paths.createtownship },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]