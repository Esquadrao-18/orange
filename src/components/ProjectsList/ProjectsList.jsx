import { Skeleton, TextField } from '@mui/material'
import AddProjectCard from '../AddProjectCard/AddProjectCard'
import ProjectCard from '../ProjectCard/ProjectCard'

export default function ProjectsList(props) {
  const { projects, isLoading } = props
  return (
    <section className="w-screen flex flex-col px-20 projects-area">
      <div className="projects-area-top w-[43%]">
        <h4 className="text-xl font-medium opacity-60 mb-2">Meus projetos</h4>
        <TextField fullWidth label="Buscar tags" variant="outlined" />
      </div>
      <div className="projects-list flex flex-wrap gap-6 my-10">
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
