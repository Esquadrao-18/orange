import { useTheme } from '@emotion/react'
import { Collections } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import orangeAPI from '../../api/config'
import { ReloadContext } from '../../pages/MyProjects/MyProjects'
import AlertModal from '../AlertModal/AlertModal'
import PreviewProjectModal from '../PreviewProjectModal/PreviewProjectModal'

export default function EditProjectModal(props) {
  const { currentProject, onClose, visible } = props

  const [errorRequest, setErrorRequest] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(currentProject.img || null)

  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const { control, getValues, reset, setValue } = useForm()
  const { reload } = useContext(ReloadContext)

  const fileUploadRef = useRef(null)

  const handleCloseSnackbar = () => {
    setErrorRequest(false)
  }
  async function editProject(data) {
    return await orangeAPI.patch(`/updateProject/${currentProject.id}`, data)
  }
  async function handleEdit() {
    setIsLoading(true)

    const values = getValues()

    const projectData = {
      title: values.title,
      link: values.link,
      tags: values.tags.split(',').map((tag) => tag.trim()),
      description: values.description
    }

    await editProject(projectData)
      .then(() => {
        setIsLoading(false)
        handleClose()
        setAlertModalVisible(true)
        setSelectedImage(null)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setErrorRequest(true)
      })
  }
  const handleClose = () => {
    reset()
    onClose()
  }
  const closeAlertModal = () => {
    setAlertModalVisible(false)
    reload()
  }
  const handleOpenPreviewModal = () => {
    setPreviewModalVisible(true)
  }
  const closePreviewModal = () => {
    setPreviewModalVisible(false)
  }
  const handleImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  useEffect(() => {
    if (currentProject && visible) {
      reset(currentProject)
      setSelectedImage(currentProject.imageUrl || null)
    }
    setValue('tags', currentProject?.tags?.map((tag) => tag.name).join(', '))
  }, [currentProject, reset, visible])

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Dialog maxWidth={false} open={visible}>
        <div className="container-dialog">
          <DialogTitle sx={{ fontSize: 24, fontWeight: 400 }}>
            Editar Projeto
          </DialogTitle>
          <DialogContent>
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
                  {selectedImage ? (
                    <div
                      style={{
                        width: '100%',
                        height: 304,

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <img
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          height: 'auto',
                          width: 'auto',
                          objectFit: 'contain'
                        }}
                        src={selectedImage}
                      ></img>
                    </div>
                  ) : (
                    <>
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
                            onChange={handleImage}
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
                        <Collections
                          sx={{ fontSize: '46px', color: '#323232' }}
                        />
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
                    </>
                  )}
                </CardContent>
                <div className="flex justify-between items-center">
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
                </div>
              </section>
              <section className="flex flex-col gap-4 w-9/12 sm:w-full items-center inputs-container">
                <Controller
                  name="title"
                  control={control}
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
            <LoadingButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={isLoading}
              onClick={() => handleEdit()}
            >
              Salvar
            </LoadingButton>
            <Button color="secondary" variant="contained" onClick={handleClose}>
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
          Falha ao editar projeto!
        </Alert>
      </Snackbar>
      <AlertModal
        text="Edição concluída com sucesso!"
        visible={alertModalVisible}
        onClose={closeAlertModal}
      ></AlertModal>
      {visible && (
        <PreviewProjectModal
          visible={previewModalVisible}
          onClose={closePreviewModal}
          currentProject={getValues()}
          currentTags={getValues()?.tags?.split(',')}
          currentImage={currentProject.imageUrl}
          currentDate={currentProject.releaseDate}
        ></PreviewProjectModal>
      )}
    </>
  )
}
