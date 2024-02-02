import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography
} from '@mui/material'
import { useState } from 'react'
import AlertModal from '../AlertModal/AlertModal'

export default function DeleteProjectModal(props) {
  const { onClose, visible, currentProject } = props
  const [alertModalVisible, setAlertModalVisible] = useState(false)

  const closeAlertModal = () => {
    setAlertModalVisible(false)
  }
  const handleDelete = (id) => {
    // TODO: após resposta
    console.log('Deletar projeto do seguinte id:', id)
    onClose()
    setAlertModalVisible(true)
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
            <Button
              color="secondary"
              variant="contained"
              autoFocus
              onClick={() => handleDelete(currentProject.id)}
            >
              Excluir
            </Button>
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
      <AlertModal
        text="Projeto deletado com sucesso!"
        visible={alertModalVisible}
        onClose={closeAlertModal}
      ></AlertModal>
    </>
  )
}
