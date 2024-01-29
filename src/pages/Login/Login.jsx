import Banner from "../../components/Banner/banner"
import loginBanner from "../../assets/login-banner.svg"
import { TextField , Button } from "@mui/material"
import iconGoogle from "../../assets/icon-google.svg"
import { useForm, Controller } from "react-hook-form"   

function Login () {

        const { control, handleSubmit, formState } = useForm();
        const { errors } = formState;
    
        const onSubmit = (data) => {
        console.log(data);
        }

    return (
        <main className="flex">
            <section>
                <Banner src={loginBanner} />
            </section>
            
            <section className="flex flex-col justify-center items-center h-screen mx-auto font-sans: Roboto">
                
                <h3 className="text-2xl sm:text-5xl" style={{ color: '#222244'}}>
                    Entre no Orange Portfólio
                </h3>

                <button className="btn btn-secondary my-8 flex text-sm p-3 items-start Neutral 
                 bg-white rounded-md shadow-md">
                    <img src={iconGoogle} className="mr-4"/>
                    <span className="font-bold" style={{color: '#0000008A'}}> Entrar com o Google</span>
                </button>
                
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 w-80 sm:w-full" >

                    <h5 className="lg:text-2xl pb-2" style={{ color: '#515255'}}>
                        Faça login com email
                    </h5>
                    
                    <Controller 
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                        
                        <TextField
                            label="Email address"
                            variant="outlined"
                            size="large"
                            {...field}
                            error={!!errors.email}
                        />
                        )}
                    />

                     <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...field}
                            error={!!errors.password}
                        />
                    )}
                />

                    <Button type="submit" variant="contained"
                    color="secondary"
                    size="medium">
                    Entrar
                    </Button>

                    <a href="" style={{ color: '#818388'}} >Cadastre-se</a>             

                </form>

            </section>
            
        </main>
    )

}
export default Login


