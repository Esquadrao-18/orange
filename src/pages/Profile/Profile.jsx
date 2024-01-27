import { Button, TextField } from '@mui/material'
import profileImg from '../../assets/profile-image.svg'
import './style.css'

// const personalProjects = [
//   {

//   },
//   {

//   },
//   {

//   }
// ]

function Profile() {
  return (
    <div className="w-screen flex flex-col justify-center px-8 gap-14 profile-container">
      <section className="w-full flex items-center justify-center gap-[42px] sm:py-28 user-container ">
        <figure>
          <img
            className="rounded-full"
            src={profileImg}
            alt="Avatar de uma garota no estilo Pixar"
          />
        </figure>
        <div className="user-infos">
          <h5 className="text-2xl mb-4">Camila Soares</h5>
          <p className="mb-6 opacity-50	">Brasil</p>
          <Button
            disabled
            className="font-medium"
            color="secondary"
            variant="contained"
          >
            Adicionar Projeto
          </Button>
        </div>
      </section>
      <section className="w-[45%] flex flex-col projects-area">
        <div className="projects-area-top">
          <h4 className="text-xl font-medium opacity-60">Meus projetos</h4>
          <TextField fullWidth label="Buscar tags" variant="outlined" />
        </div>
      </section>
    </div>
  )
}

export default Profile
