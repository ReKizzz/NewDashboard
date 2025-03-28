import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ownerAccPayload } from "../ownerAccPayload";
import OwnerAccCreate from "../entry/OwnerAccCreate";
import { FormMainAction } from "../../../shares/FormMainAction";

import { ownerAccService } from "../ownerAccService";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { Column } from "primereact/column";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { Avatar } from "primereact/avatar";
import { NavigateId } from "../../../shares/NavigateId";
import { endpoints } from "../../../constants/endpoints";
import { AuditColumn } from "../../../shares/AuditColumn";
import { setPaginate } from "../ownerAccSlice";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import { getRequest } from "../../../helpers/api";
import { Link } from "react-router-dom";

import moment from "moment";
import { Card } from "primereact/card";

export const OwnerAccTable = () => {
  const dispatch = useDispatch();

  const { ownerAccPaginateParams, owners } = useSelector(
    (state) => state.owner
  );
  const { translate } = useSelector((state) => state.setting);
  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const total = useRef(0);
  const first = useRef(0);
  const ownerAccStatus = useRef(["ALL"]);
  const columns = useRef(ownerAccPayload.ownerAccColumns);
  const showColumns = useRef(
    columns.current?.filter((col) => col.show === true)
  );

  const onSort = (event) => {
      const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
      dispatch(
        setPaginate({
          ...ownerAccPaginateParams,
          sort: sortOrder,
          order: event.sortField,
        })
      );
    };


  return (
    <div className="grid">
      <h1 className="col-12">{translate.owner_acc_list}</h1>
      <OwnerAccCreate/>
      <Card className="col-8">
        <DataTable
                dataKey="id"
                size="normal"
                value={owners}
                sortField={ownerAccPaginateParams?.order}
                sortOrder={
                  ownerAccPaginateParams?.sort === "DESC"
                    ? 1
                    : ownerAccPaginateParams?.sort === "ASC"
                      ? -1
                      : 0
                }
                onSort={onSort}
                lazy={paginateOptions.lazy}
                loading={loading}
                resizableColumns={paginateOptions.resizableColumns}
                emptyMessage="No admin accounts found."
                globalFilterFields={ownerAccPayload.columns}
              >
                {showColumns.current.map((col, index) => {
                  return (
                    <Column
                      key={`admin_col_index_${index}`}
                      style={{ minWidth: "250px" }}
                      field={col.field}
                      header={col.header}
                      sortable
                      body={(value) => {
                        switch (col.field) {
                          case "id":
                            return (
                              <NavigateId
                                url={`${paths.admin}/${value[col.field]}`}
                                value={value[col.field]}
                              />
                            );
                          case "status":
                            return <Status status={value[col.field]} />;
                          default:
                            return value[col.field];
                        }
                      }}
                    />
                  );
                })}
              </DataTable>
      </Card>
      
    </div>
  );
};
