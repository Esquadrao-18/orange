import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  FormHelperText,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import orangeAPI from '../../api/config'
import signUpBanner from '../../assets/sign-up-banner.svg'
import Banner from '../../components/Banner/Banner'

function SignUp() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: ''
    }
  })
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)
  const [signUpError, setSignUpError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setSignUpError(false)
    try {
      const response = await orangeAPI.post('/signup', {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
      if (response.status === 201) {
        setSignUpError(false)
        setLoginSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setSignUpError(true)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleCloseSnackbar = () => {
    setSignUpError(false)
    setLoginSuccess(false)
  }

  return (
    <main className="flex">
      <section>
        <Banner src={signUpBanner} />
      </section>

      <section className="flex flex-col justify-center h-screen mt-10 gap-8 items-center mx-auto font-sans: Roboto">
        <h3 className="text-2xl sm:text-5xl text-[#222244]  text-nowrap">
          Cadastre-se
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 w-80 sm:w-full"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Controller
              name="name"
              control={control}
              rules={{ required: true, pattern: /^[A-Za-z' ]+$/, minLength: 2 }}
              render={({ field }) => (
                <TextField
                  label="Nome*"
                  variant="outlined"
                  size="large"
                  {...field}
                  error={!!errors.name}
                  helperText={
                    errors.name ? (
                      <>
                        Informe um nome válido (mínimo 2 caracteres).
                        <br />
                        Apenas letras, espaços e apóstrofos são permitidos.
                      </>
                    ) : undefined
                  }
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{ required: true, pattern: /^[A-Za-z' ]+$/, minLength: 2 }}
              render={({ field }) => (
                <TextField
                  label="Sobrenome*"
                  variant="outlined"
                  size="large"
                  {...field}
                  error={!!errors.lastName}
                  helperText={
                    errors.lastName ? (
                      <>
                        Informe um sobrenome válido (mínimo 2 caracteres).
                        <br />
                        Apenas letras, espaços e apóstrofos são permitidos.
                      </>
                    ) : undefined
                  }
                />
              )}
            />
          </div>
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
            render={({ field }) => (
              <TextField
                label="Email address"
                variant="outlined"
                size="large"
                {...field}
                error={!!errors.email}
                helperText={
                  errors.email ? 'Informe um e-mail válido' : undefined
                }
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!#])[A-Za-z\d@$!%*?&!#]/,
              minLength: 6
            }}
            render={({ field }) => (
              <TextField
                id="outlined-password-input"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...field}
                error={!!errors.password}
                helperText={
                  errors.password ? 'Informe uma senha segura' : undefined
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <FormHelperText>
            Para sua segurança, a senha deve conter pelo menos:
            <br />
            - Mínimo de 6 caracteres
            <br />
            - Ao menos uma letra maíuscula e uma minúscula
            <br />
            - Ao menos 1 número
            <br />- Ao menos 1 caractere especial: @$!%*?&!#
          </FormHelperText>

          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color="secondary"
            size="medium"
          >
            CADASTRAR
          </LoadingButton>

          <Link to="/" className="text-[#818388]">
            Já tem uma conta? Faça Login
          </Link>
        </form>

        <Snackbar
          open={signUpError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            variant="filled"
            severity="error"
            onClose={handleCloseSnackbar}
            sx={{ width: '95%' }}
          >
            Ocorreu um erro ao tentar realizar o cadastro
          </Alert>
        </Snackbar>

        <Snackbar
          open={loginSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            variant="filled"
            severity="success"
            onClose={handleCloseSnackbar}
            sx={{ width: '100%' }}
          >
            Cadastro feito com sucesso
          </Alert>
        </Snackbar>
      </section>
    </main>
  )
}

export default SignUp
