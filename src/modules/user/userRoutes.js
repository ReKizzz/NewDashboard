import { paths } from "../../constants/paths";
import { UserList } from "./view/UserList";
import { UserCreate } from "./entry/UserCreate";
import { UserDetail } from "./view/UserDetail";
import { getData } from "../../helpers/localstorage";
import { keys } from "../../constants/config";


export const userRoutes = [
    {
        id : "userList",
        path : paths.user,
        element : <UserList />,
        loader: () => {
            const role = getData(keys.ROLE);
            const permission = getData(keys.PERMISSION);
            return{
                breadcrumbs: [
                    { label: "Create", url: paths.userCreate },
                ],
                role: role,
                permission: permission
            }
        }
    },
    {
        id: "userCreate",
        path: paths.userCreate,
        element : <UserCreate />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "List", url: paths.user },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "userDetail",
        path : paths.userDetail,
        element : <UserDetail />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "List", url: paths.user },
                    { label: "Create", url: paths.userCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]