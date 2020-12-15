/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useStyles } from '../../../lib/components/Header/Header.styles';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';

const DirectionsList: React.FC = () => {
  const classes = useStyles();

  const directions = Object.values(DIRECTION_PROPERTIES); 
  const {id} = useParams<{id: string}>();

  const allLinks = directions.map((item) =>
  <Link key={item.id} to={location => ({ ...location, pathname: `direction/${item.route}` || '#' })} className={classes.items}>{item.name}</Link>);


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
