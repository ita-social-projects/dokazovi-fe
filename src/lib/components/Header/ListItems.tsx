import React from "react";
import { useStyles } from './Header.styles';

interface IHeaderProps {
  id: string, 
  label: string,
  url?: string,
  }

export const navElems: IHeaderProps [] = [
  {
    id: "main",
    label: "Головна",
    url: "/"
  },
  {
    id: "covid-19",
    label: "Covid-19",
    url: "direction/covid-19",
 },
 {
  id: "directions",
  label: "Напрямки",
},
{
  id: "experts",
  label: "Експерти",
},
{
  id: "translates",
  label: "Переклади",
},
{
  id: "study",
  label: "Навчання",
}
];


const ListItems: React.FC<IHeaderProps> = () => {
  const classes = useStyles();

  const allLinks: any = navElems.map((item) => {
    return <a key={item.id} href={item.url} className={classes.items}>{item.label}</a>;
});

return (
  <div>
    {allLinks}
  </div>
  );
};

export default ListItems;


