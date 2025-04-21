import { Tree } from "primereact/tree";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { items } from "../defaultPaths";
import { paths } from "../../../constants/paths";
import { removeAllData } from "../../../helpers/localstorage";

export const AppSidebar = () => {
  const [selectedKeys, setSelectedKeys] = useState(null);

  const navigate = useNavigate();
  const { translate, sidebarColor } = useSelector((state) => state.setting);

  console.log(sidebarColor);

  // Extract flat item list for navigation
  const itemList = items.flatMap((value) =>
    value.children ? value.children : [value]
  );

  const nodeTemplate = (node) => {
    return <label>{translate[node.label]}</label>;
  };

  const logout = () => {
    removeAllData();
    navigate(paths.adminLogout);
  };

  return (
    <div
      className={`sidebar col-2 d-flex flex-column justify-content-between`}
      style={{ background: sidebarColor.code }}
    >
      <Tree
        style={{ flex: 1, overflowY: "auto", height: "100vh" }}
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
    </div>
  );
};
