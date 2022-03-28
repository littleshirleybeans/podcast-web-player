import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  wrapper: {
    background: 'rbg(0, 0, 0, .5)',
    color: '#F2F2F3',
    textAlign: 'center',
    cursor: 'pointer',
    transition: '.4s',
    padding: '1rem .5rem',
    borderRadius: '1rem',
    '&:hover': {
      backgroundColor: '#20273C',
      letterSpacing: '.02rem',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
    }
  },
  image: {
    borderRadius: '.5rem',
    width: '7rem',
    height: '7rem'
  },
})

export default useStyles