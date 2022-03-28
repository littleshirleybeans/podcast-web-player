import { makeStyles } from '@material-ui/styles';
import { styled } from "@mui/material"
import { Skeleton } from "@mui/material"

const useStyles = makeStyles((theme) => {
  return {
    loadingPage: {
      marginTop: '3rem',
      marginBottom: '10rem',
      maxWidth: '55rem',
    },
    page: {
      marginTop: '3rem',
      marginBottom: '10rem',
      maxWidth: '55rem',
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },

    img: {
      flex: '0 1 20vw',
      height: '18vw',
      background: '#1A1A2B',
      borderRadius: '.8rem',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 4px 12px, rgba(0, 0, 0, 0.1) 0px 8px 28px',
      [theme.breakpoints.down('xl')]: {
        flex: '0 0 10vw',
        height: '10vw'
      },
      [theme.breakpoints.down('lg')]: {
        flex: '0 0 20vw',
        height: '20vw'
      },
      [theme.breakpoints.down('md')]: {
        flex: '0 0 25vw',
        height: '25vw'
      },
      [theme.breakpoints.down('sm')]: {
        flex: '0 0 30vw',
        height: '30vw'
      },
      [theme.breakpoints.down('xs')]: {
        flex: '0 0 70vw',
        width: '80%',
        margin: '0 auto'
      },
    },

    wrapper: {
      position: 'relative',
      display: "flex",
      gap: '1rem',
      justifyContent: 'center',
      background: '#1A1A2B',
      borderRadius: '.8rem',
      width: '100%',
      flex: '1 1 23vw',
      color: '#F2F2F3',
      // boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
      [theme.breakpoints.down('xl')]: {
        flex: '1 1 16vw',
      },
      [theme.breakpoints.down('lg')]: {
        flex: '1 1 16vw',
      },
      [theme.breakpoints.down('md')]: {
        flex: '1 1 35vw',
      },
      [theme.breakpoints.down('sm')]: {
        flex: '1 1 15rem',
      },
      [theme.breakpoints.down('xs')]: {
        flex: 0,
        margin: '0 auto'
      }
    },

    content: {
      padding: '1rem 2rem',
      display: "flex",
      flexDirection: 'column',
      gap: '.5rem',
      width: '100%',
    },

    desc: {
      padding: '.5rem 0',
      whiteSpace: 'pre-line',
    },

    genresContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '.5rem',
    },
    genres: {
      fontSize: '.8rem',
      fontWeight: '500',
      padding: '.2em .8em',
      background: '#EE423F',
      color: '#f7fbfc',
      borderRadius: '.8rem',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px'
    },
    
    sub: {
      position: 'absolute',
      top: '0rem',
      right: '0rem',
      cursor: 'pointer'
    },

    skeletonWrapper: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
  }
})

const iconStyle = { 
  height: '3rem', 
  width: '3rem', 
  color: '#5395FD',
  opacity: '.8',
  cursor: 'pointer',
  '&:hover': {
    opacity: '1'
  }
}

const Skeleton1 = styled(Skeleton)(({ theme }) => ({
  flex: '0 0 15rem',
  height: '15rem',
  background: 'rgba(225,225,225,.1)',
  borderRadius: '.8rem',
  [theme.breakpoints.down('md')]: {
    flex: '0 0 20rem',
    height: '20rem'
  },
  [theme.breakpoints.down('sm')]: {
    flex: '0 0 20rem',
    height: '20rem'
  },
  [theme.breakpoints.down('xs')]: {
    flex: '0 0 35rem',
  },
}));

const Skeleton2 = styled(Skeleton)(({ theme }) => ({
  flex: '1 1 20rem',
  height: '15rem',
  background: 'rgba(225,225,225,.1)',
  borderRadius: '.8rem',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 20rem',
    height: '20rem',
  },
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 20rem',
    height: '20rem',
  },
  [theme.breakpoints.down('xs')]: {
    flex: '1 1 30rem',
  }
}));

const Skeleton3 = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  flex: '1 1 50rem',
  height: '25rem',
  background: 'rgba(225,225,225,.1)',
  borderRadius: '.8rem'
}));

export default useStyles

export {Skeleton1, Skeleton2, Skeleton3, iconStyle}