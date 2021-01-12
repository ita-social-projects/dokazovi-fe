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
} from '@material-ui/core';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const onSubmit = (data) => console.log(data);

  console.log(watch('example'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="example"
        defaultValue="test"
        inputRef={register({ required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}

      <TextField
        name="exampleRequired"
        inputRef={register({ required: true })}
      />

      {errors.exampleRequired && <span>This field is required</span>}

      <Button type="submit" />
    </form>
  );
}
