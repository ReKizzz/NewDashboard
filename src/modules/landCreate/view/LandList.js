import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { LandTable } from "../list/LandTable";

export const LandList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <LandTable />
      </div>
    </div>
  );
};
