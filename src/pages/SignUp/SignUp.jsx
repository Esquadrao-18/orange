import Banner from "../../components/Banner/banner"
import signUpBanner from "../../assets/sign-up-banner.svg"
import { TextField , Button, InputAdornment, IconButton, FormHelperText } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Link } from "react-router-dom"



function SignUp () {


        const { control, handleSubmit, formState } = useForm();
        const { errors } = formState;
        const [showPassword, setShowPassword] = useState(false);



        const onSubmit = (data) => {

            console.log(data);
        };
        const handleTogglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
           


    return (
        <main className="flex">
            <section>
            <Banner src={signUpBanner} />
            </section>
           
            <section className="flex flex-col justify-center gap-8 items-center mx-auto font-sans: Roboto">
               
                <h3 className="text-2xl sm:text-5xl text-[#222244] mt-10 text-nowrap">
                    Cadastre-se
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 w-80 sm:w-full" >
               
                <div className="flex flex-col sm:flex-row gap-3">
                    <Controller
                            name="name"
                            control={control}
                            rules={{ required: true,
                                pattern: /^[A-Za-z' ]+$/,
                                minLength: 2 }}
                            render={({ field }) => (
                            <TextField
                                label="Nome*"
                                variant="outlined"
                                size="large"
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name ?  (
                                    <>
                                        Informe um nome válido (mínimo 2 caracteres).
                                        <br />
                                        Apenas letras, espaços e apóstrofos são permitidos.
                                    </>
                                ) : undefined}
                            />
                            )}
                    />

                    <Controller
                            name="surname"
                            control={control}
                            rules={{ required: true,
                            pattern: /^[A-Za-z' ]+$/,
                            minLength: 2 }}
                            render={({ field }) => (
                            <TextField
                                label="Sobrenome*"
                                variant="outlined"
                                size="large"
                                {...field}
                                error={!!errors.surname}
                                helperText={errors.surname ?  (
                                    <>
                                        Informe um sobrenome válido (mínimo 2 caracteres).
                                        <br />
                                        Apenas letras, espaços e apóstrofos são permitidos.
                                    </>
                                ) : undefined}
                            />
                            )}
                    />                                      
                </div>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true , 
                        pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/}}
                        render={({ field }) => (
                        <TextField
                            label="Email address"
                            variant="outlined"
                            size="large"
                            {...field}
                            error={!!errors.email}
                            helperText={errors.email ? "Informe um e-mail válido" : undefined}
                        />
                        )}
                    />
               
                    <Controller
                            name="password"
                            control={control}
                            rules={{ required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!#])[A-Za-z\d@$!%*?&!#]/,
                            minLength: 8 }}
                            render={({ field }) => (
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            {...field}
                            error={!!errors.password}
                            helperText={errors.password ? "Informe uma senha segura" : undefined}
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
                    <FormHelperText>Para sua segurança, a senha deve conter pelo menos:
                    <br/>
                    - Mínimo de 8 caracteres
                    <br/>
                    - Ao menos uma letra maíuscula e uma minúscula
                    <br/>
                    - Ao menos 1 número
                    <br/>
                    - Ao menos 1 caractere especial: @$!%*?&!#
    
                    </FormHelperText>                                  

                    <Button type="submit" variant="contained"
                    color="secondary"
                    size="medium">
                    CADASTRAR
                    </Button>

                    <Link to="/" className="text-[#818388]" >Já tem uma conta? Faça Login</Link>            

                </form>





            </section>
           
        </main>
    )


}


export default SignUp