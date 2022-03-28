import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginTop: '3rem',
      marginBottom: '10rem',
      maxWidth: '55rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      color: '#F2F2F3'
    },
    title: {
      fontSize: '2rem',
      textAlign: 'center',
      textTransform: 'capitalize',
      color: '#F2F2F3'
    },
    
    messageWrapper: {
      position: 'fixed',
      right: '2rem',
      bottom: '20rem',
      transition: '.5s',
      height: '3rem',
      width: '3rem',
      backgroundColor: '#20273C',
      borderRadius: '50%',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 4px 12px, rgba(0, 0, 0, 0.1) 0px 8px 28px',
      zIndex: '1'
    },
  }
})

const iconStyle = {
  width: '2em',
  height: '2rem',
  cursor: 'pointer',
  transition: '.5s',
  transform: 'translateY(25%)',
  color: '#F2F2F3'
}

export default useStyles

export { iconStyle }