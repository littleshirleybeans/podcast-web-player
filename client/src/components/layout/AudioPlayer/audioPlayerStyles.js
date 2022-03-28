import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
  return {
    container: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex'
    },
    mediaPlayer: {
      postion: 'relative',
      transition: '.4s',
    },
    img: {
      width: "5rem",
      [theme.breakpoints.down('sm')]: {
        width: '6rem'
      },
      [theme.breakpoints.down('xs')]: {
        width: 0
      }
    },
  }
})

const iconStyle = {
  position: 'absolute',
  color: '#F2F2F3',
  cursor: 'pointer',
  right: '.2rem',
  top: '.2rem'
}

export default useStyles

export { iconStyle }