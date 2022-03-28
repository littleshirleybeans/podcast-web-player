import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    tableContainer: {
      background: '#1A1A2B',
      margin: '0 auto',
      borderRadius: '.8rem',
    },

    cell: {
      color: '#F2F2F3',
      borderBottom: '1px solid #20273C',
    },
    row: {
      '&:hover': {
        backgroundColor: '#20273C',
        transition: '.4s',
      },
    },

    epiName: {
      cursor: 'pointer'
    },
  }
})

const iconStyle = { 
  height: '3rem', 
  width: '3rem', 
  color: '#5395FD',
}


export default useStyles

export { iconStyle }