import { Toolbar } from "primereact/toolbar";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/logo.jpeg";
import { sidebarToggle } from "../../../shares/shareSlice";
import { useEffect, useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { removeAllData } from "../../../helpers/localstorage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import defaultImage from "../../../assets/images/defaultImage.png";

const EndContent = () => {
  const { translate, sidebarColor } = useSelector((state) => state.setting);
  const [adminProfile, setProfile] = useState(null);
  const { profile } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const logout = async () => {
    removeAllData();
    navigate(paths.adminLogout);
  };

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile]);

  return (
    <>
      <Button
        className="mx-3"
        style={{ color: "#000000" }}
        rounded
        text
        label={translate["log_out"]}
        onClick={() => logout()}
      />
    </>
  );
};

export const AppToolbar = () => {
  const { translate, sidebarColor } = useSelector((state) => state.setting);

  return (
    <div className="app-toolbar">
      <Toolbar
        className="toolbar"
        style={{ background: sidebarColor.code }}
        end={<EndContent />}
      />
    </div>
  );
};
