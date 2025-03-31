import { paginateOptions } from "../../constants/config";

export const wardPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
  },
  wardColumns: [
    { field: "index", header: "No", sortable: false, show: true, width: 100 },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  wardPaginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "name",
    search: "",
    order: "",
    sort: "DESC",
    filter: "",
    value: ""
  }
};
