import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { WifiTable } from "../list/WifiTable";

export const WifiList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <WifiTable />
      </div>
    </div>
  );
};
