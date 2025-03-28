import { paths } from "../../constants/paths";
import { OwnerAccList } from "./view/OwnerAccList";

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
]