import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import profileImg from '../../assets/profile-image.svg'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import './style.css'

const projects = [
  {
    id: 1,
    img: 'https://source.unsplash.com/featured/389x258',
    name: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  },
  {
    id: 2,
    img: 'https://source.unsplash.com/featured/389x258',
    name: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  },
  {
    id: 3,
    img: 'https://source.unsplash.com/featured/389x258',
    name: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  }
]

function Profile() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])
  return (
    <div className="w-screen flex flex-col px-8 profile-container ">
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
      <ProjectsList projects={projects} isLoading={loading} />
    </div>
  )
}

export default Profile
