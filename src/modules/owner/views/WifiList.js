import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { WifiTableView } from "../list/WifiTableView";

export const WifiList = () => {
  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <WifiTableView />
      </div>
    </div>
  );
};
