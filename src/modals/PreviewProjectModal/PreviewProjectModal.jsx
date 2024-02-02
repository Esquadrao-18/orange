import { Close } from '@mui/icons-material'
import {
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Typography
} from '@mui/material'
import profileImg from '../../assets/profile-image.svg'

export default function PreviewProjectModal(props) {
  const { visible, onClose } = props
  // TODO: adicionar project como uma propriedade para carregar suas informações nessa tela
  // const fileUploadRef = useRef(null) TODO: setar no src da imagem do projeto
  function handleClose() {
    onClose(false)
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
                  Camila Soares
                </p>
                <p className="" style={{ color: '#515255' }}>
                  12/12
                </p>
              </div>
            </div>
            <h3 className="text-2xl md:w-fit w-full text-center mt-2">
              Ecommerce One Page
            </h3>
            <div className="md:flex hidden">
              <Chip
                label="Typescript"
                sx={{
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontSize: '13px',
                  fontWeight: 400
                }}
              ></Chip>
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
                src="https://source.unsplash.com/featured/389x258"
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
                    Camila Soares
                  </p>
                  <p className="" style={{ color: '#515255' }}>
                    12/12
                  </p>
                </div>
              </div>
              <div>
                <Chip
                  label="Typescript"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: '13px',
                    fontWeight: 400
                  }}
                ></Chip>
              </div>
            </div>
          </DialogContent>
          <div className="flex flex-col gap-2 p-1">
            <Typography
              variant="p"
              color="#303133"
              sx={{ letterSpacing: '0.5px', lineHeight: '16px', my: 4 }}
            >
              Temos o prazer de compartilhar com vocês uma variação da nosso
              primeiro recurso gratuito, Monoceros. É um modelo de uma página
              para mostrar seus produtos. Tentamos redesenhar uma versão mais
              B2C e minimalista do nosso primeiro template de e-commerce.
            </Typography>
            <Typography variant="p" color="#0B0C0D">
              Downoad <br />
              <a
                style={{ color: '#608AE1' }}
                target="_blank"
                href="https://gumroad.com/products/wxCSL"
                rel="noreferrer"
              >
                https://gumroad.com/products/wxCSL
              </a>
            </Typography>
          </div>
        </div>
      </Dialog>
    </>
  )
}
