import { useTheme } from '@emotion/react'
import { Edit } from '@mui/icons-material'
import {
  Card,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useContext, useState } from 'react'
import profileImg from '../../assets/profile-image.svg'
import PreviewProjectModal from '../../modals/PreviewProjectModal/PreviewProjectModal'
import { ProjectContext } from '../ProjectsList/ProjectsList'

export default function ProjectCard(props) {
  const { project, isPersonal } = props
  const [element, setElement] = useState(null)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const projectContext = useContext(ProjectContext)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const infosUserStyle = {
    width: '105px',
    display: 'flex',
    flexDirection: 'column'
  }

  function handleEditClick() {
    projectContext.handleEditModal({ tags: project.tags })
    handleCloseSubMenu()
  }
  function handleDeleteClick() {
    projectContext.handleDeleteModal({})
    handleCloseSubMenu()
  }

  const cardUser = () => {
    return (
      <>
        <Typography sx={{ color: isSmallScreen ? '#303133' : '#515255' }}>
          Camila Soares
        </Typography>
        {isSmallScreen ? undefined : (
          <Typography sx={{ color: '#515255' }}>&nbsp;•&nbsp;</Typography>
        )}
        <Typography sx={{ color: '#515255' }}>{project.date}</Typography>
      </>
    )
  }

  const handleOpenSubMenu = (event) => {
    setElement(event.currentTarget)
  }
  const handleCloseSubMenu = () => {
    setElement(null)
  }
  const handleOpenPreviewModal = () => {
    setPreviewModalVisible(true)
  }
  const closePreviewModal = () => {
    setPreviewModalVisible(false)
  }
  return (
    <>
      <Card
        sx={{
          maxWidth: 389,
          position: 'relative',
          boxShadow: 'none'
        }}
      >
        {isPersonal ? (
          <>
            {' '}
            <IconButton
              sx={{ position: 'absolute', right: 0 }}
              onClick={handleOpenSubMenu}
            >
              <Edit
                sx={{
                  color: '#303133',
                  backgroundColor: '#FFCC99',
                  borderRadius: '50%',
                  fontSize: '28px',
                  padding: '0.8px'
                }}
              />
            </IconButton>
            <Menu
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.30)',
                  mt: 1.5,
                  '& .MuiMenu-list': {
                    minWidth: 208,
                    minHeight: 104,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px 0px'
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              color="secondary"
              sx={{
                mt: '28px',
                ml: '-16px',
                gap: '8px',
                padding: '90px'
              }}
              id="menu-appbar"
              anchorEl={element}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(element)}
              onClose={handleCloseSubMenu}
            >
              <MenuItem
                sx={{ ':hover': { backgroundColor: '#FEC' } }}
                onClick={() => handleEditClick()}
              >
                <Typography>Editar</Typography>
              </MenuItem>
              <MenuItem
                sx={{ ':hover': { backgroundColor: '#FEC' } }}
                onClick={() => handleDeleteClick()}
              >
                <Typography>Excluir</Typography>
              </MenuItem>
            </Menu>{' '}
          </>
        ) : undefined}

        <CardMedia
          onClick={handleOpenPreviewModal}
          component="img"
          width="389"
          height="258"
          image={project.img}
          sx={{ ':hover': { cursor: 'pointer' } }}
          alt="Imagem do projeto"
        />
        <section className="flex justify-between pt-2">
          <div className="flex items-center gap-2">
            <img src={profileImg} className="w-6 rounded-full" />

            <div
              className="flex"
              style={isSmallScreen ? infosUserStyle : undefined}
            >
              {cardUser()}
            </div>
          </div>
          {isPersonal ? (
            <div className="flex gap-2">
              {project.tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ fontSize: 13 }} />
              ))}
            </div>
          ) : undefined}
        </section>
      </Card>
      <PreviewProjectModal
        visible={previewModalVisible}
        onClose={closePreviewModal}
      ></PreviewProjectModal>
    </>
  )
}
