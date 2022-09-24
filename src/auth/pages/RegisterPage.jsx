import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPawssword } from '../../store/auth';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El Password debeb tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return
    dispatch(startCreatingUserWithEmailPawssword(formState))
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              label="Nombre Completo"
              type="text"
              placeholder='John Doe'
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name='email'
              value={email}
              onChange={onInputChange}
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name='password'
              value={password}
              onChange={onInputChange}
              label="Contraseña"
              type="password"
              placeholder='Contraseña'
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant='contained' fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            {/* Para estilizar un link hay que usar el link de material y luego pasarle el componente del link */}
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}