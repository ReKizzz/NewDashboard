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
      contract_end_date: null,
      total_months: "",
      price_per_month: "",
      note: "",
      photos: [],
    },
  ]);

  const handleAddContract = () => {
    setContracts([
      ...contracts,
      {
        contract_date: null,
        contract_end_date: null,
        total_months: "",
        price_per_month: "",
        note: "",
        photos: [],
      },
    ]);
  };
  const handleRemoveContract = (index) => {
    const updatedContracts = contracts.filter(
      (_, contractIndex) => contractIndex !== index
    );
    setContracts(updatedContracts);
  };

  const [photos, setPhotos] = useState([]);
  console.log(photos);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files, "file");
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    console.log(newPhotos, "new");
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => {
      const updated = [...prev];
      // Clean up object URL
      URL.revokeObjectURL(updated[indexToRemove].preview);
      updated.splice(indexToRemove, 1);
      return updated;
    });
  };

  useEffect(() => {
    // Cleanup previews on component unmount
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [photos]);

  /**
   * Loading user Data
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await ownerAccService.index(dispatch);
    if (response.status === 200) {
      setOwnerList(
        response.data.map((owner) => ({
          label: owner.name,
          value: owner.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cornerData = useCallback(async () => {
    setLoading(true);
    const response = await cornerService.index(dispatch);
    if (response.status === 200) {
      setCornerList(
        response.data.map((corner) => ({
          label: corner.name,
          value: corner.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    cornerData();
  }, [cornerData]);

  const cityData = useCallback(async () => {
    setLoading(true);
    const response = await cityService.index(dispatch);
    if (response.status === 200) {
      setCityList(
        response.data.map((city) => ({
          label: city.name,
          value: city.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    cityData();
  }, [cityData]);

  const townshipData = useCallback(async () => {
    setLoading(true);
    const response = await townshipService.index(dispatch);
    if (response.status === 200) {
      setTownshipList(
        response.data.map((township) => ({
          label: township.name,
          value: township.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    townshipData();
  }, [townshipData]);

  const wardData = useCallback(async () => {
    setLoading(true);
    const response = await wardService.index(dispatch);
    if (response.status === 200) {
      setWardList(
        response.data.map((ward) => ({
          label: ward.name,
          value: ward.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    wardData();
  }, [wardData]);

  const streetData = useCallback(async () => {
    setLoading(true);
    const response = await streetService.index(dispatch);
    if (response.status === 200) {
      setStreetList(
        response.data.map((street) => ({
          label: street.name,
          value: street.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    streetData();
  }, [streetData]);

  const landData = useCallback(async () => {
    setLoading(true);
    const response = await landService.index(dispatch);
    if (response.status === 200) {
      setLandList(
        response.data.map((land) => ({
          label: land.name,
          value: land.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    landData();
  }, [landData]);

  const wifiData = useCallback(async () => {
    setLoading(true);
    const response = await wifiService.index(dispatch);
    if (response.status === 200) {
      setWifiList(
        response.data.map((wifi) => ({
          label: wifi.name,
          value: wifi.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    wifiData();
  }, [wifiData]);

  const renterData = useCallback(async () => {
    setLoading(true);
    const response = await renterService.index(dispatch);
    if (response.status === 200) {
      setRenterList(
        response.data.map((renter) => ({
          label: renter.name,
          value: renter.id,
        }))
      );
      total.current = response.data.total || response.data.length;
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    renterData();
  }, [renterData]);

  const submitOwnerCreate = async () => {
    setLoading(true);

    // Prepare payload with the description and other data
    let updatePayload = { ...payload };
    updatePayload.description = desc;

    // Add photos as an array to the payload
    updatePayload.photos = photos.map((photo) => photo.file); // Send only the file property

    try {
      const result = await ownerService.store(updatePayload, dispatch);
      if (result.data) {
        // On successful result, navigate to the owner list
        navigate(`${paths.ownerList}`);
      } else {
        // Handle failure here (e.g., show a message to the user)
        console.error("Failed to create owner:", result.error);
      }
    } catch (error) {
      // Handle any errors from the API request
      console.error("Error occurred while creating owner:", error);
      // Optionally show an alert or notification about the error
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // console.log(payload);

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
                    value={payload.land_no}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.value,
                        "land_no",
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
                    maxDate={new Date()}
                    value={
                      payload.issuance_date
                        ? moment(payload.issuance_date).toDate()
                        : new Date()
                    }
                    tooltip="Deposit date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
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
                    maxDate={new Date()}
                    value={
                      payload.expired
                        ? moment(payload.expired).toDate()
                        : new Date()
                    }
                    tooltip="Deposit date"
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
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
            <select
              className="form-select"
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
                        maxDate={new Date()}
                        value={
                          payload.contract_date
                            ? moment(payload.contract_date).toDate()
                            : new Date()
                        }
                        tooltip="Contract date"
                        tooltipOptions={{ ...tooltipOptions }}
                        disabled={loading}
                        onChange={(e) =>
                          payloadHandler(
                            payload,
                            e.target.value,
                            "contract_date",
                            (updateValue) => {
                              setPayload(updateValue);
                            }
                          )
                        }
                      />
                    </div>
                    <ValidationMessage field="contract_date" />
                  </div>

                  <div className="col-12 md:col-3 lg:col-4 py-3">
                    <label htmlFor="date" className="input-label text-black">
                      {translate.contract_end_date} (required*)
                    </label>
                    <div className="p-inputgroup mt-2">
                      <Calendar
                        name="date"
                        className="p-inputtext-sm md:mr-2 sm:w-full"
                        placeholder="Select contract end of date"
                        selectionMode={"single"}
                        value={
                          payload.end_of_contract_date
                            ? moment(payload.end_of_contract_date).toDate()
                            : new Date()
                        }
                        tooltip="Contract end date"
                        tooltipOptions={{ ...tooltipOptions }}
                        disabled={loading}
                        onChange={(e) =>
                          payloadHandler(
                            payload,
                            e.target.value,
                            "end_of_contract_date",
                            (updateValue) => {
                              setPayload(updateValue);
                            }
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
                        value={payload.total_months}
                        onChange={(e) =>
                          payloadHandler(
                            payload,
                            e.target.value,
                            "total_months",
                            (updateValue) => {
                              setPayload(updateValue);
                            }
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
                        value={payload.price_per_month}
                        onChange={(e) =>
                          payloadHandler(
                            payload,
                            e.target.value,
                            "price_per_month",
                            (updateValue) => {
                              setPayload(updateValue);
                            }
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
                        value={payload.notes}
                        onChange={(e) =>
                          payloadHandler(
                            payload,
                            e.target.value,
                            "notes",
                            (updateValue) => {
                              setPayload(updateValue);
                            }
                          )
                        }
                      />
                      <ValidationMessage field={"notes"} />
                    </div>
                  </div>

                  <div className="col-12 md:col-12 lg:col-12 py-3">
                    <label htmlFor="image" className="input-label">
                      {"Image"} <span>(required*)</span>
                    </label>
                    <div className="p-inputgroup mt-2">
                      <InputText
                        type="file"
                        id="image"
                        name="image"
                        className="p-inputtext-sm"
                        accept="image/*"
                        disabled={loading}
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* Previews */}
                    <div className="mt-3 grid ">
                      {photos.map((photo, index) => (
                        <div
                          key={index}
                          className="relative col-3 overflow-hidden group"
                        >
                          <img
                            src={photo.preview}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl hover:bg-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <ValidationMessage field="image" />
                  </div>
                </div>
                <Button
                  label="Remove Contract"
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={() => handleRemoveContract(index)}
                />
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
