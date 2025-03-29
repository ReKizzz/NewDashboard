import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPayload } from "../categoryPayload";
import { paths } from "../../../constants/paths";
import { Link } from "react-router-dom";

import moment from "moment";

export const CategoryTable = () => {
  const dispatch = useDispatch();

  const { categoryPaginateParams, categories } = useSelector(
    (state) => state.category
  );
  const { translate } = useSelector((state) => state.setting);
  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const total = useRef(0);
  const first = useRef(0);
  const categoryStatus = useRef(["ALL"]);
  const columns = useRef(categoryPayload.categoryColumns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );


  return (
    <div className="grid">
      <div className="col-12">
        <h1>{translate.main_category_list}</h1>
      </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' h-126 p-3 flex flex-column align-items-center justify-content-center'>
              <div className=' flex align-items-center'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.owner}</h2>
                </div>
              </div>
              <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-user' style={{ fontSize: "3rem" }}></i>
              </div>
            </div>
            <div className="mt-auto h-40 count-view total flex align-items-center justify-content-center">
              <Link to={paths.ownerList} className="text-white cursor-pointer" style={{ textDecoration: "none"}}>
                {translate.owner_list}
              </Link>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' h-126 p-3 flex flex-column align-items-center justify-content-center'>
              <div className=' flex align-items-center'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.renter}</h2>
                </div>
              </div>
              <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-user' style={{ fontSize: "3rem" }}></i>
              </div>
            </div>
            <div className="mt-auto h-40 count-view total flex align-items-center justify-content-center">
              <Link to={paths.ownerList} className="text-white cursor-pointer" style={{ textDecoration: "none"}}>
                {translate.renter_list}
              </Link>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' h-126 p-3 flex flex-column align-items-center justify-content-center'>
              <div className=' flex align-items-center'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.wifi}</h2>
                </div>
              </div>
              <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-wifi' style={{ fontSize: "3rem" }}></i>
              </div>
            </div>
            <div className="mt-auto h-40 count-view total flex align-items-center justify-content-center">
              <Link to={paths.ownerList} className="text-white cursor-pointer" style={{ textDecoration: "none"}}>
                {translate.wifi_list}
              </Link>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' h-126 p-3 flex flex-column align-items-center justify-content-center'>
              <div className=' flex align-items-center'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.meter}</h2>
                </div>
              </div>
              <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-bolt' style={{ fontSize: "3rem" }}></i>
              </div>
            </div>
            <div className="mt-auto h-40 count-view total flex align-items-center justify-content-center">
              <Link to={paths.ownerList} className="text-white cursor-pointer" style={{ textDecoration: "none"}}>
                {translate.meter_list}
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};
