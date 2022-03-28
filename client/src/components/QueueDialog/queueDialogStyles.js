import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  nextItem: {
    cursor: "pointer",
    '&:hover': {
      backgroundColor: '#696969',
      transition: '.4s',
    },
  },

  font: {
    padding: '1rem',
  },

  list: {
    paddingBottom: '2rem',
    backgroundColor: '#09091B',
    transition: '.4s',
    color: '#F2F2F3'
  },

  divider: {
    background: '#1A1A2B'
  }
})

const iconStyle = { 
  color: '#5395FD',
}

const secondaryStyle = {
  style: {
    color: '#778899'
  }
}

export default useStyles

export { iconStyle, secondaryStyle }