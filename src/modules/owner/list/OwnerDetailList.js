import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { useNavigate, useParams } from "react-router-dom";
import { ownerService } from "../ownerService";
import { Button } from "primereact/button";
import { endpoints } from "../../../constants/endpoints";
import moment from "moment";

export const OwnerDetailList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [owners, setOwnerList] = useState([]);
  console.log(owners?.[0]?.renter_id);
  const { translate } = useSelector((state) => state.setting);
  const { id } = useParams(); // ✅ proper usage
  const [loading, setLoading] = useState(false);

  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ownerService.show(dispatch, id); // ✅ pass only id
      if (response.status === 200) {
        setOwnerList([response.data]);
      }
    } catch (error) {
      console.error("Error fetching owner data", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div>
      <Card title={translate.owner_detail_list}>
        <DataTable
          className="custom-data-table"
          dataKey="id"
          size="normal"
          value={owners} // ✅ using Redux store data
          loading={loading}
          emptyMessage="No Records."
          scrollable
          scrollHeight="400px"
        >
          <Column
            field="owner_id"
            header="Owner Id"
            style={{ minWidth: "200px" }}
            body={(rowData) => (
              <span
                onClick={() => navigate(`/owner-update/${rowData.id}`)}
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
            field="property"
            header="Property"
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
            field="wifi_id"
            header="Wifi Id"
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
              <Button
                icon="pi pi-pencil"
                className="p-button-warning btn-edit"
                style={{ marginTop: "10px", marginRight: "10px" }}
                onClick={() => navigate(`/owner-update/${rowData.id}`)}
              />
            )}
            style={{ minWidth: "120px" }}
          />
        </DataTable>
      </Card>

      <Card className="mt-4" title={translate.land_detail_list}>
        <DataTable
          className="custom-data-table"
          dataKey="id"
          size="normal"
          value={owners} // ✅ using Redux store data
          loading={loading}
          emptyMessage="No Records."
          scrollable
        >
          <Column
            field="land_id"
            header="Land Title"
            style={{ minWidth: "200px" }}
            body={(rowData) => (
              <span
                onClick={() => navigate(`/owner-update/${rowData.id}`)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {rowData.land_id}
              </span>
            )}
          />
          <Column
            field="issuance_date"
            header="Issuance Date"
            style={{ minWidth: "200px", zIndex: "-1" }}
            body={(rowData) =>
              moment(rowData.issuance_date).format("YYYY-MM-DD")
            }
          />
          <Column
            field="expired"
            header="Expire"
            style={{ minWidth: "200px", zIndex: "-1" }}
            body={(rowData) => moment(rowData.expired).format("YYYY-MM-DD")}
          />
        </DataTable>
      </Card>

      {owners?.[0]?.renter_id && (
        <Card className="mt-4" title={translate.renter_detail_list}>
          <DataTable
            className="custom-data-table"
            dataKey="id"
            size="normal"
            value={owners} // ✅ using Redux store data
            loading={loading}
            emptyMessage="No Records."
            scrollable
          >
            <Column
              field="renter_id"
              header="Renter"
              style={{ minWidth: "200px" }}
              body={(rowData) => (
                <span
                  onClick={() => navigate(`/owner-update/${rowData.id}`)}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {rowData?.renter_id}
                </span>
              )}
            />
            <Column
              field="contract_date"
              header="Start Of Stay"
              style={{ minWidth: "200px" }}
              body={(rowData) => {
                const contracts = rowData.contracts || [];
                if (contracts.length === 0) return null;

                const firstContract = contracts[0];

                return (
                  <div>
                    {moment(firstContract.contract_date).format("YYYY-MM-DD")}
                  </div>
                );
              }}
            />

            <Column
              field="end_of_contract_date"
              header="Contract End"
              style={{ minWidth: "200px" }}
              body={(rowData) => {
                const contracts = rowData.contracts || [];
                if (contracts.length === 0) return null;

                const lastContract = contracts[contracts.length - 1];

                return (
                  <div>
                    {moment(lastContract.end_of_contract_date).format(
                      "YYYY-MM-DD"
                    )}
                  </div>
                );
              }}
            />
            <Column
              header="Length Of Stay"
              style={{ minWidth: "250px" }}
              body={(rowData) => {
                const contracts = rowData.contracts || [];
                if (contracts.length === 0) return null;

                const firstContract = contracts[0];
                const lastContract = contracts[contracts.length - 1];

                let start = moment(firstContract.contract_date);
                const end = moment(lastContract.end_of_contract_date);

                const years = end.diff(start, "years");
                start.add(years, "years");

                const months = end.diff(start, "months");
                start.add(months, "months");

                const days = end.diff(start, "days");

                const parts = [];
                if (years > 0)
                  parts.push(`${years} year${years > 1 ? "s" : ""}`);
                if (months > 0)
                  parts.push(`${months} month${months > 1 ? "s" : ""}`);
                if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

                return <div>{parts.length > 0 ? parts.join(" ") : "-"}</div>;
              }}
            />
          </DataTable>
        </Card>
      )}

      {owners?.[0]?.contracts?.length > 0 && (
        <Card className="mt-4" title={translate.contract_detail_list}>
          <DataTable
            className="custom-data-table"
            dataKey="id"
            size="normal"
            value={owners[0].contracts.map((contract) => ({
              ...contract,
              ownerId: owners[0].id, // if you want to attach more info
            }))}
            loading={loading}
            emptyMessage="No Records."
            scrollable
          >
            <Column
              field="contract_date"
              header="Contract Date"
              style={{ minWidth: "200px" }}
              body={(rowData) => (
                <span
                  onClick={() => navigate(`/owner-update/${owners?.[0].id}`)}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {moment(rowData.contract_date).format("YYYY-MM-DD")}
                </span>
              )}
            />

            <Column
              field="end_of_contract_date"
              header="Contract End Date"
              style={{ minWidth: "200px" }}
              body={(rowData) => (
                <span>
                  {moment(rowData.end_of_contract_date).format("YYYY-MM-DD")}
                </span>
              )}
            />
            <Column
              field="price_per_month"
              header="Price Per Month"
              style={{ minWidth: "200px" }}
            />
            <Column
              field="total_months"
              header="Total Month"
              style={{ minWidth: "200px" }}
            />
            <Column field="notes" header="Note" style={{ minWidth: "200px" }} />

            <Column
              field="photos"
              header="Photo"
              style={{ minWidth: "200px" }}
              body={(rowData) =>
                rowData.photos && rowData.photos.length > 0 ? (
                  <div
                    style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
                  >
                    {rowData.photos.map((photo, index) => {
                      const previewUrl = `${endpoints.image}/${photo}`;
                      return (
                        <img
                          key={index}
                          src={previewUrl}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => window.open(previewUrl, "_blank")}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <span>No Photo</span>
                )
              }
            />
          </DataTable>
        </Card>
      )}
    </div>
  );
};
