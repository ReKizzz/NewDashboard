import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { useNavigate, useParams } from "react-router-dom";
import { ownerService } from "../ownerService";
import { show } from "../ownerSlice";

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
          />
          <Column
            field="expired"
            header="Expire"
            style={{ minWidth: "200px", zIndex: "-1" }}
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
                  {rowData.contract_date}
                </span>
              )}
            />
            <Column
              field="end_of_contract_date"
              header="Contract End Date"
              style={{ minWidth: "200px" }}
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
                      const previewUrl = `http://127.0.0.1:8000/storage/${photo}`;
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
