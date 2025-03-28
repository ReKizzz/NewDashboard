import { paths } from "../../constants/paths";
import { CategoryList } from "./view/CategoryList";

export const categoryRoutes = [
    {
        id: "category",
        path: paths.category,
        element : <CategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    // { label: "Dashboard", url: paths.dashboard },
                    // { label: "Category List", url: paths.category },
                    // { label: "Create", url: paths.createCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]