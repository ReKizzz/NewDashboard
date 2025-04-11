import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { RenterTableView } from "../list/RenterTableView";

export const RenterList = () => {
  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <RenterTableView />
      </div>
    </div>
  );
};
