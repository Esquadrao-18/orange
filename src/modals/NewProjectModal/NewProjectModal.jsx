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
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AlertModal from '../AlertModal/AlertModal'
import PreviewProjectModal from '../PreviewProjectModal/PreviewProjectModal'
import './style.css'

import orangeAPI from '../../api/config'
import { useAuth } from '../../hooks/useAuth'

export default function NewProjectModal(props) {
  const { userData } = useAuth()
  const [errorRequest, setErrorRequest] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const { visible, onClose } = props
  const { control, getValues, reset } = useForm()

  // const { reload } = useContext(ReloadContext)
  const fileUploadRef = useRef(null)

  async function createProject(data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return await orangeAPI.post('/createProject', data, config)
  }
  const handleCloseSnackbar = () => {
    setErrorRequest(false)
  }
  function handleClose() {
    reset()
    onClose()
    setSelectedImage(null)
  }
  async function handleSave() {
    setIsLoading(true)
    const values = getValues()
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('link', values.link)
    const tempTags = values.tags.split(',')
    tempTags.forEach((tag) => {
      formData.append('tags[]', tag.trim())
    })
    formData.append('description', values.description)
    formData.append('image', selectedImage)
    formData.append('releaseDate', new Date().toISOString())
    formData.append('userId', userData.id)

    await createProject(formData)
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
  function closeAlertModal() {
    setAlertModalVisible(false)
  }
  const handleOpenPreviewModal = () => {
    setPreviewModalVisible(true)
  }
  const closePreviewModal = () => {
    setPreviewModalVisible(false)
  }
  const handleImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
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
        <div className="container-dialog ">
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
                    padding: selectedImage ? 0 : 4,
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
                        src={URL.createObjectURL(selectedImage)}
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
                      inputProps={{ maxLength: 21 }}
                      placeholder="ex: Web, Machine Learning"
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
                      placeholder="ex: https://www.seusite.com"
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
              Falha ao criar projeto!
            </Alert>
          </Snackbar>
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
              onClick={() => handleSave()}
            >
              Salvar
            </LoadingButton>
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
        currentProject={getValues()}
        currentTags={getValues().tags?.split(',')}
        currentImage={selectedImage ? URL.createObjectURL(selectedImage) : null}
        currentDate={new Date()}
      ></PreviewProjectModal>
    </>
  )
}
