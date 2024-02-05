import { Close } from '@mui/icons-material'
import {
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Typography
} from '@mui/material'
import profileImg from '../../assets/profile-image.png'
import { useAuth } from '../../hooks/useAuth'

export default function PreviewProjectModal(props) {
  const {
    visible,
    onClose,
    currentImage,
    currentProject,
    currentTags,
    currentDate
  } = props
  const { userData } = useAuth()
  function handleClose() {
    onClose(false)
  }
  const handleDate = (data) => {
    const originDate = new Date(data)
    const month = ('0' + (originDate.getUTCMonth() + 1)).slice(-2)
    const year = originDate.getUTCFullYear()
    return `${month}/${year}`
  }
  return (
    <>
      <Dialog maxWidth={false} open={visible}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <Close></Close>
        </IconButton>
        <div className="container-dialog py-4 px-1 mx-[-1] h-full flex flex-col overflow-x-hidden">
          <section className="flex justify-between items-center">
            <div className="gap-2 items-center md:flex hidden ">
              <figure>
                <img className="w-10 rounded-full" src={profileImg} />
              </figure>
              <div className="flex flex-col">
                <p className="font-semibold" style={{ color: '#303133' }}>
                  {currentProject.userName ||
                    `${userData.name} ${userData.lastName}`}
                </p>
                <p style={{ color: '#515255' }}>{handleDate(currentDate)}</p>
              </div>
            </div>
            <h3 className="text-2xl md:w-fit w-full text-center mt-2">
              {currentProject?.title}
            </h3>
            <div className="md:flex hidden">
              {currentTags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: '13px',
                    fontWeight: 400
                  }}
                ></Chip>
              ))}
            </div>
          </section>
          <DialogContent sx={{ padding: '2 3' }}>
            <figure className="flex justify-center">
              <img
                className="w-full"
                style={{
                  maxWidth: '838px',
                  minWidth: '260px',
                  minHeight: '258px',
                  maxHeight: '430px'
                }}
                src={currentImage}
                alt="Imagem do projeto"
              />
            </figure>
            <div className="md:hidden flex justify-between mt-2">
              <div className="flex gap-2 items-center">
                <figure>
                  <img className="w-10 rounded-full" src={profileImg} />
                </figure>
                <div className="flex flex-col">
                  <p className="font-semibold" style={{ color: '#303133' }}>
                    {}
                  </p>
                  <p className="" style={{ color: '#515255' }}>
                    12/12
                  </p>
                </div>
              </div>
              <div>
                {currentTags?.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{
                      color: 'rgba(0, 0, 0, 0.87)',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  ></Chip>
                ))}
              </div>
            </div>
          </DialogContent>
          <div className="flex flex-col gap-2 p-1">
            <Typography
              variant="p"
              color="#303133"
              sx={{ letterSpacing: '0.5px', lineHeight: '16px', my: 4 }}
            >
              {currentProject?.description}
            </Typography>
            <Typography variant="p" color="#0B0C0D">
              Download <br />
              <a
                style={{ color: '#608AE1' }}
                target="_blank"
                href={currentProject?.link}
                rel="noreferrer"
              >
                {currentProject?.link}
              </a>
            </Typography>
          </div>
        </div>
      </Dialog>
    </>
  )
}
