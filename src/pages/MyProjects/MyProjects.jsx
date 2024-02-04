import { Button } from '@mui/material'
import { useState } from 'react'
import profileImg from '../../assets/profile-image.svg'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import { useAuth } from '../../hooks/useAuth'
import NewProjectModal from '../../modals/NewProjectModal/NewProjectModal'
import './style.css'
const projects = [
  {
    id: 1,
    img: 'https://source.unsplash.com/featured/389x258',
    title: 'Nome ',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['Web']
  },
  {
    id: 2,
    img: 'https://source.unsplash.com/featured/389x258',
    title: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['cobol']
  },
  {
    id: 3,
    img: 'https://source.unsplash.com/featured/389x258',
    title: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  }
]

function MyProjects() {
  const { userData } = useAuth()

  const [modalVisible, setModalVisible] = useState(false)

  function handleOpenModalAddProject() {
    setModalVisible(true)
  }
  function handleCloseModalAddProject() {
    setModalVisible(false)
  }

  const userImg = userData.picture || profileImg

  return (
    <>
      <section className="w-screen flex flex-col px-8 items-center ">
        <section className="w-full flex items-center justify-center gap-[42px] sm:py-28 user-container ">
          <figure>
            <img
              className="rounded-full"
              src={userImg}
              alt="Avatar de uma garota no estilo Pixar"
            />
          </figure>
          <div className="user-infos">
            <h5 className="text-2xl mb-4" style={{ color: '#303133' }}>
              {userData?.name}&nbsp;{userData?.lastName}
            </h5>
            <p className="mb-6 opacity-50	">Brasil</p>
            <Button
              onClick={handleOpenModalAddProject}
              disabled={projects.length > 0 ? false : true}
              className="font-medium"
              color="secondary"
              variant="contained"
              sx={{ ':disabled': { color: 'rgba(0, 0, 0, 0.38)' } }}
            >
              Adicionar Projeto
            </Button>
          </div>
        </section>
        <ProjectsList projects={projects} isPersonal={true} />
      </section>
      <NewProjectModal
        visible={modalVisible}
        onClose={handleCloseModalAddProject}
      ></NewProjectModal>
    </>
  )
}

export default MyProjects
