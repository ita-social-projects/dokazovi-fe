import React, { useState } from 'react';
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

  const [openTooltip, setOpenTooltip] = useState(false);

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };
  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  return (
    <>
      <Tooltip
        open={openTooltip && !isAllowedToDelete}
        onClose={handleCloseTooltip}
        onOpen={handleOpenTooltip}
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
