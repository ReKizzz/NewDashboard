import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { streetPayload } from "../streetPayload";
import StreetCreate from "../entry/StreetCreate";
import { streetService } from "../streetService";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { paginateOptions } from "../../../constants/config";
import { Column } from "primereact/column";
import { paths } from "../../../constants/paths";
import { Card } from "primereact/card";
import { setPaginate } from "../streetSlice";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

export const StreetTable = () => {
  const dispatch = useDispatch();

  const { streetPaginateParams, owners } = useSelector((state) => state.owner);
  console.log(owners, "data");
  const { translate } = useSelector((state) => state.setting);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const total = useRef(0);
  const columns = useRef(streetPayload.streetColumns);
  const showColumns = useRef(columns.current?.filter((col) => col.show === true));

  const onSort = (event) => {
    const sortOrder = event.sortOrder === 1 ? "ASC" : "DESC";
    dispatch(
      setPaginate({
        ...streetPaginateParams,
        sort: sortOrder,
        order: event.sortField,
      })
    );
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await streetService.index(dispatch, streetPaginateParams);
    if (response.status === 200) {
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch, streetPaginateParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this street?");
    if (confirmation) {
      const response = await streetService.delete(dispatch, id);
      if (response.status === 200) {
        fetchData();
      }
    }
  };

  return (
    <div className="grid">
      <h1 className="col-12">{translate.street_list}</h1>
      <StreetCreate />
      <Card className="col-8">
        <DataTable
          className="custom-data-table"
          dataKey="id"
          size="normal"
          value={owners}
          sortField={streetPaginateParams?.order}
          sortOrder={
            streetPaginateParams?.sort === "DESC"
              ? 1
              : streetPaginateParams?.sort === "ASC"
              ? -1
              : 0
          }
          onSort={onSort}
          lazy={paginateOptions.lazy}
          loading={loading}
          resizableColumns={paginateOptions.resizableColumns}
          emptyMessage="No admin accounts found."
          globalFilterFields={streetPayload.columns}
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
                            onClick={() => navigate(`${paths.streetUpdate}/${rowData.id}`)}
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
