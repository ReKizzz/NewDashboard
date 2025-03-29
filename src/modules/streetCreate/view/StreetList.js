import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { StreetTable } from "../list/StreetTable";

export const StreetList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <StreetTable />
      </div>
    </div>
  );
};
