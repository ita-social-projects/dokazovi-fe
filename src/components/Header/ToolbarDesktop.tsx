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
import { navElements } from './navElements';

export const ToolbarDesktop: React.FC = () => {
  const classes = useStyles();
  const { authenticated } = useContext(AuthContext);

  return (
    <div className={classes.toolbarDesktop}>
      <div style={{ display: 'flex' }}>
        <Logo isOnMobile={false} isSearchVisible={false} />
        <Box className={classes.tabs}>
          {navElements.map((item) => (
            <NavLink to={item.url} key={item.id} className={classes.tab} exact>
              <Typography variant="h5" className={classes.tabLabel}>
                {item.label}
              </Typography>
            </NavLink>
          ))}
        </Box>
      </div>
      <Box className={classes.actionsContainer}>
        {authenticated ? (
          <>
            <PostCreationMenu />
            <AccountMenu />
          </>
        ) : (
          <Route path="/opendoctorgate">
            <LoginModal />
          </Route>
        )}
      </Box>
    </div>
  );
};
