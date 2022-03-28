import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    card: {
      borderRadius: '1rem',
      color: '#F2F2F3',
      transition: '.4s',
      padding: '2rem 0',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#20273C',
        transition: '.4s',
      },
    },

    img: {
      height: '10rem',
      width: '10rem',
      objectFit: 'cover',
      margin: '0 auto',
      borderRadius: '.5rem',
      [theme.breakpoints.down('md')]: {
        height: '15rem',
        width: '15rem',
      },
      [theme.breakpoints.down('sm')]: {
        height: '20rem',
        width: '20rem',
      },
      [theme.breakpoints.down('xs')]: {
        height: '25rem',
        width: '25rem',
      },
      [theme.breakpoints.up('lg')]: {
        height: '8rem',
        width: '8rem',
      }
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      columnGap: '.5rem',
      justifyContent: 'center'
    },

    link: {
      textDecoration: 'none'
    },

    title: {
      color: '#f7fbfc'
    }
  }
})

export default useStyles