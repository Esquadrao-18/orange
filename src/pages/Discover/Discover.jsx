import { useEffect, useState } from 'react'
import orangeAPI from '../../api/config'
import ProjectsList from '../../components/ProjectsList/ProjectsList'
import './style.css'
const projects = [
  {
    id: 1,
    img: 'https://source.unsplash.com/featured/389x258',
    name: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  },
  {
    id: 2,
    img: 'https://source.unsplash.com/featured/389x258',
    name: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  },
  {
    id: 3,
    img: 'https://source.unsplash.com/featured/389x258',
    name: 'Nome Projeto',
    link: 'github.com/algumacoisa',
    description: 'Esse é meu projeto',
    date: '12/12',
    tags: ['UX', 'Web']
  }
]

function Discover() {
  const [loading, setLoading] = useState(false)

  const getProjects = async () => {
    setLoading(true)
    const response = await orangeAPI.get('/projects')
    console.log(response)
    setLoading(false)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <section className="w-screen flex flex-col px-8 items-center discover-container">
      <section className="w-full flex items-center justify-center gap-[42px] sm:py-28 user-container ">
        <h2
          className="text-center"
          style={{ fontSize: '24px', lineHeight: '24px' }}
        >
          Junte-se à comunidade de inovação, inspiração e descobertas,
          transformando experiências em conexões inesquecíveis
        </h2>
      </section>
      <ProjectsList
        projects={projects}
        isLoading={loading}
        isPersonal={false}
      />
    </section>
  )
}
export default Discover
