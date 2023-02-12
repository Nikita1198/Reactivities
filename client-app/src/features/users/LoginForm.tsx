import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import { Box, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import RegisterForm from "./RegisterForm";

export default observer(function LoginForm() {
  const { userStore, modalStore } = useStore();
  const [formErrors, setFormErrors] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Experiment

  // Toggle for password view 
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const theme = createTheme();    

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required("Write the magic word!"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  function submitForm(values: {email: string; password: string;}) {
    setLoading(true);
    userStore.login(values).catch((error) => {
      setFormErrors('Problem with email or password');
      setLoading(false)
      console.log(error);
    });
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              fullWidth
              sx={{mb: 2}}
              margin="normal"
              size='small'
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onClick={() => setFormErrors('')}
              onChange={formik.handleChange}
              // eslint-disable-next-line no-mixed-operators
              error={formik.touched.email && Boolean(formik.errors.email) || Boolean(formErrors)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              fullWidth
              sx={{ mt: 0 }}
              size='small'
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onClick={() => setFormErrors('')}
              onChange={formik.handleChange}
              // eslint-disable-next-line no-mixed-operators
              error={formik.touched.password && Boolean(formik.errors.password) || Boolean(formErrors)}
              autoComplete="current-password"
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onMouseUp={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{minHeight: 37}}>
              {((formik.touched.password && formik.errors.password) || (formik.touched.email && formik.errors.email) || formErrors) && 
              (<Typography color='red'>
                  {formik.errors.password}{formik.errors.email}{formErrors}
                </Typography>)}
            </Box>
            <LoadingButton 
              type="submit"
              fullWidth
              loading={loading}
              disabled={formik.values.password === '' && formik.values.email === ''}
              variant="contained"
              sx={{ mb: 1 }}
            >
                <Typography variant="subtitle1">
                    Sign in
                </Typography>
            </LoadingButton >
            <Box sx={{mt: 3}}>
              <Grid container>
                <Grid item>
                  <Link 
                    href="#" 
                    variant="body2"
                    onClick={() => modalStore.openModal(<RegisterForm/>)}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
});