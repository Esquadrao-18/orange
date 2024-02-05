import { Alert, Button, Skeleton, Snackbar } from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import orangeAPI from '../../api/config'
import profileImg from '../../assets/profile-image.png'
import AddProjectCard from '../../components/AddProjectCard/AddProjectCard'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import { useAuth } from '../../hooks/useAuth'
import NewProjectModal from '../../modals/NewProjectModal/NewProjectModal'
import './style.css'

export const ReloadContext = createContext()

function MyProjects() {
  const { userData } = useAuth()
  const [loading, setLoading] = useState(false)
  const [errorRequest, setErrorRequest] = useState(false)

  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    setLoading(true)
    await orangeAPI
      .get(`/projects/${userData.id}`)
      .then((response) => {
        setProjects(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }
  const handleCloseSnackbar = () => {
    setErrorRequest(false)
  }
  useEffect(() => {
    getProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [modalVisible, setModalVisible] = useState(false)

  function handleOpenModalAddProject() {
    setModalVisible(true)
  }
  function handleCloseModalAddProject() {
    setModalVisible(false)
  }
  const refreshProjects = () => {
    getProjects()
  }
  const userImg = userData.picture || profileImg

  return (
    <ReloadContext.Provider value={{ reload: refreshProjects }}>
      <section className="w-screen flex flex-col px-8  ">
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
        {!loading && projects.length == 0 ? (
          <div className="flex flex-wrap gap-6 my-10 ">
            <AddProjectCard />
            <Skeleton
              variant="rectangular"
              sx={{ minWidth: 312, maxWidth: 389, height: 258 }}
            />
            <Skeleton
              variant="rectangular"
              sx={{ minWidth: 312, maxWidth: 389, height: 258 }}
            />
          </div>
        ) : (
          <ProjectsList
            projects={projects}
            isLoading={loading}
            isPersonal={true}
          />
        )}
      </section>
      <Snackbar
        open={errorRequest}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          Falha ao editar projeto!
        </Alert>
      </Snackbar>
      <NewProjectModal
        visible={modalVisible}
        onClose={handleCloseModalAddProject}
      ></NewProjectModal>
    </ReloadContext.Provider>
  )
}

export default MyProjects
