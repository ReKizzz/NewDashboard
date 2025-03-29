import { paginateOptions } from "../../constants/config";

export const renterPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
    date:""
  },
  renterColumns: [
    { field: "id", header: "No", sortable: true, show: true },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "created_at", header: "Date", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  renterPaginateParams: {
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
