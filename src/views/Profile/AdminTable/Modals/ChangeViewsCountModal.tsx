import React, { useEffect } from 'react';
import { Box, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from './ChangeViewsCountModal.styles';
import {
  selectAdminLab,
  selectModifications,
  setFakeViewsInput,
} from '../../../../models/adminLab';
import { useActions } from '../../../../shared/hooks';

interface IChangeViewsCountModal {
  id: number;
}

const ChangeViewsCountModal: React.FC<IChangeViewsCountModal> = ({ id }) => {
  const classes = useStyles();
  const { fakeViews } = useSelector(selectModifications);
  const { posts } = useSelector(selectAdminLab);
  const [boundSetFakeViewsInput] = useActions([setFakeViewsInput]);

  useEffect(() => {
    boundSetFakeViewsInput({ fakeViews: posts[id].views });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const viewsCount = event.target.valueAsNumber
      ? event.target.valueAsNumber
      : 0;
    boundSetFakeViewsInput({ fakeViews: viewsCount });
  };

  return (
    <Box display="flex" justifyContent="center" className={classes.wrapper}>
      <TextField
        type="number"
        variant="outlined"
        value={fakeViews}
        defaultValue="0"
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default ChangeViewsCountModal;
