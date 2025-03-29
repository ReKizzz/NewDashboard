import { paths } from "../../constants/paths";
import { WardList } from "./view/WardList";
import WardUpdate from "./entry/WardUpdate"

export const wardRoutes = [
    {
        id: "wardList",
        path: paths.wardCreate,
        element : <WardList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "ward List", url: paths.ward },
                    // { label: "Create", url: paths.createward },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "wardUpdate",
        path: `/${paths.wardUpdate}/:id`,
        element : <WardUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "ward List", url: paths.ward },
                    // { label: "Create", url: paths.createward },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]