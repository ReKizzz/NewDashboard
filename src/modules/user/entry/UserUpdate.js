import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import React, { useCallback, useEffect, useState } from "react";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../../../helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { userService } from "../userService";
import { userPayload } from "../userPayload";
import { endpoints } from "../../../constants/endpoints";
import { tooltipOptions } from "../../../constants/config";
import { Loading } from "../../../shares/Loading";
import { formBuilder } from "../../../helpers/formBuilder";
import { FormMainAction } from "../../../shares/FormMainAction";
import moment from "moment";
import { authorizationService } from "../../authorization/authorizatonService";

export const UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useSelector((state) => state.user);
  const { translate } = useSelector((state) => state.setting);

  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState([]);
  const [payload, setPayload] = useState(userPayload.update);
  const [role, setRole] = useState([]);
  const [newPassword, setNewPassword] = useState("")

  /**
   * Loading Data
   */
  const loadingRoleData = useCallback(async () => {
    setLoading(true);

    const result = await authorizationService.roleIndex(dispatch);
    if (result.status === 200) {
      const formatData = result.data?.map((role) => {
        return {
          label: role.name,
          value: role.name,
        };
      });
      setRole(formatData);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingRoleData();
  }, [loadingRoleData]);

  const loadingData = useCallback(async () => {
    setLoading(true);
    await userService.show(dispatch, params.id);

    const response = await getRequest(`${endpoints.status}?type=user`);
    if (response.status === 200) {
      setUserStatus(response.data.user);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  /**
   * Submit update user infromation
   * @returns
   */
  const submitUpdateUser = async () => {
    setLoading(true);
    let updatePayload = { ...payload };
    updatePayload.dob = moment(updatePayload.dob).format("YYYY/MM/DD");

    const formData = formBuilder(updatePayload, userPayload.update);
    await userService.update(dispatch, formData, params.id);
    setLoading(false);
    return;
  };

  const submitChange = async () => {
    setLoading(true);    
    const response = await authorizationService.changepassword(dispatch, params.id, {"password": newPassword});
    if(response.status === 200){
      navigate(paths.user);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (user) {
      setPayload(user);
    }
  }, [user]);

  console.log(user);

  return (
    <Card
      title={translate.user_update}
      // subTitle={translate.user_subtitle}
    >
      <Loading loading={loading} />

      <div className="grid">
        <div className=" col-12 md:col-6 lg:col-4 py-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="name" className=" text-black">
              {" "}
              {translate.name}{" "}
            </label>
            <InputText
              className="p-inputtext-sm text-black"
              id="name"
              name={"name"}
              aria-describedby="name-help"
              tooltip={translate.name}
              tooltipOptions={{ ...tooltipOptions }}
              placeholder={translate.name}
              disabled={loading}
              value={payload.name || ""}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "name",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
            <ValidationMessage field={"name"} />
          </div>
        </div>

        <div className=" col-12 md:col-6 lg:col-4 py-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="email" className=" text-black">
              {" "}
              {translate.email}{" "}
            </label>
            <InputText
              className="p-inputtext-sm text-black"
              keyfilter={"email"}
              id="email"
              name="email"
              aria-describedby="email-help"
              tooltip={translate.email}
              tooltipOptions={{ ...tooltipOptions }}
              placeholder={translate.email}
              disabled={loading}
              value={payload.email || ""}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "email",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
            <ValidationMessage field={"email"} />
          </div>
        </div>

        <div className=" col-12 md:col-6 lg:col-4 py-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="phone" className=" text-black">
              {" "}
              {translate.phone}{" "}
            </label>
            <InputText
              className="p-inputtext-sm text-black"
              keyfilter={"num"}
              id="phone"
              name="phone"
              aria-describedby="phone-help"
              tooltip={translate.phone}
              tooltipOptions={{ ...tooltipOptions }}
              placeholder={translate.phone}
              disabled={loading}
              value={payload.phone || ""}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "phone",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
            <ValidationMessage field={"phone"} />
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-4 py-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="status" className="text-black">
              {translate.role} <span>(required*)</span>
            </label>
            <Dropdown
              id="role_names"
              name="role_names"
              className="p-inputtext-sm w-full"
              value={payload.role_names}
              options={role}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.value,
                  "role_names",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
              placeholder="Select a Role"
              tooltip="Select the associated partner"
              disabled={loading}
            />
            <ValidationMessage field="role_names" />
          </div>
        </div>
        

        <div className="col-12 md:col-6 lg:col-4 py-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="status" className="text-black">
              {translate.status} <span>(required*)</span>
            </label>
            <Dropdown
              inputId="status"
              value={payload.status}
              options={[
                { label: "ACTIVE", value: "ACTIVE" },
                { label: "INACTIVE", value: "INACTIVE" },
              ]}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.value,
                  "status",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
              placeholder={translate.status}
              className="p-inputtext-sm "
              disabled={loading}
            />
            <ValidationMessage field="status" />
          </div>
        </div>

        <FormMainAction
          cancel={translate.cancel}
          onCancel={() => navigate(paths.user)}
          submit={translate.update}
          onSubmit={() => submitUpdateUser()}
          loading={loading}
        />
      </div>

      <div className="grid">

        <div className=" col-12 md:col-6 lg:col-4 py-3">
          <div className="flex flex-column gap-2">
            <label htmlFor="password" className=" text-black">
              {" "}
              {translate.password} {" "}
            </label>
            <InputText
              className="p-inputtext-sm text-black"
              id="password"
              name="password"
              aria-describedby="password-help"
              tooltip={translate.password}
              tooltipOptions={{ ...tooltipOptions }}
              placeholder="Enter your Password"
              disabled={loading}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ValidationMessage field={"password"} />
          </div>
        </div>
        
        <FormMainAction
          cancel={translate.cancel}
          onCancel={() => navigate(paths.user)}
          submit={translate.update}
          onSubmit={() => submitChange()}
          loading={loading}
        />
      </div>
    </Card>
  );
};
