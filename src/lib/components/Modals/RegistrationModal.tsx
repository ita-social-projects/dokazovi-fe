import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

export interface IInputs {
  email: string;
  password: string;
}

export interface IRegistrationProps {
  registrationOpen: boolean;
  onRegistrationClose: () => void;
}

export const RegistrationModal: React.FC<IRegistrationProps> = (props) => {
  const { onRegistrationClose, registrationOpen } = props;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, watch, errors } = useForm<IInputs>();

  const onSubmit = (data) => console.log(data);

  console.log(watch('email'));

  return (
    <>
      <Dialog
        open={registrationOpen}
        onClose={onRegistrationClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Enter your email and password
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '300px', height: '260px', margin: '0 auto' }}
          >
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  inputRef={register({ required: true })}
                  label="Ім'я"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  inputRef={register({ required: true })}
                  label="Прізвище"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  inputRef={register({ required: true })}
                  label="Email"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {errors.email && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  inputRef={register({ required: true })}
                  label="Password"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {errors.password && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={register}
                      name="remember"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />

                <Button type="submit" variant="outlined">
                  Sign in
                </Button>
              </Grid>
              <Grid item xs={12}>
                {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
                <Typography style={{ marginBottom: '10px' }}>
                  Don&apos;t have an account? Sign Up
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px' }}>
                  Or sign in using:
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: '0px auto' }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Button>Facebook</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button>Google</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
