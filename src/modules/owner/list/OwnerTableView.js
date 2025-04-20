import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { paths } from "../../../constants/paths";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { ownerPayload } from "../ownerPayload";
import { setPaginate } from "../ownerSlice";
import { ownerService } from "../ownerService";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const OwnerTableView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { owners, paginateParams } = useSelector((state) => state.owner);
  const { translate } = useSelector((state) => state.setting);

  const [loading, setLoading] = useState(false);
  // const [showAuditColumn, setShowAuditColumn] = useState(false);
  const columns = useRef(ownerPayload.columns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const first = useRef(0);
  const total = useRef(0);
  // const ownerStatus = useRef(['ALL']);

  /**
   * Event - Paginate Page Change
   * @param {*} event
   */
  const onPageChange = (event) => {
    first.current = event.page * paginateParams.per_page;
    dispatch(
      setPaginate({
        ...paginateParams,
        page: event?.page + 1,
        per_page: event?.rows,
      })
    );
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      try {
        await ownerService.delete(dispatch, id);
        await loadingData();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  /**
   * Event - Column sorting "DESC | ASC"
   * @param {*} event
   */
  const onSort = (event) => {
    const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
    dispatch(
      setPaginate({
        ...paginateParams,
        sort: sortOrder,
        order: event.sortField,
      })
    );
  };

  /**
   * Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);
    const response = await ownerService.index(dispatch, paginateParams);
    if (response.status === 200) {
      total.current = response.data.total
        ? response.data.total
        : response.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Card title={translate.owner_list}>
      <DataTable
        className="custom-data-table"
        dataKey="id"
        size="normal"
        value={owners}
        sortField={paginateParams.order}
        sortOrder={
          paginateParams.sort === "DESC"
            ? 1
            : paginateParams.sort === "ASC"
            ? -1
            : 0
        }
        onSort={onSort}
        loading={loading}
        emptyMessage="No Records."
        globalFilterFields={ownerPayload.columns}
        sortMode={paginateOptions.sortMode}
        scrollable
        scrollHeight="400px"
      >
        <Column
          header="#"
          body={(rowData, options) => options.rowIndex + 1}
          style={{ minWidth: "50px", textAlign: "center" }}
        />
        <Column
          field="owner_id"
          header="Owner Id"
          style={{ minWidth: "200px" }}
          frozen
          className="font-bold"
          body={(rowData) => (
            <span
              onClick={() => navigate(`/owner-detail/${rowData.id}`)}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {rowData.owner_id}
            </span>
          )}
        />

        <Column
          field="property"
          header="Property"
          style={{ minWidth: "200px" }}
          frozen
          className="font-bold"
        />
        <Column
          field="status"
          header="Status"
          style={{ minWidth: "200px" }}
          frozen
          className="font-bold"
        />
        <Column
          field="corner_id"
          header="Corner Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="city_id"
          header="City Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="township_id"
          header="Township Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="ward_id"
          header="Ward Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="street_id"
          header="Street Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="wifi_id"
          header="Wifi Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="land_no"
          header="Land No"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="house_no"
          header="House No"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="meter_no"
          header="Meter No"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="meter_bill_code"
          header="Meter Bill Code"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          field="wifi_user_id"
          header="Wifi User Id"
          style={{ minWidth: "200px", zIndex: "-1" }}
        />
        <Column
          header="Actions"
          body={(rowData) => (
            <>
              <Button
                icon="pi pi-pencil"
                className="p-button-warning btn-edit"
                style={{ marginTop: "10px", marginRight: "10px" }}
                onClick={() => navigate(`/owner-update/${rowData.id}`)}
              />
              <Button
              icon="pi pi-trash"
              className="p-button-danger btn-edit"
              style={{ marginTop: "10px" }}
              onClick={() => handleDelete(rowData.id)}
            />
          </>
          )}
          style={{ minWidth: "120px" }}
        />
      </DataTable>

      <Paginator
        first={first.current}
        rows={paginateParams.per_page}
        totalRecords={total?.current ? total.current : 0}
        rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
        template={
          "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        }
        currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
        onPageChange={onPageChange}
      />
    </Card>
  );
};
