import NavBar from '../../components/NavBar/NavBar'

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
