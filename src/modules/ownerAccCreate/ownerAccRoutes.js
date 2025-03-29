import { paths } from "../../constants/paths";
import { OwnerAccList } from "./view/OwnerAccList";
import OwnerAccUpdate from "./entry/OwnerAccUpdate"

export const ownerAccRoutes = [
    {
        id: "ownerAccList",
        path: paths.ownerAccCreate,
        element : <OwnerAccList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "ownerAcc List", url: paths.ownerAcc },
                    // { label: "Create", url: paths.createownerAcc },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "ownerAccUpdate",
        path: `/${paths.ownerAccUpdate}/:id`,
        element : <OwnerAccUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "ownerAcc List", url: paths.ownerAcc },
                    // { label: "Create", url: paths.createownerAcc },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]