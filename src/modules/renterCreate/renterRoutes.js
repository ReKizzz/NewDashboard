import { paths } from "../../constants/paths";
import { RenterList } from "./view/RenterList";
import RenterUpdate from "./entry/RenterUpdate"

export const renterRoutes = [
    {
        id: "renterList",
        path: paths.renterCreate,
        element : <RenterList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "renter List", url: paths.renter },
                    // { label: "Create", url: paths.createrenter },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "renterUpdate",
        path: `/${paths.renterUpdate}/:id`,
        element : <RenterUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "renter List", url: paths.renter },
                    // { label: "Create", url: paths.createrenter },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]