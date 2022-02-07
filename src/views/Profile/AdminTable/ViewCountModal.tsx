import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios, { AxiosResponse } from 'axios';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from '../styles/ViewCountModal.styles';

// type ImgurPostResponseType = {
//   data: { deletehash: string; link: string };
//   status: number;
// };

// const uploadImageToImgur = (
//   url: string,
//   config = {
//     headers: {
//       Authorization: `Client-ID ${CLIENT_ID}`,
//     },
//   },
// ): Promise<AxiosResponse<ImgurPostResponseType>> => {
//   const formData = new FormData();
//   formData.append('image', url);
//   return axios.post(`${BASE_URL}/image`, formData, {
//     method: 'post',
//     ...config,
//   });
// };

const accessToken = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNyIsImlhdCI6MTY0Mzk4MjY3NiwiZXhwIjoxNjQ0ODQ2Njc2LCJQZXJtaXNzaW9ucyI6IltTQVZFX09XTl9QVUJMSUNBVElPTiwgU0FWRV9QTEFURk9STV9JTkZPUk1BVElPTiwgU0VUX0lNUE9SVEFOQ0UsIFNBVkVfVEFHLCBERUxFVEVfUE9TVCwgVVBEQVRFX1BPU1QsIFVQREFURV9QTEFURk9STV9JTkZPUk1BVElPTiwgU0FWRV9QVUJMSUNBVElPTl0ifQ.A8KL_N8NaZjJ7_-tPEQrb_cm85EO0geQzAg--A3cvTMmHXYPAK-bQA780mCboWYqp4yf6LLwq3ztRHVfGriiHA`;

export interface ISimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

export const ViewCountModal: React.FC<ISimpleDialogProps> = (props) => {
  const { isOpen, onClose, postId } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [viewCount, setViewCount] = React.useState(0);

  const handleClose = () => {
    onClose();
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

  const setFakeViews = async (id: number, views: number): Promise<unknown> => {
    const settings = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post(
        `https://dokazovi-be-release.herokuapp.com:443/api/post/set-fake-view/${id}?views=${views}`,
        {},
        settings,
      );
      const postViews = await axios.get(
        `https://dokazovi-be-release.herokuapp.com:443/api/post/post-view-count?url=%2Fposts%2F${id}`,
      );

      console.log(response.status);
      console.log(postViews.data);
      return response;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={isOpen} className={classes.root}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant="h5">
          {t(langTokens.admin.changeViewsCount)}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          fullWidth
          variant="standard"
          type="number"
          autoFocus
          value={viewCount}
          onChange={(event) => setViewCount(Number(event.target.value))}
          InputProps={{
            disableUnderline: true,
          }}
          className={classes.viewsInput}
        />
        <Box className={classes.modalBtns}>
          <Button
            variant="text"
            className={classes.secondaryBtn}
            onClick={() => handleClose()}
          >
            {t(langTokens.admin.dismiss)}
          </Button>
          <Button
            variant="contained"
            className={classes.primaryBtn}
            disabled={viewCount < 0}
            onClick={() => setFakeViews(postId, viewCount)}
          >
            {t(langTokens.admin.save)}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
