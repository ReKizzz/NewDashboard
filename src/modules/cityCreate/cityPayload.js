import { paginateOptions } from "../../constants/config";

export const cityPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
    date:""
  },
  cityColumns: [
    { field: "id", header: "No", sortable: true, show: true },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "created_at", header: "Date", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  cityPaginateParams: {
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
