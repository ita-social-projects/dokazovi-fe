import React from 'react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MaterialsViewWrapper } from './MaterialsView/MaterialsViewWrapper';
import { useStyles } from './styles/OperationView.styles';
import { IProfileMenuOption } from '../../old/lib/types';
import { PasswordChangeView } from './PasswordChangeView';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';
import { ExpertPersonalInfo } from './ExpertPersonalInfo/ExpertPersonalInfo';

interface IOperationViewProps {
  selectedOption: IProfileMenuOption | Record<string, never>;
}

export const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption } = props;
  const { value } = selectedOption;
  const classes = useStyles();
  const { expertId } = useParams<{ expertId: string }>();

  const operationViews = {
    info: expertId ? <ExpertPersonalInfo /> : <PersonalInfo />,
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
