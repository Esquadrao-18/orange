import { Collections } from '@mui/icons-material'
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { useRef, useState } from 'react'
import AlertModal from '../AlertModal/AlertModal'
import PreviewProjectModal from '../PreviewProjectModal/PreviewProjectModal'

export default function EditProjectModal(props) {
  // TODO: Implementar useForm
  const { currentProject, onClose, visible } = props
  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const fileUploadRef = useRef(null)

  const handleEdit = () => {
    onClose()
    setAlertModalVisible(true)
  }
  const handleClose = () => {
    onClose()
  }
  const closeAlertModal = () => {
    setAlertModalVisible(false)
    // TODO: Atualizar projeto com novas alterações
  }
  const handleOpenPreviewModal = () => {
    setPreviewModalVisible(true)
  }
  const closePreviewModal = () => {
    setPreviewModalVisible(false)
  }
  return (
    <>
      <Dialog maxWidth={false} open={visible}>
        <div className="container-dialog">
          <DialogTitle sx={{ fontSize: 24, fontWeight: 400 }}>
            Editar Projeto
          </DialogTitle>
          <DialogContent>
            <form
              // onSubmit={handleSubmit(project)}
              className="flex flex-col-reverse items-center justify-center md:flex-row gap-6 form"
              style={{}}
            >
              <section className="w-full">
                <DialogContentText
                  sx={{
                    color: '#515255',
                    fontSize: '16px',
                    fontWeight: 400,
                    mb: '8px'
                  }}
                >
                  Selecione o conteúdo que você deseja fazer upload
                </DialogContentText>

                <CardContent
                  sx={{
                    padding: 4,
                    backgroundColor: '#E6E9F2',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    maxWidth: 389,
                    height: 304,
                    minWidth: '100%'
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    type="file"
                    id="input-file"
                    ref={fileUploadRef}
                  />
                  <IconButton
                    onClick={() =>
                      fileUploadRef.current && fileUploadRef.current.click()
                    }
                    disableRipple={true}
                    sx={{
                      ':hover': { backgroundColor: 'transparent' }
                    }}
                  >
                    <Collections sx={{ fontSize: '46px', color: '#323232' }} />
                  </IconButton>

                  <Typography
                    sx={{
                      fontSize: 14,
                      opacity: 0.6,
                      maxWidth: 270,
                      minWidth: 200
                    }}
                    component="div"
                  >
                    Compartilhe seu talento com milhares de pessoas
                  </Typography>
                </CardContent>
                <Typography
                  onClick={handleOpenPreviewModal}
                  sx={{
                    color: '#515255',
                    fontWeight: 400,
                    fontSize: '16px',
                    mt: '8px',
                    ':hover': { cursor: 'pointer' }
                  }}
                >
                  Visualizar publicação
                </Typography>
              </section>
              <section className="flex flex-col gap-4 w-9/12 sm:w-full items-center inputs-container">
                <TextField
                  label="Título"
                  fullWidth
                  variant="outlined"
                ></TextField>
                <TextField
                  label="Tags"
                  fullWidth
                  variant="outlined"
                ></TextField>
                <TextField
                  label="Link"
                  fullWidth
                  variant="outlined"
                ></TextField>
                <TextField
                  label="Descrição"
                  fullWidth
                  variant="outlined"
                  multiline={true}
                  rows={3}
                ></TextField>
              </section>
            </form>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button color="secondary" variant="contained" onClick={handleEdit}>
              Salvar
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <AlertModal
        text="Edição concluída com sucesso!"
        visible={alertModalVisible}
        onClose={closeAlertModal}
      ></AlertModal>
      <PreviewProjectModal
        visible={previewModalVisible}
        onClose={closePreviewModal}
      ></PreviewProjectModal>
    </>
    // project={project} TODO: passar o form como propriedade
  )
}
