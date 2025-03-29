import { paths } from "../../constants/paths";
import { StreetList } from "./view/StreetList";
import StreetUpdate from "./entry/StreetUpdate"

export const streetRoutes = [
    {
        id: "streetList",
        path: paths.streetCreate,
        element : <StreetList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "street List", url: paths.street },
                    // { label: "Create", url: paths.createstreet },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "streetUpdate",
        path: `/${paths.streetUpdate}/:id`,
        element : <StreetUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "street List", url: paths.street },
                    // { label: "Create", url: paths.createstreet },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]