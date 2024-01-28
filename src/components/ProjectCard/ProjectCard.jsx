import { Edit } from '@mui/icons-material'
import {
  Card,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { useState } from 'react'
import profileImg from '../../assets/profile-image.svg'

export default function ProjectCard(props) {
  const { img, tags, date, first } = props
  console.log(first)
  const [element, setElement] = useState(null)

  const handleOpenSubMenu = (event) => {
    setElement(event.currentTarget)
  }
  const handleCloseSubMenu = () => {
    setElement(null)
  }
  return (
    <Card sx={{ maxWidth: 389, position: 'relative', boxShadow: 'none' }}>
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
          onClick={handleCloseSubMenu}
        >
          <Typography>Editar</Typography>
        </MenuItem>
        <MenuItem
          sx={{ ':hover': { backgroundColor: '#FEC' } }}
          onClick={handleCloseSubMenu}
        >
          <Typography>Excluir</Typography>
        </MenuItem>
      </Menu>
      <CardMedia component="img" width="389" height="258" image={img} alt="" />
      <section className="flex justify-between pt-2">
        <div className="flex items-center gap-2">
          <img src={profileImg} className="w-6 rounded-full" />
          <Typography sx={{ color: '#515255' }}>
            Camila Soares • {date}
          </Typography>
        </div>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ fontSize: 13 }} />
          ))}
        </div>
      </section>
    </Card>
  )
}
