import { useTheme } from '@emotion/react'
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
  Typography,
  useMediaQuery
} from '@mui/material'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AlertModal from '../AlertModal/AlertModal'
import PreviewProjectModal from '../PreviewProjectModal/PreviewProjectModal'
import './style.css'

export default function NewProjectModal(props) {
  // TODO: Implementar useForm

  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const { visible, onClose } = props
  const { control, getValues, reset } = useForm()
  const fileUploadRef = useRef(null)

  function handleClose() {
    reset()
    onClose()
  }
  function handleSave() {
    console.log(getValues())
    handleClose()
    setAlertModalVisible(true)
  }
  function closeAlertModal() {
    setAlertModalVisible(false)
    // TODO: Atualizar projetos da listagem
  }
  const handleOpenPreviewModal = () => {
    setPreviewModalVisible(true)
  }
  const closePreviewModal = () => {
    setPreviewModalVisible(false)
  }
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Dialog
        maxWidth={false}
        open={visible}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="container-dialog flex flex-col items-center">
          <DialogTitle sx={{ fontSize: 24, fontWeight: 400 }}>
            Adicionar projeto
          </DialogTitle>
          <DialogContent sx={{ overflow: 'hidden' }}>
            <form className="flex flex-col-reverse items-center justify-center md:flex-row gap-6 form">
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
                  <Controller
                    name="imageFile"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        multiple={false}
                        ref={fileUploadRef}
                      />
                    )}
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
                    ':hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  Visualizar publicação
                </Typography>
              </section>
              <section className="flex flex-col gap-4 w-9/12 sm:w-full items-center inputs-container">
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Título"
                      style={{ width: '100%' }}
                    />
                  )}
                />
                <Controller
                  name="tags"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tags"
                      style={{ width: '100%' }}
                    />
                  )}
                />
                <Controller
                  name="link"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Link"
                      style={{ width: '100%' }}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Descrição"
                      style={{ width: '100%' }}
                    />
                  )}
                />
              </section>
            </form>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: isSmallScreen ? 'center' : 'flex-start'
            }}
          >
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => handleSave()}
            >
              Salvar
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <AlertModal
        text="Projeto adicionado com sucesso!"
        visible={alertModalVisible}
        onClose={closeAlertModal}
      ></AlertModal>
      <PreviewProjectModal
        visible={previewModalVisible}
        onClose={closePreviewModal}
      ></PreviewProjectModal>
    </>
  )
}
