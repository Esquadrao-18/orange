import { Collections } from '@mui/icons-material'
import { CardContent, IconButton, Typography } from '@mui/material'

export default function AddProjectCard() {
  return (
    <CardContent
      sx={{
        padding: 4,
        backgroundColor: '#E6E9F2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 389,
        height: 258,
        gap: '16px'
      }}
    >
      <IconButton
        disableRipple={true}
        sx={{
          ':hover': { backgroundColor: 'transparent' }
        }}
      >
        <Collections sx={{ fontSize: '46px', color: '#323232' }} />
      </IconButton>
      <Typography sx={{ fontSize: 16, opacity: 0.6 }} gutterBottom>
        Adicione seu primeiro projeto
      </Typography>
      <Typography
        sx={{ fontSize: 14, opacity: 0.6, width: 270 }}
        component="div"
      >
        Compartilhe seu talento com milhares de pessoas
      </Typography>
    </CardContent>
  )
}
