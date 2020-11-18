import React from "react";
import {
  Link
} from "react-router-dom";
import { DropDownMenu } from "./DropDownMenu";

const nav = { 
  "Головна": "/",
  "Covid-19": "direction/covid-19",
  "Напрямки": "", 
  "Експерти": "",
  "Переклади": "",
  "Навчання": ""
};

interface IHeaderProps {
  [key: string]: string | React.FC;
};

const ListItems: React.FC<IHeaderProps> = () => {

const allLinks: any =  Object.entries(nav).map(([key, value]) => {
  switch (key) {
    case "Напрямки": 
    return <Link key={key} to={value} className="nav-list"><DropDownMenu/></Link>;
    default: 
    return <Link key={key} to={value} className="nav-list">{key}</Link>;
  };

});

return (
  <div>
    <h3>{allLinks}</h3>
  </div>
  );
};

export default ListItems;


