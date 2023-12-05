import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { tooltipOptions } from "../constants/config";
import { getData, setData } from "../helpers/localstorage";
import { Chip } from "primereact/chip";

export const Search = ({ onSearch, placeholder, tooltipLabel }) => {
  const [keyword, setKeyword] = useState(getData("search"));

  return (
    <div>
      <label>
        {" "}
        Press <b> Enter</b> key to search{" "}
      </label>
      <div className="p-inputgroup flex-1 mt-1 search">
        <InputText
          className="p-inputtext-sm"
          placeholder={placeholder}
          value={keyword ? keyword : ""}
          tooltip={tooltipLabel}
          tooltipOptions={tooltipOptions}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSearch(e.target.value);
              setData("search", e.target.value);
            }
          }}
        />
        {keyword?.length > 1 && (
          // <span
          //   className="p-inputgroup-addon"
          //   onClick={() => {
          //     localStorage.removeItem("search");
          //     setKeyword("");
          //     onSearch("");
          //   }}
          // >
          //   <i className="pi pi-times"></i>
          // </span>
          <div className=" remove-search">
            <span 
            onClick={() => {
                  localStorage.removeItem("search");
                  setKeyword("");
                  onSearch("");
                }}
            >
              <i className="pi pi-times remove-search-icon"></i>
            </span>
          </div>
        )}
          <span
            className="p-inputgroup-addon"
            onClick={() => {
              onSearch(keyword);
              setData(keyword)
            }}
          >
            <i className="pi pi-search"></i>
          </span>
        
      </div>
    </div>
  );
};
