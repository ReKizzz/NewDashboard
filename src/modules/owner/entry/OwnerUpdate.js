import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from "../../../constants/config";
import { paths } from "../../../constants/paths";
import { payloadHandler } from "../../../helpers/handler";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { ownerPayload } from "../ownerPayload";
import { userService } from "../../user/userService";
import { ownerService } from "../ownerService";
import { AppEditor } from "../../../shares/AppEditor";
import { InputTextarea } from "primereact/inputtextarea";

export const OwnerUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(ownerPayload.create);
  const [ownerList, setOwnerList] = useState([]);
  const [ownerStatus, setownerStatus] = useState([]);
  const [desc, setDesc] = useState();

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate } = useSelector((state) => state.setting);
  const { owner } = useSelector((state) => state.owner);

  /**
   * Loading user Data
   */
  const loadingUserData = useCallback(async () => {
    setLoading(true);

    const result = await userService.index(dispatch);
    if (result.status === 200) {
      await ownerService.show(dispatch, params.id);
      const formatData = result.data?.map((owner) => {
        return {
          label: owner?.name,
          value: owner?.id,
        };
      });
      setOwnerList(formatData);
    }

    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingUserData();
  }, [loadingUserData]);

  useEffect(() => {
    if (owner) {
      setPayload(owner);
    }
  }, [owner]);

  const submitOwnerUpdate = async () => {
    setLoading(true);

    let updatePayload = { ...payload };
    updatePayload.expired_at = moment(updatePayload.expired_at).format(
      "yy-MM-DD"
    );
    updatePayload.description = desc;

    await ownerService.update(dispatch, params.id, updatePayload);
    setLoading(false);
  };

  return (
    <>
      <div className=" grid">
        <div className=" col-12">
          <Card title={translate.owner_update_list}>
            <Loading loading={loading} />

            <div className=" grid">
              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="owner_id" className="text-black">
                    {translate.owner_id}
                  </label>
                  <InputText
                    name="owner_id"
                    className="p-inputtext-sm"
                    placeholder="Select an owner ID"
                    tooltip="Owner ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.owner_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "owner_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"owner_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="corner_id" className="text-black">
                    {translate.corner_id}
                  </label>
                  <InputText
                    name="corner_id"
                    className="p-inputtext-sm"
                    placeholder="Enter corner ID"
                    tooltip="Corner ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.corner_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "corner_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"corner_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="city_id" className="text-black">
                    {translate.city_id}
                  </label>
                  <InputText
                    name="city_id"
                    className="p-inputtext-sm"
                    placeholder="Enter city ID"
                    tooltip="City ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.city_id || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "city_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"city_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="township_id" className="text-black">
                    {translate.township_id}
                  </label>
                  <InputText
                    name="township_id"
                    className="p-inputtext-sm"
                    placeholder="Enter township ID"
                    tooltip="Township ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.township_id || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "township_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"township_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="ward_id" className="text-black">
                    {translate.ward_id}
                  </label>
                  <InputText
                    name="ward_id"
                    className="p-inputtext-sm"
                    placeholder="Enter ward ID"
                    tooltip="Ward ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.ward_id || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "ward_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"ward_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="street_id" className="text-black">
                    {translate.street_id}
                  </label>
                  <InputText
                    name="street_id"
                    className="p-inputtext-sm"
                    placeholder="Enter street ID"
                    tooltip="Street ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.street_id || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "street_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"street_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="land_no" className="text-black">
                    {translate.land_no}
                  </label>
                  <InputText
                    name="land_no"
                    className="p-inputtext-sm"
                    placeholder="Enter land no"
                    tooltip="Land No"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.land_no || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "land_no",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"land_no"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="house_no" className="text-black">
                    {translate.house_no}
                  </label>
                  <InputText
                    name="house_no"
                    className="p-inputtext-sm"
                    placeholder="Enter house no"
                    tooltip="House No"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.house_no || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "house_no",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"house_no"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="property" className="text-black">
                    {translate.property}
                  </label>
                  <InputText
                    name="property"
                    className="p-inputtext-sm"
                    placeholder="Enter property"
                    tooltip="Property"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.property || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "property",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"property"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="meter_no" className="text-black">
                    {translate.meter_no}
                  </label>
                  <InputText
                    name="meter_no"
                    className="p-inputtext-sm"
                    placeholder="Enter meter no"
                    tooltip="Meter No"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.meter_no || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "meter_no",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"meter_no"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="meter_bill_code" className="text-black">
                    {translate.meter_bill_code}
                  </label>
                  <InputText
                    name="meter_bill_code"
                    className="p-inputtext-sm"
                    placeholder="Enter meter bill code"
                    tooltip="Meter Bill Code"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.meter_bill_code || ""}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "meter_bill_code",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"meter_bill_code"} />
              </div>

              <div className="col-12 flex">
                <div className="col-12 md:col-4 lg:col-4 py-3">
                  <div className="flex flex-column gap-2">
                    <label htmlFor="wifi" className="text-black">
                      {translate.wifi}
                    </label>
                    <InputText
                      name="wifi_id"
                      className="p-inputtext-sm"
                      placeholder="Enter wifi id"
                      tooltip="Wifi"
                      tooltipOptions={{ ...tooltipOptions }}
                      disabled={loading}
                      value={payload.wifi_id || ""}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.target.value,
                          "wifi_id",
                          setPayload
                        )
                      }
                    />
                  </div>
                  <ValidationMessage field={"wifi_id"} />
                </div>

                <div className="col-12 md:col-4 lg:col-4 py-3">
                  <div className="flex flex-column gap-2">
                    <label htmlFor="wifi_user_id" className="text-black">
                      {translate.wifi_user_id}
                    </label>
                    <InputText
                      name="wifi_user_id"
                      className="p-inputtext-sm"
                      placeholder="Enter wifi user id"
                      tooltip="Wifi User Id"
                      tooltipOptions={{ ...tooltipOptions }}
                      disabled={loading}
                      value={payload.wifi_user_id || ""}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.target.value,
                          "wifi_user_id",
                          setPayload
                        )
                      }
                    />
                  </div>
                  <ValidationMessage field={"wifi_user_id"} />
                </div>
              </div>
            </div>
          </Card>
          <Card
            style={{ marginTop: "40px" }}
            title={translate.land_update_list}
          >
            <div className=" grid">
              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="land_id" className="text-black">
                    {translate.land_id}
                  </label>
                  <InputText
                    name="land_id"
                    className="p-inputtext-sm"
                    placeholder="Enter your land ID"
                    tooltip="Land ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.land_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "land_id",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"land_id"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="issuance_date" className="text-black">
                    {translate.issuance_date}
                  </label>
                  <InputText
                    name="issuance_date"
                    className="p-inputtext-sm"
                    placeholder="Enter your issuance date"
                    tooltip="Issuance Date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.issuance_date}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "issuance_date",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"issuance_date"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="expired" className="text-black">
                    {translate.expire}
                  </label>
                  <InputText
                    name="expired"
                    className="p-inputtext-sm"
                    placeholder="Enter your expired"
                    tooltip="Expired Date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.expired}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "expired",
                        setPayload
                      )
                    }
                  />
                </div>
                <ValidationMessage field={"expired"} />
              </div>
            </div>
          </Card>

          {payload.renter_id && (
            <Card
              style={{ marginTop: "40px" }}
              title={translate.renter_update_list}
            >
              <div className=" grid">
                <div className="col-12 md:col-4 lg:col-4 py-3">
                  <div className="flex flex-column gap-2">
                    <label htmlFor="renter_id" className="text-black">
                      {translate.renter_id}
                    </label>
                    <InputText
                      name="renter_id"
                      className="p-inputtext-sm"
                      placeholder="Enter your renter ID"
                      tooltip="Renter ID"
                      tooltipOptions={{ ...tooltipOptions }}
                      disabled={loading}
                      value={payload.renter_id}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.target.value,
                          "renter_id",
                          setPayload
                        )
                      }
                    />
                  </div>
                  <ValidationMessage field={"renter_id"} />
                </div>
              </div>
            </Card>
          )}

          {payload.contracts && payload.renter_id && (
            <Card
              style={{ marginTop: "40px" }}
              title={translate.contract_update_list}
            >
              <div className="grid">
                {payload.contracts.map((contract, index) => (
                  <div
                    key={contract.id}
                    className="col-12 mb-4 border p-3 rounded"
                  >
                    <h5 className="mb-2">Contract {index + 1}</h5>

                    <div className="grid">
                      <div className="col-12 md:col-4 lg:col-4 py-3">
                        <div className="flex flex-column gap-2">
                          <label htmlFor="contract_date" className="text-black">
                            {translate.contract_date}
                          </label>
                          <InputText
                            name="contract_date"
                            className="p-inputtext-sm"
                            placeholder="Enter your contract date"
                            tooltip="Contract Date"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            value={contract.contract_date}
                            onChange={(e) =>
                              payloadHandler(
                                payload,
                                e.target.value,
                                "contract_date",
                                setPayload
                              )
                            }
                          />
                        </div>
                        <ValidationMessage field={"contract_date"} />
                      </div>

                      <div className="col-12 md:col-4 lg:col-4 py-3">
                        <div className="flex flex-column gap-2">
                          <label
                            htmlFor="end_of_contract_date"
                            className="text-black"
                          >
                            {translate.end_of_contract_date}
                          </label>
                          <InputText
                            name="end_of_contract_date"
                            className="p-inputtext-sm"
                            placeholder="Enter your contract end date"
                            tooltip="Contract End Date"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            value={contract.end_of_contract_date}
                            onChange={(e) =>
                              payloadHandler(
                                payload,
                                e.target.value,
                                "end_of_contract_date",
                                setPayload
                              )
                            }
                          />
                        </div>
                        <ValidationMessage field={"end_of_contract_date"} />
                      </div>

                      <div className="col-12 md:col-4 lg:col-4 py-3">
                        <div className="flex flex-column gap-2">
                          <label htmlFor="total_months" className="text-black">
                            {translate.total_months}
                          </label>
                          <InputText
                            name="total_months"
                            className="p-inputtext-sm"
                            placeholder="Enter your total months"
                            tooltip="Total Months"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            value={contract.total_months}
                            onChange={(e) =>
                              payloadHandler(
                                payload,
                                e.target.value,
                                "total_months",
                                setPayload
                              )
                            }
                          />
                        </div>
                        <ValidationMessage field={"total_months"} />
                      </div>

                      <div className="col-12 md:col-4 lg:col-4 py-3">
                        <div className="flex flex-column gap-2">
                          <label
                            htmlFor="price_per_month"
                            className="text-black"
                          >
                            {translate.price_per_month}
                          </label>
                          <InputText
                            name="price_per_month"
                            className="p-inputtext-sm"
                            placeholder="Enter your price per month"
                            tooltip="Price Per Month"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            value={contract.price_per_month}
                            onChange={(e) =>
                              payloadHandler(
                                payload,
                                e.target.value,
                                "price_per_month",
                                setPayload
                              )
                            }
                          />
                        </div>
                        <ValidationMessage field={"price_per_month"} />
                      </div>

                      <div className="col-12 md:col-4 lg:col-4 py-3">
                        <div className="flex flex-column gap-2">
                          <label htmlFor="note" className="text-black">
                            {translate.note}
                          </label>
                          <InputTextarea
                            name="notes"
                            className="p-inputtext-sm"
                            placeholder="Enter your notes"
                            tooltip="Notes"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            value={contract.notes}
                            onChange={(e) =>
                              payloadHandler(
                                payload,
                                e.target.value,
                                "notes",
                                setPayload
                              )
                            }
                          />
                        </div>
                        <ValidationMessage field={"notes"} />
                      </div>

                      <div className="col-12">
                        <div className="col-12 md:col-6 lg:col-6 py-3">
                          <label className="text-black mb-2 block">
                            {translate.image}
                          </label>

                          {/* File input */}
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              const newPhotos = files.map((file) => ({
                                file,
                                preview: URL.createObjectURL(file),
                              }));

                              const existingPhotos =
                                payload.contracts[index].photos || [];
                              const combinedPhotos = [
                                ...existingPhotos,
                                ...newPhotos,
                              ];

                              const updatedContract = {
                                ...payload.contracts[index],
                                photos: combinedPhotos,
                              };

                              const updatedContracts = [...payload.contracts];
                              updatedContracts[index] = updatedContract;

                              setPayload({
                                ...payload,
                                contracts: updatedContracts,
                              });
                            }}
                          />

                          {/* Preview thumbnails with remove option */}
                          {/* Preview thumbnails with remove option */}
                          <div className="flex flex-wrap gap-5 mt-3">
                            {contract.photos?.map((photo, photoIndex) => {
                              const previewUrl =
                                typeof photo === "string"
                                  ? `http://127.0.0.1:8000/storage/${photo}`
                                  : photo.preview;

                              return (
                                <div
                                  key={photoIndex}
                                  className="relative"
                                  style={{ width: "100px", height: "100px" }}
                                >
                                  <img
                                    src={previewUrl}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: "6px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedPhotos =
                                        contract.photos.filter(
                                          (_, i) => i !== photoIndex
                                        );

                                      const updatedContract = {
                                        ...payload.contracts[index],
                                        photos: updatedPhotos,
                                      };

                                      const updatedContracts = [
                                        ...payload.contracts,
                                      ];
                                      updatedContracts[index] = updatedContract;

                                      setPayload({
                                        ...payload,
                                        contracts: updatedContracts,
                                      });
                                    }}
                                    className="absolute top-1 right-1 bg-white text-red-600 rounded-full shadow px-1 py-0 text-xs hover:bg-red-100"
                                  >
                                    ✕
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <FormMainAction
            cancel={translate.cancel}
            onCancel={() => navigate(paths.owner)}
            submit={translate.update}
            onSubmit={submitOwnerUpdate}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};
