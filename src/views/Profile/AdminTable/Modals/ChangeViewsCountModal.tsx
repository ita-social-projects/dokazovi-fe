import { Box, TextField } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './ChangeViewsCountModal.styles';
import {
  selectModifications,
  setFakeViewsInput,
} from '../../../../models/adminLab';
import { useActions } from '../../../../shared/hooks';

const ChangeViewsCountModal: React.FC = () => {
  const classes = useStyles();
  const { fakeViews } = useSelector(selectModifications);
  const [boundSetFakeViews] = useActions([setFakeViewsInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const viewsCount = Number(
      event.target.value.replace(/^-?\d{2}(\.\d+)?$/, ''),
    );
    boundSetFakeViews({ fakeViews: viewsCount });
  };

  return (
    <Box display="flex" justifyContent="center" className={classes.wrapper}>
      <TextField
        type="number"
        variant="outlined"
        value={fakeViews}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default ChangeViewsCountModal;
