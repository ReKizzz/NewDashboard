import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { TownshipTable } from "../list/TownshipTable";

export const TownshipList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <TownshipTable />
      </div>
    </div>
  );
};
