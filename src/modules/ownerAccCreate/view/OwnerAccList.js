import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { OwnerAccTable } from "../list/OwnerAccTable";

export const OwnerAccList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <OwnerAccTable />
      </div>
    </div>
  );
};
