import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { MeterTableView } from "../list/MeterTableView";

export const MeterList = () => {
  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <MeterTableView />
      </div>
    </div>
  );
};
