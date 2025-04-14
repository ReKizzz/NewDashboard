import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from "../../../constants/config";
import { paths } from "../../../constants/paths";
import { payloadHandler } from "../../../helpers/handler";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { ownerPayload } from "../ownerPayload";
import { ownerService } from "../ownerService";
import { ownerAccService } from "../../ownerAccCreate/ownerAccService";
import { cornerService } from "../../cornerCreate/cornerService";
import { cityService } from "../../cityCreate/cityService";
import { townshipService } from "../../townshipCreate/townshipService";
import { wardService } from "../../wardCreate/wardService";
import { streetService } from "../../streetCreate/streetService";
import { landService } from "../../landCreate/landService";
import { wifiService } from "../../wifiCreate/wifiService";
import { Button } from "primereact/button";
import { renterService } from "../../renterCreate/renterService";
import { InputTextarea } from "primereact/inputtextarea";
import { formBuilder } from "../../../helpers/formBuilder";

export const OwnerCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(ownerPayload.create);
  const [desc, setDesc] = useState("");
  const [ownerList, setOwnerList] = useState([]);
  const [cornerList, setCornerList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [townshipList, setTownshipList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [streetList, setStreetList] = useState([]);
  const [landList, setLandList] = useState([]);
  const [wifiList, setWifiList] = useState([]);
  const [renterList, setRenterList] = useState([]);
  const total = useRef(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate } = useSelector((state) => state.setting);
  const [selectedOption, setSelectedOption] = useState("-");
  const [contracts, setContracts] = useState([
    {
      contract_date: null,
      end_of_contract_date: null,
      total_months: "",
      price_per_month: "",
      note: "",
      photos: [],
      newPhotos: []
    },
  ]);

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
        newPhotos: []
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

  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
  
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  
    const updatedContracts = [...contracts];
    updatedContracts[index].photos = [...updatedContracts[index].photos, ...files];
    updatedContracts[index].newPhotos = [...updatedContracts[index].newPhotos, ...newPhotos];
    setContracts(updatedContracts);
  };

  const handleRemovePhoto = (contractIndex, photoIndex) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIndex].photos.splice(photoIndex, 1);
    updatedContracts[contractIndex].newPhotos.splice(photoIndex, 1);
    setContracts(updatedContracts);
  };

  // useEffect(() => {
  //   return () => {
  //     photos.forEach((p) => URL.revokeObjectURL(p.preview));
  //   };
  // }, [photos]);

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
    fetchOptions(ownerAccService, setOwnerList);
    fetchOptions(cornerService, setCornerList);
    fetchOptions(cityService, setCityList);
    fetchOptions(townshipService, setTownshipList);
    fetchOptions(wardService, setWardList);
    fetchOptions(streetService, setStreetList);
    fetchOptions(landService, setLandList);
    fetchOptions(wifiService, setWifiList);
    fetchOptions(renterService, setRenterList);
  }, [fetchOptions]);

  const submitOwnerCreate = async () => {
    setLoading(true);
  
    const formData = formBuilder(payload, ownerPayload.create);

    try {
      const result = await ownerService.store(formData, dispatch);
      
      if (result.data) {
        if (contracts && contracts.length > 0) {
          for (const contract of contracts) {
            const formData = new FormData();
            formData.append('contract_date',contract?.contract_date)
            formData.append('end_of_contract_date',contract?.end_of_contract_date)
            formData.append('total_months',contract?.total_months)
            formData.append('price_per_month',contract?.price_per_month)
            formData.append('note',contract?.note)
            formData.append('owner_data_id',result?.data?.id)
            contract?.photos?.forEach((image, index) => {
              formData.append(`photos[${index}]`, image);
            });
            await ownerService.store2(formData, dispatch);
          }
          navigate(`${paths.ownerList}`);
        }
      } else {
        console.error("Failed to create owner:", result.error);
      }
    } catch (error) {
      console.error("Error occurred while creating owner:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" grid">
        <div className=" col-12">
          <BreadCrumb />
        </div>

        <div className=" col-12">
          <Card title={translate.owner_create}>
            <Loading loading={loading} />

            <div className=" grid">
              <h1 className="col-12 flex align-items-center justify-content-center">
                Creating Your Owner Account
              </h1>
              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="user" className="input-label">
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
                        e.value,
                        "owner_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={ownerList}
                    placeholder="Select a owner"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="user_id" />
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
                    name="street"
                    filter
                    value={payload.street_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
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

          <Card style={{ marginTop: "20px" }}>
            <Loading loading={loading} />
            <div className="grid">
              <h1 className="col-12 flex align-items-center justify-content-center">
                Land Details
              </h1>
              <div className="col-12 md:col-4 lg:col-4 py-3">
                <label htmlFor="land" className="input-label">
                  {translate.land_title} (required*){" "}
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="land"
                    autoComplete="land"
                    name="land"
                    filter
                    value={payload.land_id}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "land_id",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    options={landList}
                    placeholder="Select a land"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="land_id" />
              </div>

              <div className="col-12 md:col-3 lg:col-4 py-3">
                <label htmlFor="dob" className="input-label text-black">
                  Issuance Date (required*)
                </label>
                <div className="p-inputgroup mt-2">
                  <Calendar
                    name="date"
                    className="p-inputtext-sm md:mr-2 sm:w-full"
                    placeholder="Select deposit of date"
                    selectionMode={"single"}
                    value={
                      payload.issuance_date
                        ? moment(payload.issuance_date, "YYYY-MM-DD").toDate()
                        : null
                    }
                    tooltip="Deposit date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        moment(e.value).format("YYYY-MM-DD"),
                        "issuance_date",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                </div>
                <ValidationMessage field="issuance_date" />
              </div>

              <div className="col-12 md:col-3 lg:col-4 py-3">
                <label htmlFor="dob" className="input-label text-black">
                  Expired/Renew (required*)
                </label>
                <div className="p-inputgroup mt-2">
                  <Calendar
                    name="date"
                    className="p-inputtext-sm md:mr-2 sm:w-full"
                    placeholder="Select deposit of date"
                    selectionMode={"single"}
                    value={
                      payload.expired
                        ? moment(payload.expired, "YYYY-MM-DD").toDate()
                        : null
                    }
                    tooltip="Deposit date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        moment(e.value).format("YYYY-MM-DD"),
                        "expired",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                </div>
                <ValidationMessage field="expired" />
              </div>
            </div>
          </Card>

          <Card style={{ marginTop: "20px" }}>
            <Loading loading={loading} />
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
                <h1 className="col-12 flex align-items-center justify-content-center">
                  Renter Details
                </h1>
                <div className="col-12 md:col-4 lg:col-4 py-3">
                  <label htmlFor="renter" className="input-label">
                    {translate.renter} (required*){" "}
                  </label>
                  <div className="p-inputgroup mt-2">
                    <Dropdown
                      inputId="renter"
                      autoComplete="renter name"
                      name="renter"
                      filter
                      value={payload.renter_id}
                      onChange={(e) =>
                        payloadHandler(
                          payload,
                          e.value,
                          "renter_id",
                          (updateValue) => {
                            setPayload(updateValue);
                          }
                        )
                      }
                      options={renterList}
                      placeholder="Select a owner"
                      disabled={loading}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <ValidationMessage field="renter_id" />
                </div>
              </div>
            )}
          </Card>

          {selectedOption === "Renter" &&
            contracts.map((contract, index) => (
              <Card style={{ marginTop: "20px" }}>
                <Loading loading={loading} />
                <div className=" grid">
                  <h1 className="col-12 flex align-items-center justify-content-center">
                    Contract Details
                  </h1>
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
                            ? moment(contract.contract_date, "YYYY-MM-DD").toDate()
                            : null
                        }
                        onChange={(e) =>
                          updateContractField(index, "contract_date", moment(e.value).format("YYYY-MM-DD"))
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
                            ? moment(contract.end_of_contract_date, "YYYY-MM-DD").toDate()
                            : null
                        }
                        onChange={(e) =>
                          updateContractField(index, "end_of_contract_date",moment(e.value).format("YYYY-MM-DD"))
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
                          updateContractField(index, "total_months", e.target.value)
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
                          updateContractField(index, "price_per_month", e.target.value)
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
            submit={translate.submit}
            onSubmit={submitOwnerCreate}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};
