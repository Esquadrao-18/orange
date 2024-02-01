import Banner from "../../components/Banner/banner"
import loginBanner from "../../assets/login-banner.svg"
import { TextField , Button, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"


function Login () {

        const { control, handleSubmit, formState } = useForm();
        const { errors } = formState;
        const [showPassword, setShowPassword] = useState(false);
        const [loginError, setLoginError] = useState(false);

        const googleClientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;

        const onSubmit = (data) => {

            if (data.email !== 'camis@gmail.com' && data.password !== '123') {
                setLoginError(true);
            } else {
                console.log(data);
            }
        };
        const handleTogglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
            
        const handleCloseSnackbar = () => {
            setLoginError(false);
        };

    return (
        <main className="flex">
            <section>
                <Banner src={loginBanner} />
            </section>
            
            <section className="flex flex-col justify-center gap-8 items-center h-screen mx-auto font-sans: Roboto">
                
                <h3 className="text-2xl sm:text-5xl text-[#222244] text-nowrap">
                    Entre no Orange Portfólio
                </h3>

                <GoogleOAuthProvider clientId={googleClientId}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                            console.log(credentialResponseDecoded);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />                
                </GoogleOAuthProvider>  


                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 w-80 sm:w-full" >

                    <h5 className="lg:text-2xl pb-2 text-[#515255]">
                        Faça login com email
                    </h5>                  

                    <Controller 
                        name="email"
                        control={control}
                        rules={{ required: true , pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                        render={({ field }) => (
                        <TextField
                            label="Email address"
                            variant="outlined"
                            size="large"
                            {...field}
                            error={!!errors.email}
                            helperText={errors.email ? "Informe um e-mail válido" : ""}
                        />
                        )}
                    />
               
                    <Controller
                            name="password"
                            control={control}
                            rules={{ required: "true"  }}
                            render={({ field }) => (
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            {...field}
                            error={!!errors.password}
                            helperText={errors.password ? "Informe sua senha" : ""}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    />                                  

                    <Button type="submit" variant="contained"
                    color="secondary"
                    size="medium">
                    Entrar
                    </Button>

                    <a href="" className="text-[#818388]" >Cadastre-se</a>             

                </form>

                <Snackbar
                    open={loginError}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >

                    <Alert variant="filled" severity="error" onClose={handleCloseSnackbar} sx={{ width: '95%'  }}>
                        Login ou senha inválidos. Tente novamente!
                    </Alert>

                </Snackbar>
            </section>
            
        </main>
    )

}

export default Login


