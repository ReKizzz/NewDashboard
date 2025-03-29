import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { CornerTable } from "../list/CornerTable";

export const CornerList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <CornerTable />
      </div>
    </div>
  );
};
