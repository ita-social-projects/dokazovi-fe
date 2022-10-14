import React from 'react';
import { Tooltip } from '@material-ui/core';
import i18n, { langTokens } from '../../../locales/localizationInit';
import AuthorsDeletingDialog from './AuthorsDeletingDialog';

interface IAuthorsDeleteBtnProps {
  id: number;
  fullName: string;
  isAllowedToDelete?: boolean;
}

const AuthorsDeleteBtn: React.FC<IAuthorsDeleteBtnProps> = (props) => {
  const tooltipTitle = i18n.t(langTokens.admin.removeAuthorWarning);
  const { id, fullName, isAllowedToDelete } = props;

  return (
    <>
      <Tooltip
        disableFocusListener={isAllowedToDelete}
        disableHoverListener={isAllowedToDelete}
        disableTouchListener={isAllowedToDelete}
        placement="bottom-end"
        title={tooltipTitle}
      >
        <div>
          <AuthorsDeletingDialog
            id={id}
            fullName={fullName}
            isAllowedToDelete={isAllowedToDelete}
          />
        </div>
      </Tooltip>
    </>
  );
};
export default AuthorsDeleteBtn;
