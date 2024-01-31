import Banner from "../../components/Banner/banner"
import loginBanner from "../../assets/login-banner.svg"
import { TextField , Button, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material"
import iconGoogle from "../../assets/icon-google.svg"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function Login () {

        const { control, handleSubmit, formState } = useForm();
        const { errors } = formState;
        const [showPassword, setShowPassword] = useState(false);
        const [loginError, setLoginError] = useState(false);

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
            
            <section className="flex flex-col justify-center items-center h-screen mx-auto font-sans: Roboto">
                
                <h3 className="text-2xl sm:text-5xl text-[#222244]">
                    Entre no Orange Portfólio
                </h3>

                <button className="btn btn-secondary my-8 flex text-sm p-3 items-start Neutral 
                 bg-white rounded-md shadow-md">
                    <img src={iconGoogle} className="mr-4"/>
                    <span className="font-bold text-[#0000008A]"> Entrar com o Google</span>
                </button>
                
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

                    <a className="text-[#818388]" >Cadastre-se</a>             

                </form>

                <Snackbar
                    open={loginError}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >

                    <Alert variant="filled" severity="error" onClose={handleCloseSnackbar} sx={{ width: '95%' }}>
                        Login ou senha inválidos. Tente novamente!
                    </Alert>

                </Snackbar>
            </section>
            
        </main>
    )

}

export default Login


