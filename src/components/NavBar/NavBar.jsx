import orangeLogo from '../../assets/logo-orange.svg'
import iconMenuMobile from '../../assets/menu-mobile-icon.svg'
import notificationsIcon from '../../assets/notifications-icon.svg'
import profileImg from '../../assets/profile-image.svg'
import './style.css'
function NavBar() {
  return (
    <nav className="w-full flex py-4 px-[30px] items-center justify-between nav-element">
      <section className="flex section-logo-menu">
        <img
          className="sm:hidden p-2"
          src={iconMenuMobile}
          alt="Ícone com três linhas brancas representando menu"
        />
        <img src={orangeLogo} alt="Logotipo Orange Juice Portfolio" />
        <ul className="list-none sm:flex hidden items-center flex-1 gap-6">
          <li>
            <a>Meus projetos</a>
          </li>
          <li>
            <a>Descobrir</a>
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
