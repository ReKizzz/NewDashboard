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
          <Card title={translate.owner_update}>
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

              <FormMainAction
                cancel={translate.cancel}
                onCancel={() => navigate(paths.owner)}
                submit={translate.update}
                onSubmit={submitOwnerUpdate}
                loading={loading}
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
