import Banner from "../../components/Banner/banner"
import loginBanner from "../../assets/login-banner.svg"

function Login () {
    return (
        <main className="flex">
            <section className="">
                <Banner src={loginBanner} />
            </section>
            
        </main>
    )

}
export default Login


