import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { WardTable } from "../list/WardTable";

export const WardList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <WardTable />
      </div>
    </div>
  );
};
