import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField
} from '@mui/material'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom/dist'
import orangeAPI from '../../api/config'
import loginBanner from '../../assets/login-banner.svg'
import Banner from '../../components/Banner/banner'
import { useAuth } from '../../hooks/useAuth'

function Login() {
  const { login } = useAuth()
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const googleClientId = import.meta.env.VITE_AUTH_GOOGLE_KEY

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await orangeAPI.post('/signin', data)
      if (response.status === 200) {
        login(response.data.token)
        navigate('/meus-projetos')
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setLoginError(true)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleCloseSnackbar = () => {
    setLoginError(false)
  }

  return (
    <main className="flex">
      <section>
        <Banner src={loginBanner} />
      </section>

      <section className="flex flex-col justify-center h-screen gap-8 items-center mx-auto font-sans: Roboto">
        <h3 className="text-2xl sm:text-5xl mt-12 text-[#222244] text-nowrap">
          Entre no Orange Portfólio
        </h3>

        <GoogleOAuthProvider clientId={googleClientId}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode(
                credentialResponse.credential
              )
              console.log(credentialResponseDecoded)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </GoogleOAuthProvider>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 w-80 sm:w-full"
        >
          <h5 className="lg:text-2xl pb-2 text-[#515255]">
            Faça login com email
          </h5>

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
            rules={{ required: 'true' }}
            render={({ field }) => (
              <TextField
                id="outlined-password-input"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...field}
                error={!!errors.password}
                helperText={errors.password ? 'Informe sua senha' : undefined}
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
          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            size="medium"
            loading={isLoading}
          >
            Entrar
          </LoadingButton>

          <Link to="/cadastrar" className="text-[#818388]">
            Cadastre-se
          </Link>
        </form>

        <Snackbar
          open={loginError}
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
            Login ou senha inválidos. Tente novamente!
          </Alert>
        </Snackbar>
      </section>
    </main>
  )
}

export default Login
