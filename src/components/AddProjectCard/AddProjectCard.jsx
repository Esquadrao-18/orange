import { Collections } from '@mui/icons-material'
import { CardContent, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import NewProjectModal from '../../modals/NewProjectModal/NewProjectModal'

export default function AddProjectCard(props) {
  const { isModal } = props
  const [modalVisible, setModalVisible] = useState(false)
  function handleOpenModalAddProject() {
    setModalVisible(true)
  }
  function handleCloseModalAddProject() {
    setModalVisible(false)
  }

  return (
    <>
      <CardContent
        sx={{
          padding: 4,
          backgroundColor: '#E6E9F2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 312,
          maxWidth: 389,
          height: 258,
          gap: '16px'
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          multiple
          type="file"
        />
        <IconButton
          onClick={() => handleOpenModalAddProject()}
          disableRipple={true}
          sx={{
            ':hover': { backgroundColor: 'transparent' }
          }}
        >
          <Collections sx={{ fontSize: '46px', color: '#323232' }} />
        </IconButton>
        {isModal ? undefined : (
          <Typography sx={{ fontSize: 16, opacity: 0.6 }} gutterBottom>
            Adicione seu primeiro projeto
          </Typography>
        )}

        <Typography
          sx={{ fontSize: 14, opacity: 0.6, width: 270 }}
          component="div"
        >
          Compartilhe seu talento com milhares de pessoas
        </Typography>
      </CardContent>
      <NewProjectModal
        visible={modalVisible}
        onClose={handleCloseModalAddProject}
      />
    </>
  )
}
