import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useStyles } from '../../../lib/components/Header/Header.styles';
import { RootStateType } from '../../../store/rootReducer';

const DirectionsList: React.FC = () => {
  const classes = useStyles();

  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const allLinks = directions.map((item) => {
    return <Link key={item.id} to={location => ({ ...location, pathname: `direction/${item.name}` || '#' })} className={classes.items}>{item.label}</Link>;
  });

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
