
import React from 'react';
import { Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useStyles } from '../../../lib/components/Header/Header.styles';

interface IDirectionsProps {
  id: string,
  label: string,
  url?: string,
}

export const directions: IDirectionsProps[] = [
  {
    id: "therapy",
    label: "Терапія",
    url: "/direction/therapy"
  },
  {
    id: "ophthalmology",
    label: "Офтальмологія",
    url: "/direction/ophthalmology",
  },
  {
    id: "surgery",
    label: "Хірургія",
    url: '/direction/surgery',
  },
  {
    id: "virology",
    label: "Вірусологія",
    url: '/direction/virology',
  },
  {
    id: "cardiology",
    label: "Кардіологія",
    url: '/direction/cardiology',
  },
  {
    id: "pediatrics",
    label: "Педіатрія",
    url: '/direction/pediatrics',
  }
];

const DirectionsList: React.FC = () => {
  const classes = useStyles();

  const allLinks = directions.map((item) =>
  <Link key={item.id} to={location => ({ ...location, pathname: item.url || '#' })} className={classes.items}>{item.label}</Link>);


  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
          <List>
            <ListItem>
              {allLinks}
            </ListItem>
          </List>
      </Breadcrumbs>
    </div>
  );
};

export default DirectionsList;
