import { paths } from "../../constants/paths"
import { OwnerCreate } from "./entry/OwnerCreate"
import OwnerDetail from "./views/OwnerDetail"
// import { OwnerDetail } from "./views/OwnerDetail"
import { OwnerList } from "./views/OwnerList"


export const ownerRoutes = [
    {
        id : "ownerList",
        path : paths.ownerList,
        element : <OwnerList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: paths.ownerCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "ownerCreate",
        path: paths.ownerCreate,
        element : <OwnerCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.ownerList },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "ownerDetail",
        path: `/${paths.ownerDetail}/:id`,
        element: <OwnerDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.owner },
                    { label: "Create", url: paths.ownerCreate}
                ]
            }
        }
    }
]