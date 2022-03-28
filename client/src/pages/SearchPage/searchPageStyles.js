import { makeStyles } from "@material-ui/styles"
import { styled } from "@mui/material"
import { Skeleton } from "@mui/material"

const useStyles = makeStyles((theme) => {
  return {
    msg: {
      marginTop: '3rem',
      marginBottom: '10rem',
      color: '#F2F2F3',
      fontSize: '3rem',
      textAlign: 'center',
    },
    page: {
      marginTop: '3rem',
      marginBottom: '10rem',
      maxWidth: '65rem',
      color: '#F2F2F3',
      textAlign: 'center',
      [theme.breakpoints.up('xl')]: {
        maxWidth: '100rem'
      }
    },
    loadingPage: {
      marginTop: '3rem',
      marginBottom: '10rem',
      maxWidth: '65rem',
      [theme.breakpoints.up('xl')]: {
        maxWidth: '100rem'
      }
    },
    card: {
      marginTop: '2rem'
    },
    skeletonWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, max-content)',
      gap: '6rem',
      margin: '2rem 0 0',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(3, max-content)',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, max-content)',
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(1, max-content)',
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: 'repeat(6, max-content)',
      }
    }
  }
})

const Skeleton1 = styled(Skeleton)(({ theme }) => ({
  height: '10rem',
  width: '10rem',
  background: 'rgba(225,225,225,.1)',
  borderRadius: '.5rem',
  [theme.breakpoints.down('lg')]: {
    height: '10rem',
    width: '10rem',
  },
  [theme.breakpoints.down('md')]: {
    height: '15rem',
    width: '15rem',
  },
  [theme.breakpoints.down('sm')]: {
    height: '30rem',
    width: '30rem',
  },
  [theme.breakpoints.up('xl')]: {
    height: '8rem',
    width: '8rem',
  }
}));

const Skeleton2 = styled(Skeleton)(({ theme }) => ({
  height: '1.5rem',
  width: '15rem',
  background: 'rgba(225,225,225,.1)',
  borderRadius: '.3rem',
  margin: '1rem auto',
  [theme.breakpoints.down('lg')]: {
    height: '2rem',
    width: '15rem',
  },
  [theme.breakpoints.down('md')]: {
    height: '3rem',
    width: '20rem',
  },
  [theme.breakpoints.down('sm')]: {
    height: '4rem',
    width: '30rem',
  },
  [theme.breakpoints.up('xl')]: {
    height: '1.5rem',
    width: '8rem',
  }
}));

const Skeleton3 = styled(Skeleton)(({ theme }) => ({
  height: '1rem',
  width: '10rem',
  background: 'rgba(225,225,225,.1)',
  borderRadius: '.3rem',
  margin: '1rem auto 0',
  [theme.breakpoints.down('lg')]: {
    height: '1rem',
    width: '10rem',
  },
  [theme.breakpoints.down('md')]: {
    height: '2rem',
    width: '15rem',
  },
  [theme.breakpoints.down('sm')]: {
    height: '3rem',
    width: '30rem',
  },
  [theme.breakpoints.up('xl')]: {
    height: '1rem',
    width: '8rem',
  }
}));

export default useStyles

export { Skeleton1, Skeleton2, Skeleton3}