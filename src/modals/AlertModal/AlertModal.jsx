import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
export default function AlertModal(props) {
  const { visible, onClose } = props

  return (
    <>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={visible}
        maxWidth={false}
      >
        <div className="flex flex-col items-center py-6 px-2 gap-6">
          <DialogTitle
            sx={{
              color: '#515255',
              fontSize: '24px',
              fontWeight: 400,
              textAlign: 'center'
            }}
          >
            {props.text}
          </DialogTitle>
          <CheckCircleIcon
            sx={{ color: '#118822', fontSize: 40 }}
          ></CheckCircleIcon>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              autoFocus
              onClick={onClose}
            >
              Voltar para projetos
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  )
}
