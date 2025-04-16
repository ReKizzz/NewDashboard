import React, { useCallback, useEffect, useState, useRef } from "react";
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
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { ownerPayload } from "../ownerPayload";
import { userService } from "../../user/userService";
import { ownerService } from "../ownerService";
import { ownerAccService } from "../../ownerAccCreate/ownerAccService";
import { cornerService } from "../../cornerCreate/cornerService";
import { cityService } from "../../cityCreate/cityService";
import { townshipService } from "../../townshipCreate/townshipService";
import { wardService } from "../../wardCreate/wardService";
import { streetService } from "../../streetCreate/streetService";
import { landService } from "../../landCreate/landService";
import { wifiService } from "../../wifiCreate/wifiService";
import { renterService } from "../../renterCreate/renterService";
import { AppEditor } from "../../../shares/AppEditor";
import { InputTextarea } from "primereact/inputtextarea";

export const OwnerUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(ownerPayload.update);
  console.log(payload);
  const [ownerList, setOwnerList] = useState([]);
  console.log(ownerList);
  const [ownerAcc, setOwnerAccList] = useState([]);
  const [cornerList, setCornerList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [townshipList, setTownshipList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [streetList, setStreetList] = useState([]);
  const [landList, setLandList] = useState([]);
  const [wifiList, setWifiList] = useState([]);
  const [renterList, setRenterList] = useState([]);
  const [desc, setDesc] = useState();
  const total = useRef(0);
  const [selectedOption, setSelectedOption] = useState("-");

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate } = useSelector((state) => state.setting);
  const { owner } = useSelector((state) => state.owner);
  const [contracts, setContracts] = useState([
    {
      contract_date: null,
      end_of_contract_date: null,
      total_months: "",
      price_per_month: "",
      note: "",
      photos: [],
      newPhotos: [],
    },
  ]);

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedContracts = [...contracts];
    updatedContracts[index].photos = [
      ...updatedContracts[index].photos,
      ...files,
    ];
    updatedContracts[index].newPhotos = [
      ...updatedContracts[index].newPhotos,
      ...newPhotos,
    ];
    setContracts(updatedContracts);
  };

  const handleRemovePhoto = (contractIndex, photoIndex) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIndex].photos.splice(photoIndex, 1);
    updatedContracts[contractIndex].newPhotos.splice(photoIndex, 1);
    setContracts(updatedContracts);
  };
  /**
   * Loading user Data
   */
  const loadingUserData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await ownerService.show2(dispatch, params.id);
      const formatData =
        result.data?.map((owner) => ({
          label: owner?.name,
          value: owner?.id,
        })) || [];

      setOwnerList(formatData);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingUserData();
  }, [loadingUserData]);

  useEffect(() => {
    if (owner) {
      setPayload(owner);
    }
  }, [owner]);

  const fetchOptions = useCallback(
    async (service, setList) => {
      setLoading(true);
      const response = await service.index(dispatch);
      if (response.status === 200) {
        setList(
          response.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
        total.current = response.data.total || response.data.length;
      }
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    fetchOptions(ownerAccService, setOwnerAccList);
    fetchOptions(cornerService, setCornerList);
    fetchOptions(cityService, setCityList);
    fetchOptions(townshipService, setTownshipList);
    fetchOptions(wardService, setWardList);
    fetchOptions(streetService, setStreetList);
    fetchOptions(landService, setLandList);
    fetchOptions(wifiService, setWifiList);
    fetchOptions(renterService, setRenterList);
  }, [fetchOptions]);

  const handleAddContract = () => {
    setContracts([
      ...contracts,
      {
        contract_date: null,
        end_of_contract_date: null,
        total_months: "",
        price_per_month: "",
        note: "",
        photos: [],
        newPhotos: [],
      },
    ]);
  };

  const handleRemoveContract = (index) => {
    const updatedContracts = contracts.filter(
      (_, contractIndex) => contractIndex !== index
    );
    setContracts(updatedContracts);
  };

  const updateContractField = (index, field, value) => {
    const updatedContracts = [...contracts];
    updatedContracts[index][field] = value;
    setContracts(updatedContracts);
  };

  const submitOwnerUpdate = async () => {
    setLoading(true);

    try {
      const updatePayload = {
        ...payload,
        expired_at: payload.expired_at
          ? moment(payload.expired_at).format("YYYY-MM-DD")
          : null,
        description: desc,
        contracts: contracts.map((contract) => ({
          contract_date: contract.contract_date
            ? moment(contract.contract_date).format("YYYY-MM-DD")
            : null,
          end_of_contract_date: contract.end_of_contract_date
            ? moment(contract.end_of_contract_date).format("YYYY-MM-DD")
            : null,
          total_months: contract.total_months,
          price_per_month: contract.price_per_month,
          note: contract.note,
          photos: contract.photos, // Handle file uploads separately if needed
        })),
      };

      await ownerService.update(dispatch, params.id, updatePayload);

      // You can add a success UI change here (e.g. toast, redirect, etc.)
      console.log("Owner update successful");
    } catch (error) {
      console.error("Failed to update owner:", error);
      // You can add an error notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" grid">
        <div className=" col-12">
          <Card title={translate.owner_update_list}>
            <Loading loading={loading} />

            <div className=" grid">
              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="owner" className="input-label">
                  {translate.owner} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="owner"
                    autoComplete="owner name"
                    name="owner"
                    filter
                    value={payload.owner_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "owner_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={ownerAcc}
                    placeholder="Select an owner"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="owner_id" />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="corner" className="input-label">
                  {translate.corner} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="corner"
                    autoComplete="corner"
                    name="corner"
                    filter
                    value={payload.corner_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "corner_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={cornerList}
                    placeholder="Select a corner"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="corner_id" />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="city" className="input-label">
                  {translate.city} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="city"
                    autoComplete="city"
                    name="city"
                    filter
                    value={payload.city_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "city_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={cityList}
                    placeholder="Select a city"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="city_id" />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="township" className="input-label">
                  {translate.township} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="township"
                    autoComplete="township"
                    name="township"
                    filter
                    value={payload.township_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "township_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={townshipList}
                    placeholder="Select a township"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="township_id" />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="ward" className="input-label">
                  {translate.ward} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="ward"
                    autoComplete="ward"
                    name="ward"
                    filter
                    value={payload.ward_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "ward_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={wardList}
                    placeholder="Select a ward"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="ward_id" />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="street" className="input-label">
                  {translate.street} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="street"
                    autoComplete="street"
                    name="street_id"
                    filter
                    value={payload.street_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value, // in case target is not available
                        "street_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={streetList}
                    placeholder="Select a street"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="street_id" />
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="land_no" className=" text-black">
                    {translate.land} (required*)
                  </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="land_no"
                    name="land_no"
                    autoComplete="land_no"
                    aria-describedby="land_no-help"
                    tooltip="land_no"
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder="Enter your land number"
                    disabled={loading}
                    value={payload.land_no}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "land_no",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                  <ValidationMessage field={"land_no"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="house_no" className=" text-black">
                    {translate.house_no} (required*)
                  </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="house_no"
                    name="house_no"
                    autoComplete="house_no"
                    aria-describedby="house_no-help"
                    tooltip="house_no"
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder="Enter your house number"
                    disabled={loading}
                    value={payload.house_no}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "house_no",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                  <ValidationMessage field={"house_no"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="property" className=" text-black">
                    {translate.property} (required*)
                  </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="property"
                    name="property"
                    autoComplete="property"
                    aria-describedby="property-help"
                    tooltip="property"
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder="Vacant / Home / Shop"
                    disabled={loading}
                    value={payload.property}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "property",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                  <ValidationMessage field={"property"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="meter_no" className=" text-black">
                    {translate.meter_no} (required*)
                  </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="meter_no"
                    name="meter_no"
                    autoComplete="meter_no"
                    aria-describedby="meter_no-help"
                    tooltip="meter_no"
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder="Enter your meter no"
                    disabled={loading}
                    value={payload.meter_no}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "meter_no",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                  <ValidationMessage field={"meter_no"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="meter_bill_code" className=" text-black">
                    {translate.meter_bill_code} (required*)
                  </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="meter_bill_code"
                    name="meter_bill_code"
                    autoComplete="meter_bill_code"
                    aria-describedby="meter_bill_code-help"
                    tooltip="meter_bill_code"
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder="Enter your meter bill code"
                    disabled={loading}
                    value={payload.meter_bill_code}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "meter_bill_code",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                  <ValidationMessage field={"meter_bill_code"} />
                </div>
              </div>

              <div className="flex col-12">
                <div className="col-12 md:col-4 lg:col-4 py-3">
                  <label htmlFor="wifi" className="input-label">
                    {translate.wifi} (required*){" "}
                  </label>
                  <div className="p-inputgroup mt-2">
                    <Dropdown
                      inputId="wifi"
                      autoComplete="wifi"
                      name="wifi"
                      filter
                      value={payload.wifi_id}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.value,
                          "wifi_id",
                          (updateValue) => {
                            setPayload(updateValue);
                          }
                        )
                      }
                      options={wifiList}
                      placeholder="Select a wifi"
                      disabled={loading}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <ValidationMessage field="wifi_id" />
                </div>

                <div className=" col-12 md:col-6 lg:col-4 py-3">
                  <div className="flex flex-column gap-2">
                    <label htmlFor="wifi_user_id" className=" text-black">
                      {translate.wifi_user_id} (required*)
                    </label>
                    <InputText
                      className="p-inputtext-sm text-black"
                      id="wifi_user_id"
                      name="wifi_user_id"
                      autoComplete="wifi_user_id"
                      aria-describedby="wifi_user_id-help"
                      tooltip="wifi_user_id"
                      tooltipOptions={{ ...tooltipOptions }}
                      placeholder="Enter your wifi user id"
                      disabled={loading}
                      value={payload.wifi_user_id}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.target.value,
                          "wifi_user_id",
                          (updateValue) => {
                            setPayload(updateValue);
                          }
                        )
                      }
                    />
                    <ValidationMessage field={"wifi_user_id"} />
                  </div>
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
                  <Dropdown
                    name="land_id"
                    className="p-dropdown-sm"
                    placeholder="Select your land ID"
                    tooltip="Land ID"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.land_id}
                    options={landList} // Replace `landOptions` with your list of available land IDs
                    onChange={(e) =>
                      payloadHandler(payload, e.value, "land_id", setPayload)
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
                  <Calendar
                    id="issuance_date"
                    name="issuance_date"
                    className="p-inputtext-sm w-full"
                    placeholder="Enter your issuance date"
                    tooltip="Issuance Date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={
                      payload.issuance_date
                        ? new Date(payload.issuance_date)
                        : null
                    }
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "issuance_date",
                        setPayload
                      )
                    }
                    dateFormat="yy-mm-dd"
                  />
                </div>
                <ValidationMessage field={"issuance_date"} />
              </div>

              <div className="col-12 md:col-4 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="expired" className="text-black">
                    {translate.expire}
                  </label>
                  <Calendar
                    id="expired"
                    name="expired"
                    className="p-inputtext-sm w-full"
                    placeholder="Enter your expired"
                    tooltip="Expired Date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.expired ? new Date(payload.expired) : null}
                    onChange={(e) =>
                      payloadHandler(payload, e.value, "expired", setPayload)
                    }
                    dateFormat="yy-mm-dd"
                  />
                </div>
                <ValidationMessage field={"expired"} />
              </div>
            </div>
          </Card>
          <Card
            style={{ marginTop: "40px" }}
            title={translate.renter_update_list}
          >
            <select
              className="block p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="-">-</option>
              <option value="Renter">Renter</option>
            </select>

            {selectedOption === "Renter" && (
              <div className=" grid">
                <div className="col-12 md:col-4 lg:col-4 py-3">
                  <div className="flex flex-column gap-2">
                    <label htmlFor="renter_id" className="text-black">
                      {translate.renter_id}
                    </label>
                    <Dropdown
                      name="renter_id"
                      className="p-dropdown-sm"
                      placeholder="Select your renter ID"
                      tooltip="Renter ID"
                      tooltipOptions={{ ...tooltipOptions }}
                      disabled={loading}
                      value={payload.renter_id}
                      options={renterList}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.value,
                          "renter_id",
                          setPayload
                        )
                      }
                    />
                  </div>
                  <ValidationMessage field={"renter_id"} />
                </div>
              </div>
            )}
          </Card>
          {payload.contracts &&
            payload.renter_id &&
            selectedOption === "Renter" && (
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
                            <label
                              htmlFor="contract_date"
                              className="text-black"
                            >
                              {translate.contract_date}
                            </label>
                            <Calendar
                              id="contract_date"
                              name="contract_date"
                              className="p-inputtext-sm w-full"
                              placeholder="Enter your contract date"
                              tooltip="Contract Date"
                              tooltipOptions={{ ...tooltipOptions }}
                              disabled={loading}
                              value={
                                contract.contract_date
                                  ? new Date(contract.contract_date)
                                  : null
                              }
                              onChange={(e) =>
                                payloadHandler(
                                  payload,
                                  e.value,
                                  "contract_date",
                                  setPayload
                                )
                              }
                              dateFormat="yy-mm-dd"
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
                            <Calendar
                              id="end_of_contract_date"
                              name="end_of_contract_date"
                              className="p-inputtext-sm w-full"
                              placeholder="Enter your contract end date"
                              tooltip="Contract End Date"
                              tooltipOptions={{ ...tooltipOptions }}
                              disabled={loading}
                              value={
                                contract.end_of_contract_date
                                  ? new Date(contract.end_of_contract_date)
                                  : null
                              }
                              onChange={(e) =>
                                payloadHandler(
                                  payload,
                                  e.value,
                                  "end_of_contract_date",
                                  setPayload
                                )
                              }
                              dateFormat="yy-mm-dd"
                            />
                          </div>
                          <ValidationMessage field={"end_of_contract_date"} />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                          <div className="flex flex-column gap-2">
                            <label
                              htmlFor="total_months"
                              className="text-black"
                            >
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
                                        updatedContracts[index] =
                                          updatedContract;

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
          {selectedOption === "Renter" &&
            contracts.map((contract, index) => (
              <Card
                title={translate.contract_update_new}
                style={{ marginTop: "20px" }}
              >
                <Loading loading={loading} />
                <div className=" grid">
                  <div className="col-12 md:col-3 lg:col-4 py-3">
                    <label htmlFor="date" className="input-label text-black">
                      {translate.contract_date} (required*)
                    </label>
                    <div className="p-inputgroup mt-2">
                      <Calendar
                        name="date"
                        className="p-inputtext-sm md:mr-2 sm:w-full"
                        placeholder="Select contract of date"
                        selectionMode={"single"}
                        tooltip="Contract date"
                        tooltipOptions={{ ...tooltipOptions }}
                        disabled={loading}
                        value={
                          contract.contract_date
                            ? moment(
                                contract.contract_date,
                                "YYYY-MM-DD"
                              ).toDate()
                            : null
                        }
                        onChange={(e) =>
                          updateContractField(
                            index,
                            "contract_date",
                            moment(e.value).format("YYYY-MM-DD")
                          )
                        }
                      />
                    </div>
                    <ValidationMessage field="contract_date" />
                  </div>

                  <div className="col-12 md:col-3 lg:col-4 py-3">
                    <label htmlFor="date" className="input-label text-black">
                      {translate.end_of_contract_date} (required*)
                    </label>
                    <div className="p-inputgroup mt-2">
                      <Calendar
                        name="date"
                        className="p-inputtext-sm md:mr-2 sm:w-full"
                        placeholder="Select contract end of date"
                        selectionMode={"single"}
                        tooltip="Contract end date"
                        tooltipOptions={{ ...tooltipOptions }}
                        disabled={loading}
                        value={
                          contract.end_of_contract_date
                            ? moment(
                                contract.end_of_contract_date,
                                "YYYY-MM-DD"
                              ).toDate()
                            : null
                        }
                        onChange={(e) =>
                          updateContractField(
                            index,
                            "end_of_contract_date",
                            moment(e.value).format("YYYY-MM-DD")
                          )
                        }
                      />
                    </div>
                    <ValidationMessage field="end_of_contract_date" />
                  </div>

                  <div className=" col-12 md:col-6 lg:col-4 py-3">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="total_month" className=" text-black">
                        {translate.total_months} (required*)
                      </label>
                      <InputText
                        className="p-inputtext-sm text-black"
                        id="total_months"
                        name="total_months"
                        autoComplete="total_months"
                        aria-describedby="total_months-help"
                        tooltip="total_months"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Enter your total months"
                        disabled={loading}
                        value={contract.total_months}
                        onChange={(e) =>
                          updateContractField(
                            index,
                            "total_months",
                            e.target.value
                          )
                        }
                      />
                      <ValidationMessage field={"total_months"} />
                    </div>
                  </div>

                  <div className=" col-12 md:col-6 lg:col-4 py-3">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="price_per_month" className=" text-black">
                        {translate.price_per_month} (required*)
                      </label>
                      <InputText
                        className="p-inputtext-sm text-black"
                        id="price_per_month"
                        name="price_per_month"
                        autoComplete="price_per_month"
                        aria-describedby="price_per_month-help"
                        tooltip="price_per_month"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Enter your price per month"
                        disabled={loading}
                        value={contract.price_per_month}
                        onChange={(e) =>
                          updateContractField(
                            index,
                            "price_per_month",
                            e.target.value
                          )
                        }
                      />
                      <ValidationMessage field={"price_per_month"} />
                    </div>
                  </div>

                  <div className=" col-12 md:col-6 lg:col-4 py-3">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="notes" className=" text-black">
                        {translate.note} (required*)
                      </label>
                      <InputTextarea
                        className="p-inputtext-sm text-black"
                        id="notes"
                        name="notes"
                        autoComplete="notes"
                        aria-describedby="notes-help"
                        tooltip="notes"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Enter your notes"
                        disabled={loading}
                        value={contract.note}
                        onChange={(e) =>
                          updateContractField(index, "note", e.target.value)
                        }
                      />
                      <ValidationMessage field={"notes"} />
                    </div>
                  </div>

                  <div className="col-12 md:col-12 lg:col-12 py-3">
                    <label htmlFor={`image-${index}`} className="input-label">
                      Image <span>(required*)</span>
                    </label>
                    <div className="p-inputgroup mt-2">
                      <InputText
                        type="file"
                        id={`image-${index}`}
                        name="image"
                        className="p-inputtext-sm"
                        accept="image/*"
                        disabled={loading}
                        multiple
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </div>

                    {/* Previews */}
                    <div className="mt-3 grid">
                      {contract.newPhotos.map((photo, photoIndex) => (
                        <div
                          key={photoIndex}
                          className="relative col-3 overflow-hidden group"
                        >
                          <img
                            src={photo.preview}
                            alt={`preview-${photoIndex}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index, photoIndex)}
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl hover:bg-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <ValidationMessage field={`image-${index}`} />
                  </div>
                </div>
                {index !== 0 && (
                  <Button
                    label="Remove Contract"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => handleRemoveContract(index)}
                  />
                )}
              </Card>
            ))}
          {selectedOption === "Renter" && (
            <Button
              style={{ marginTop: "20px" }}
              label="Add Contract"
              icon="pi pi-plus"
              onClick={handleAddContract}
              className="mb-3"
            />
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
