import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { NavLink, Route } from 'react-router-dom';
import { useStyles } from './Header.styles';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import { PostCreationMenu } from './PostCreationMenu';
import { AccountMenu } from './AccountMenu';
import { LoginModal } from '../../old/lib/components/Users/LoginModal';
import { Logo } from './Logo';
// eslint-disable-next-line import/no-cycle
import { navElems } from './Header';

export const ToolbarDesktop = () => {
  const classes = useStyles();
  const { authenticated } = useContext(AuthContext);
  const mobile = false;
  const isSearchVisible = false;

  return (
    <div className={classes.toolbarDesktop}>
      <div style={{ display: 'flex' }}>
        <Logo mobile={mobile} isSearchVisible={isSearchVisible} />
        <Box className={classes.tabs}>
          {navElems.map((item) => (
            <NavLink to={item.url} key={item.id} className={classes.tab} exact>
              <Typography variant="h5" className={classes.tabLabel}>
                {item.label}
              </Typography>
            </NavLink>
          ))}
        </Box>
      </div>
      <Box className={classes.actionsContainer}>
        {authenticated && <PostCreationMenu />}
        {authenticated ? (
          <AccountMenu />
        ) : (
          <Route path="/opendoctorgate">
            <LoginModal />
          </Route>
        )}
      </Box>
    </div>
  );
};
