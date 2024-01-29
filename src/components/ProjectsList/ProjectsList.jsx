import { Skeleton, TextField } from '@mui/material'
import AddProjectCard from '../AddProjectCard/AddProjectCard'
import ProjectCard from '../ProjectCard/ProjectCard'
import './style.css'

export default function ProjectsList(props) {
  const { projects, isLoading, isPersonal } = props
  return (
    <section className="w-screen flex flex-col px-8">
      <div className="projects-area-top  sm:w-[43%]  w-full">
        {isPersonal ? (
          <h4
            className="text-xl font-medium opacity-60 mb-2"
            style={{ color: '#0b0c0d' }}
          >
            Meus projetos
          </h4>
        ) : undefined}

        <TextField fullWidth label="Buscar tags" variant="outlined" />
      </div>
      <div className="flex flex-wrap gap-6 my-10">
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width={389} height={258} />
            <Skeleton variant="rectangular" width={389} height={258} />
            <Skeleton variant="rectangular" width={389} height={258} />
            <Skeleton variant="rectangular" width={389} height={258} />
          </>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              isPersonal={isPersonal}
              key={project.id}
              img={project.img}
              tags={project.tags}
              date={project.date}
            />
          ))
        ) : (
          <AddProjectCard />
        )}
      </div>
    </section>
  )
}
