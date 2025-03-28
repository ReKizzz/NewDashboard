import { paginateOptions } from "../../constants/config";

export const ownerAccPayload = {
  create: {
    name: "",
  },
  update: {
    name: "",
    date:""
  },
  ownerAccColumns: [
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "date", header: "Date", sortable: true, show: true, width: 200 },
    { field: "action", header: "Action", sortable: false, show: true}
  ],
  ownerAccPaginateParams: {
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
