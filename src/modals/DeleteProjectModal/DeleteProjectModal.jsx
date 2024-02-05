import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import orangeAPI from '../../api/config'
import { ReloadContext } from '../../pages/MyProjects/MyProjects'
import AlertModal from '../AlertModal/AlertModal'

export default function DeleteProjectModal(props) {
  const { onClose, visible, currentProject } = props
  const [errorRequest, setErrorRequest] = useState(false)

  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const { reload } = useContext(ReloadContext)
  const [isLoading, setIsLoading] = useState(false)
  const handleCloseSnackbar = () => {
    setErrorRequest(false)
  }

  const closeAlertModal = () => {
    setAlertModalVisible(false)
    reload()
  }
  const handleDelete = async (id) => {
    setIsLoading(true)
    await orangeAPI
      .delete(`/deleteProject/${id}`)
      .then(() => {
        onClose()
        setAlertModalVisible(true)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setErrorRequest(true)
      })
  }

  const handleClose = () => {
    onClose()
  }
  return (
    <>
      <Dialog aria-labelledby="customized-dialog-title" open={visible}>
        <div className="flex flex-col my-8 mx-10  gap-4">
          <DialogTitle
            sx={{
              color: '#515255',
              fontSize: '24px',
              fontWeight: 400,
              padding: 0
            }}
          >
            Deseja Excluir?
          </DialogTitle>
          <Typography sx={{ color: '#515255', padding: 0 }}>
            Se você prosseguir irá excluir o projeto do seu portfólio
          </Typography>
          <DialogActions sx={{ justifyContent: 'flex-start', padding: 0 }}>
            <LoadingButton
              variant="contained"
              color="secondary"
              loading={isLoading}
              onClick={() => handleDelete(currentProject.id)}
            >
              Excluir
            </LoadingButton>
            <Button
              color="secondary"
              variant="contained"
              autoFocus
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
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
          Falha ao excluir projeto!
        </Alert>
      </Snackbar>
      <AlertModal
        text="Projeto deletado com sucesso!"
        visible={alertModalVisible}
        onClose={closeAlertModal}
      ></AlertModal>
    </>
  )
}
