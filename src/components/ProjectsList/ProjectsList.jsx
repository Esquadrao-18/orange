import { Skeleton, TextField } from '@mui/material'
import { createContext, useState } from 'react'
import DeleteProjectModal from '../../modals/DeleteProjectModal/DeleteProjectModal'
import EditProjectModal from '../../modals/EditModal/EditProjectModal'
import ProjectCard from '../ProjectCard/ProjectCard'
import './style.css'

export const ProjectContext = createContext(null)

export default function ProjectsList(props) {
  const { projects, isPersonal, isLoading } = props
  const [filteredProjects, setFilteredProjects] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedProject, setSelectedProject] = useState({})
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  function handleOpenEditModal(project) {
    setSelectedProject(project)
    setEditModalVisible(true)
  }
  function handleCloseEditModal() {
    setEditModalVisible(false)
  }
  function handleCloseDeleteModal() {
    setDeleteModalVisible(false)
  }
  function handleOpenDeleteModal(project) {
    setSelectedProject(project)
    setDeleteModalVisible(true)
  }

  function findProjectsByTag(search) {
    if (search == '') {
      setIsSearching(false)
    } else {
      setIsSearching(true)
    }
    const filtered = projects.filter((project) =>
      project.tags.some((tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase())
      )
    )
    setFilteredProjects(filtered)
  }

  const currentProjects = isSearching ? filteredProjects : projects
  return (
    <>
      <ProjectContext.Provider
        value={{
          handleEditModal: handleOpenEditModal,
          handleDeleteModal: handleOpenDeleteModal
        }}
      >
        <section className="w-screen flex flex-col px-8 h-full">
          <div className="projects-area-top  sm:w-[43%]  w-full">
            {isPersonal ? (
              <h4
                className="text-xl font-medium opacity-60 mb-2"
                style={{ color: '#0b0c0d' }}
              >
                Meus projetos
              </h4>
            ) : undefined}

            <TextField
              fullWidth
              label="Buscar tags"
              variant="outlined"
              onChange={(e) => findProjectsByTag(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-6 my-10 justify-center sm:justify-normal">
            {isLoading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  sx={{ minWidth: 312, maxWidth: 389, height: 258 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ minWidth: 312, maxWidth: 389, height: 258 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ minWidth: 312, maxWidth: 389, height: 258 }}
                />
              </>
            ) : (
              currentProjects.map((project) => (
                <ProjectCard
                  isPersonal={isPersonal}
                  key={project.id}
                  project={project}
                />
              ))
            )}
          </div>
        </section>
      </ProjectContext.Provider>
      {isPersonal && (
        <>
          <EditProjectModal
            currentProject={selectedProject}
            visible={editModalVisible}
            onClose={handleCloseEditModal}
          />
          <DeleteProjectModal
            currentProject={selectedProject}
            visible={deleteModalVisible}
            onClose={handleCloseDeleteModal}
          ></DeleteProjectModal>{' '}
        </>
      )}
    </>
  )
}
