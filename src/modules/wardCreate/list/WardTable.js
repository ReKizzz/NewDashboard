import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wardPayload } from "../wardPayload";
import WardCreate from "../entry/WardCreate";
import { wardService } from "../wardService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { paginateOptions } from "../../../constants/config";
import { Column } from "primereact/column";
import { paths } from "../../../constants/paths";
import { Card } from "primereact/card";
import { setPaginate } from "../wardSlice";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

export const WardTable = () => {
  const dispatch = useDispatch();

  const { wardPaginateParams, owners } = useSelector((state) => state.owner);
  console.log(owners, "data");
  const { translate } = useSelector((state) => state.setting);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const total = useRef(0);
  const columns = useRef(wardPayload.wardColumns);
  const showColumns = useRef(columns.current?.filter((col) => col.show === true));

  const onSort = (event) => {
    const sortOrder = event.sortOrder === 1 ? "ASC" : "DESC";
    dispatch(
      setPaginate({
        ...wardPaginateParams,
        sort: sortOrder,
        order: event.sortField,
      })
    );
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await wardService.index(dispatch, wardPaginateParams);
    if (response.status === 200) {
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch, wardPaginateParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this ward?");
    if (confirmation) {
      const response = await wardService.delete(dispatch, id);
      if (response.status === 200) {
        fetchData();
      }
    }
  };

  return (
    <div className="grid">
      <h1 className="col-12">{translate.ward_list}</h1>
      <WardCreate />
      <Card className="col-8">
        <DataTable
          className="custom-data-table"
          dataKey="id"
          size="normal"
          value={owners}
          sortField={wardPaginateParams?.order}
          sortOrder={
            wardPaginateParams?.sort === "DESC"
              ? 1
              : wardPaginateParams?.sort === "ASC"
              ? -1
              : 0
          }
          onSort={onSort}
          lazy={paginateOptions.lazy}
          loading={loading}
          resizableColumns={paginateOptions.resizableColumns}
          emptyMessage="No admin accounts found."
          globalFilterFields={wardPayload.columns}
        >
          {showColumns.current.map((col, index) => {
            return (
              <Column
                key={`admin_col_index_${index}`}
                style={{ minWidth: "250px" }}
                field={col.field}
                header={col.header}
                sortable
                body={(rowData) => {
                  switch (col.field) {
                    case "no":
                      return rowData[col.field];
                    case "name":
                      return rowData[col.field];
                    case "created_at":
                      return rowData[col.field];
                    case "action":
                      return (
                        <div className="flex flex-column col-6">
                          <Button
                            label="Edit"
                            className="p-button-success btn-edit"
                            onClick={() => navigate(`${paths.wardUpdate}/${rowData.id}`)}
                          />
                          <Button
                            label="Delete"
                            className="p-button-danger btn-edit"
                            style={{ marginTop: "10px" }}
                            onClick={() => handleDelete(rowData.id)}
                          />
                        </div>
                      );
                    default:
                      return rowData[col.field];
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
