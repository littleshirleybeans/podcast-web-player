import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => {
  return {
    thumbnail: {
      width: '3rem',
      height: '3rem'
    },
    tableContainer: {
      background: '#1A1A2B',
      borderRadius: '.8rem',
      marginTop: '2rem',
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
  }
})

const iconStyle = { 
  height: '1.5rem', 
  width: '1.5rem', 
  color: '#5395FD',
}

const badgeStyle = {
  zIndex: '0',
  '& .MuiBadge-badge': {
    backgroundColor: '#EE423F'
  }
}

export default useStyles

export { iconStyle, badgeStyle }