import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { paths } from "../../../constants/paths";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../userService";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { payloadHandler } from "../../../helpers/handler";
import { tooltipOptions } from "../../../constants/config";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { userPayload } from "../userPayload";
import { FormMainAction } from "../../../shares/FormMainAction";
import { authorizationService } from "../../authorization/authorizatonService";

export const UserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(userPayload.store);
  const [role, setRole] = useState([]);

  const { translate } = useSelector((state) => state.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  /**
   * Create user account
   * @returns
   */
  const submitUser = async () => {
    setLoading(true);
    const response = await userService.store(payload, dispatch);
    if (response.data) {
      navigate(`${paths.user}`);
    }
    setLoading(false);
    return;
  };

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <BreadCrumb />
        </div>

        <div className=" col-12">
          <Card
            title={translate.user_create}
            // subTitle={translate.user_subtitle}
          >
            <div className=" grid">
              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="name" className=" text-black">
                    {" "}
                    {translate.name} <span>(required*)</span>{" "}
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
                    {translate.email} <span> (required*) </span>
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
                    {translate.phone} <span>(required*)</span>{" "}
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

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="password" className=" text-black">
                    {" "}
                    {translate.password} <span>(required*)</span>
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
                    onChange={(e) =>
                      payloadHandler(
                        payload,
                        e.target.value,
                        "password",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                  />
                  <ValidationMessage field={"password"} />
                </div>
              </div>

              <div className="col-12 md:col-3 lg:col-3 py-3">
                <label htmlFor="role_names" className="text-black">
                  {translate.role} <span>(required*)</span>
                </label>
                <div className="p-inputgroup mt-2">
                  <Dropdown
                    inputId="role_names"
                    autoComplete="role_names"
                    name="role_names"
                    filter
                    value={payload.role_names}
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
                    options={role}
                    placeholder="Select a partner"
                    disabled={loading}
                    className="p-inputtext-sm"
                  />
                </div>
                <ValidationMessage field="role_names" />
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
            </div>

            <FormMainAction
              cancel={translate.cancel}
              onCancel={() => navigate(paths.user)}
              submit={translate.submit}
              onSubmit={() => submitUser()}
              loading={loading}
            />
          </Card>
        </div>
      </div>
    </>
  );
};
