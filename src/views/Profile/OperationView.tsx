import React from 'react';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MaterialsViewWrapper } from './MaterialsView/MaterialsViewWrapper';
import { useStyles } from './styles/OperationView.styles';
import { IProfileMenuOption } from '../../old/lib/types';
import { PasswordChangeView } from './PasswordChangeView';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';
import { selectCurrentUser } from '../../models/user';

interface IOperationViewProps {
  selectedOption: IProfileMenuOption | Record<string, never>;
}

export const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption } = props;
  const { value } = selectedOption;
  const classes = useStyles();
  const currentUser = useSelector(selectCurrentUser);

  const operationViews = {
    info: <PersonalInfo author={currentUser.data} isCurrentUser />,
    materials: <MaterialsViewWrapper />,
    passwordChange: <PasswordChangeView />,
    mail: <div>Mail</div>,
  };

  return (
    <Container className={classes.operationView}>
      {operationViews[value] ?? <div>Info</div>}
    </Container>
  );
};
