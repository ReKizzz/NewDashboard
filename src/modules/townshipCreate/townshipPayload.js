import { paginateOptions } from "../../constants/config";

export const townshipPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
  },
  townshipColumns: [
    { field: "index", header: "No", sortable: false, show: true, width: 100 },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  townshipPaginateParams: {
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
