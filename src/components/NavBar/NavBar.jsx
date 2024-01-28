import { useTheme } from '@emotion/react'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import orangeLogo from '../../assets/logo-orange.svg'
import notificationsIcon from '../../assets/notifications-icon.svg'
import profileImg from '../../assets/profile-image.svg'
import './style.css'

function NavBar() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <nav className="w-full flex py-4 px-[30px] items-center justify-between nav-element">
      <section className="flex section-logo-menu items-center">
        <IconButton
          size="large"
          edge="start"
          color="text.secondary"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleOpenUserMenu}
          style={{ visibility: isSmallScreen ? 'visible' : 'hidden' }}
        >
          <MenuIcon color="principal" fontSize="large" />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography>Camila</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography>camila.ux@gmail.com</Typography>
          </MenuItem>
          <Divider />
          <Link to="/meus-projetos">
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Projetos</Typography>
            </MenuItem>
          </Link>
          <Link to="/descobrir">
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Descobrir</Typography>
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <Typography>Sair</Typography>
          </MenuItem>
        </Menu>
        <Link to="/">
          <img src={orangeLogo} alt="Logotipo Orange Juice Portfolio" />
        </Link>

        <ul className="list-none sm:flex hidden items-center flex-1 gap-6">
          <li>
            <Link to="/meus-projetos">Meus Projetos</Link>
          </li>
          <li>
            <Link to="/descobrir">Descobrir</Link>
          </li>
        </ul>
      </section>
      <section className="flex gap-4">
        <img
          className="w-10 rounded-full"
          src={profileImg}
          alt="Avatar de uma garota no estilo Pixar"
        />
        <img
          src={notificationsIcon}
          alt="Ícone de sino preenchido na cor branca"
        />
      </section>
    </nav>
  )
}

export default NavBar
