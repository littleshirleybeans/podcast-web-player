import { TablePagination } from "@material-ui/core";
import React from "react";
import useStyles from '../Pagination/paginationStyles'

export default function Pagination(props){
  const classes = useStyles()

  const handleChangeRowsPerPage = (e) => {
    props.setRowsPerPage(parseInt(e.target.value, 10))
    props.setPage(0)
  }

  // but how to pass newPage??? well seems like a built-in thing...
  const handleChangePage = (e, newPage) => {
    props.setPage(newPage)
  }

  return (
    <React.Fragment>
       <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 12, 24]}
        component="div"
        count={props.array ? props.array.length : 0}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}