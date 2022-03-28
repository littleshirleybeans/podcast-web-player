import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '80vh',
      backgroundColor: '#09091B',
      color: '#F2F2F3',
      boxShadow: '1rem',
      padding: '2rem',
      overflow: 'auto',
      borderRadius: '.5rem',
      whiteSpace: 'pre-line',
      [theme.breakpoints.down('xs')]: {
        width : '80vw'
      }
    }
  }
})

export default useStyles