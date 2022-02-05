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
  console.log(postId);

  const handleClose = () => {
    onClose();
  };

  // const setFakeViews = async (id, views) => {
  //   // do something
  //   const settings = {
  //     method: 'POST',
  //     headers: {

  //         // Accept: 'application/json',
  //         // 'Content-Type': 'application/json',

  //   }, };
  //   const headers = {
  //     'Authorization': accessToken,
  //   };

  //   try {
  //     // const fetchResponse = await fetch(`https://dokazovi-be-release.herokuapp.com:443/api/post/set-fake-view/${id}?views=${views}
  //     // `, settings);
  //     // const data = await fetchResponse.json();
  //     // console.log(data);
  //     // return data
  //     const testLink = `${id}?views=${views}`;
  //     console.log(testLink);
  //     const response = await axios.post(
  //       `https://dokazovi-be-release.herokuapp.com:443/api/post/set-fake-view/${id}?views=${views}`,
  //       {},
  //       {
  //         headers: {
  //           'Authorization: accessToken,
  //         }
  //     });
  //     console.log(response);

  //   } catch (error) {
  //     return error;
  //   }
  // };

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
            // onClick={}
          >
            {t(langTokens.admin.save)}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
