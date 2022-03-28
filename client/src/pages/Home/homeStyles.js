import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  title: {
    fontSize: '2.5rem',
    color: '#F2F2F3',
    textTransform: 'capitalize',
    fontWeight: 'bolder'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    rowGap: '1rem',
    padding: '2rem 0',
    borderRadius: '1rem',
    transition: '.4s',
    marginBottom: '1rem'
  },
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
})

const autoCompleteStyle = {
  width: '20rem',
  borderRadius: '.5rem',
  backgroundColor: '#F2F2F3',
}

export default useStyles

export { autoCompleteStyle }