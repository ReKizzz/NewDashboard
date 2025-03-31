import { paginateOptions } from "../../constants/config";

export const wifiPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
  },
  wifiColumns: [
    { field: "index", header: "No", sortable: false, show: true, width: 100 },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  wifiPaginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "name,date",
    search: "",
    order: "",
    sort: "DESC",
    filter: "",
    value: ""
  }
};
