import moment from "moment";
import { paginateOptions } from "../../constants/config";

export const userPayload = {
  update: {
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "",
    role_names: "",
  },
  store: {
    name: "",
    email: "",
    phone: "",
    password: "",
    role_names: "",
    status: "",
  },
  columns: [

    {
      field: "name",
      header: "Full Name",
      sortable: true,
      show: true,
      with: "250px",
    },

    {
      field: "email",
      header: "Email",
      sortable: true,
      show: true,
      with: "250px",
    },
    {
      field: "phone",
      header: "Phone",
      sortable: true,
      show: true,
      with: "250px",
    },
    {
      field: "role",
      header: "Role",
      sortable: true,
      show: true,
      with: "250px",
    },

    { field: "status", header: "Status", show: true },
  ],
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,name,email,phone",
    search: "",
    order: "id",
    sort: "DESC",
  },
};
