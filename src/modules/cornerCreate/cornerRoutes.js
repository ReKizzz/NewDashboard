import { paths } from "../../constants/paths";
import { CornerList } from "./view/CornerList";
import CornerUpdate from "./entry/CornerUpdate"

export const cornerRoutes = [
    {
        id: "cornerList",
        path: paths.cornerCreate,
        element : <CornerList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "corner List", url: paths.corner },
                    // { label: "Create", url: paths.createcorner },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "cornerUpdate",
        path: `/${paths.cornerUpdate}/:id`,
        element : <CornerUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "corner List", url: paths.corner },
                    // { label: "Create", url: paths.createcorner },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]