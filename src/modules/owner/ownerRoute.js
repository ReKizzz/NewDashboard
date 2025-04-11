import { paths } from "../../constants/paths";
import { OwnerCreate } from "./entry/OwnerCreate";
import OwnerDetail from "./views/OwnerDetail";
import { OwnerList } from "./views/OwnerList";
import { RenterList } from "./views/RenterList";
import { WifiList } from "./views/WifiList";
import { MeterList } from "./views/MeterList";

export const ownerRoutes = [
  {
    id: "ownerList",
    path: paths.ownerList,
    element: <OwnerList />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "Create", url: paths.ownerCreate }],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "renterListTable",
    path: paths.renterList,
    element: <RenterList />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "Category", url: paths.category }],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "wifiListTable",
    path: paths.wifiList,
    element: <WifiList />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "Category", url: paths.category }],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "meterListTable",
    path: paths.meterList,
    element: <MeterList />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "Category", url: paths.category }],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "ownerCreate",
    path: paths.ownerCreate,
    element: <OwnerCreate />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "List", url: paths.ownerList }],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "ownerDetail",
    path: `/${paths.ownerDetail}/:id`,
    element: <OwnerDetail />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "List", url: paths.ownerList },
          { label: "Create", url: paths.ownerCreate },
        ],
      };
    },
  },
];
