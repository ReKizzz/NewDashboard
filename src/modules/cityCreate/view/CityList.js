import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { CityTable } from "../list/CityTable";

export const CityList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <CityTable />
      </div>
    </div>
  );
};
