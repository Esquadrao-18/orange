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
    <nav
      className="w-full flex py-4 px-[30px] items-center justify-between"
      style={{ backgroundColor: '#113' }}
    >
      <section className="flex items-center section-logo-menu">
        <IconButton
          size="large"
          edge="start"
          color="text.secondary"
          aria-label="menu"
          sx={{ mr: 1 }}
          onClick={handleOpenUserMenu}
          style={{
            visibility: isSmallScreen ? 'visible' : 'hidden',
            width: '3px'
          }}
        >
          <MenuIcon
            color="principal"
            fontSize={isSmallScreen ? 'medium' : 'large'}
          />
        </IconButton>
        <Menu
          sx={{ mt: '63px', ml: -2 }}
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
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60)', mt: -2 }}>
              Camila.ux@gmail.com
            </Typography>
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
          <Link to="/">
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Typography>Sair</Typography>
            </MenuItem>
          </Link>
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
