import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { RenterTable } from "../list/RenterTable";

export const RenterList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <RenterTable />
      </div>
    </div>
  );
};
