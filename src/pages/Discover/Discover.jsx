import { Snackbar } from '@mui/base'
import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import orangeAPI from '../../api/config'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import './style.css'

function Discover() {
  const [loading, setLoading] = useState(false)
  const [errorRequest, setErrorRequest] = useState(false)

  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    setLoading(true)
    await orangeAPI
      .get('/projects')
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
  }, [])

  return (
    <section className="w-screen flex flex-col px-8 items-center discover-container">
      <section className="w-full flex items-center justify-center gap-[42px] sm:py-28 user-container ">
        <h2
          className="text-center"
          style={{ fontSize: '24px', lineHeight: '24px' }}
        >
          Junte-se à comunidade de inovação, inspiração e descobertas,
          transformando experiências em conexões inesquecíveis
        </h2>
      </section>

      <ProjectsList
        projects={projects}
        isLoading={loading}
        isPersonal={false}
      />

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
    </section>
  )
}
export default Discover
