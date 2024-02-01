function Banner (props) {
    return (
      
      <div className="image hidden sm:block h-screen">
        <img className="object-contain h-full" src={props.src} alt="login-banner" />
      </div>
    )
  }
  
  export default Banner