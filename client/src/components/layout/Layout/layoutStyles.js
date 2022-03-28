import { makeStyles } from '@material-ui/styles'
import { alpha, InputBase, styled } from "@mui/material"

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      background: "#0B0A10",
      color: '#F2F2F3',
    },

    accordion: {
      backgroundColor: 'inherit',
      color: '#F2F2F3',
      width: '100%'
    },

    accordionDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: {
      cursor: 'pointer',
      padding: theme.spacing(2),
      fontWeight: 'bolder',
      color: '#f7fbfc',
    },
    toolbar: theme.mixins.toolbar,

    toTopWrapper: {
      position: 'fixed',
      right: '2rem',
      bottom: '15rem',
      transition: '.5s',
      height: '3rem',
      width: '3rem',
      backgroundColor: '#20273C',
      borderRadius: '50%',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 4px 12px, rgba(0, 0, 0, 0.1) 0px 8px 28px',
    },

    font: {
      backgroundColor: '#5395FD',
      color: '#0B0A10',
      display: 'inline-block',
      borderRadius: '.3rem',
      padding: '.25rem'
    },

    iconButton: {
      color: '#f7fbfc',
    }
  }
})

const iconStyle = {
  width: '2rem',
  height: '2rem',
  cursor: 'pointer',
  transition: '.5s',
  transform: 'translate(25%, 25%)',
  color: '#F2F2F3',
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, .1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    margin: '0 2rem',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#F2F2F3',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

export default useStyles

export { Search, SearchIconWrapper, StyledInputBase, iconStyle }