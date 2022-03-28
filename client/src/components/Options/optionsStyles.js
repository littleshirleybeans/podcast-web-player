import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  button: {
    backgroundColor: '#20273C',
    color: '#F2F2F3',
    fontWeight: 'bold',
    borderRadius: '.3rem',
    padding: '.5rem 1rem',
    fontSize: '1rem',
    textAlign: 'center',
    letterSpacing: '.1rem',
    '&:hover': {
      backgroundColor: '#20273C',
    }
  },

  link: {
    color: 'rgb(55, 65, 81)'
  }
})

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default useStyles

export { StyledMenu }