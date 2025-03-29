import { paginateOptions } from "../../constants/config";

export const streetPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
    date:""
  },
  streetColumns: [
    { field: "id", header: "No", sortable: true, show: true },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "created_at", header: "Date", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  streetPaginateParams: {
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
