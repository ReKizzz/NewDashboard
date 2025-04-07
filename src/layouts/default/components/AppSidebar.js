import { Sidebar } from "primereact/sidebar";
import { Image } from "primereact/image";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "../../../shares/shareSlice";
import logo from "../../../assets/images/logo.jpeg";
import { useState } from "react";
import { items } from "../defaultPaths";
import { paths } from "../../../constants/paths";
import { removeAllData } from "../../../helpers/localstorage";

export const AppSidebar = () => {
  let itemList = [];

  items.map((value) => {
    if (value.children) {
      value.children.map((child) => {
        itemList.push(child);
        return child;
      });
    } else {
      itemList.push(value);
    }
    return value;
  });

  const [selectedKeys, setSelectedKeys] = useState(null);
  const {
    translate,
    sidebarColor,
    sidebarFontColor,
    sidebarHoverColor,
  } = useSelector(state => state.setting);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.share);

  const logout = async () => {
    removeAllData();
    navigate(paths.adminLogout);
  };

  const nodeTemplate = (node) => {
    const label = node.label;
    return <label>{translate[label]}</label>;
  };

  return (
    <div className="sidebar col-2 d-flex flex-column justify-content-between" 
      style={{
        backgroundColor: sidebarColor,
        color: sidebarFontColor,
      }}>
      <Tree
        style={{
          backgroundColor: sidebarColor,
          color: sidebarFontColor,
          hover: sidebarHoverColor,
          flex: 1, overflowY: 'auto', height: "100vh"
        }}
        value={items}
        selectionMode="single"
        nodeTemplate={nodeTemplate}
        selectionKeys={selectedKeys}
        onSelectionChange={(e) => {
          const getItem = itemList.find((value) => value.key === e.value);
          if (getItem) {
            navigate(getItem.url);
          }
          setSelectedKeys(e.value);
        }}
      />

      <Button
        label={translate["log_out"]}
        className="p-button-text p-button-plain logout"
        style={{ color: "gray", width: "80%" }}
        onClick={() => logout()}
      />
    </div>
  );
};
