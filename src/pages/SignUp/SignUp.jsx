import { TextField , Button, InputAdornment, IconButton } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'



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
            </section>
           
            <section className="flex flex-col justify-center gap-8 items-center h-screen mx-auto font-sans: Roboto">
               
                <h3 className="text-2xl sm:text-5xl text-[#222244] text-nowrap">
                    Cadastre-se
                </h3>


                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 w-full" >
               
                <div className="flex flex-col sm:flex-row gap-3">
                    <Controller
                            name="name"
                            control={control}
                            rules={{ required: true}}
                            render={({ field }) => (
                            <TextField
                                label="Nome*"
                                variant="outlined"
                                size="large"
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name ?  "Campo nome obrigatório" : ""}

                            />
                            )}
                        />


                    <Controller
                            name="surname"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                            <TextField
                                label="Sobrenome*"
                                variant="outlined"
                                size="large"
                                {...field}
                                error={!!errors.surname}
                                helperText={errors.surname ?  "Sobrenome obrigatório" : ""}

                            />
                            )}
                        />                                      
                </div>
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
                    CADASTRAR
                    </Button>

                    <a href="" className="text-[#818388]" >Já tem uma conta? Faça Login</a>            

                </form>





            </section>
           
        </main>
    )


}


export default SignUp