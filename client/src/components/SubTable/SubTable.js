/**
 * =========================================
 * Component:     SubTable
 * Description:
 * - Displays your specific subscriptions
 * ==========================================
 */
import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Paper } from '@material-ui/core'
import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIosOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SubDialog from '../../components/SubDialog';
import { MessageContext } from '../../contexts/message-context';
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip';
import useStyles, { badgeStyle, iconStyle } from "./subTableStyles";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination/Pagination";

export default function SubTable({ subscribedPods, setSubscribedPods }) {
  const history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [id, setId] = useState(null)
  const [name, setName] = useState(null)
  const setMsg = useContext(MessageContext).setMsg
  const { t } = useTranslation()

  const handleDelete = (id) => {
    if (!id) {
      return
    }
    localStorage.removeItem(id)
    const filterPods = subscribedPods.filter(pod => pod.id !== id)
    setSubscribedPods(filterPods)
    setOpen(false)
    setMsg({
      type: 'success',
      content: `${t('message.deleted')} "${name}".`
    })

    setId(null)
    setName(null)
  }

  const handleOpen = (e) => {
    console.log(e.currentTarget.value)
    setId(Number(e.currentTarget.id))
    setName(e.currentTarget.value)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // format date function
  const formatDate = (date) => {
    return date ? date.substring(0, date.indexOf('T')) : 'NaN'
  }

  const switchToPodPage= (e) => {
    const updated = e.currentTarget.value
    const id = e.currentTarget.id
    const value = localStorage.getItem(id)

    if (value && updated) {
      localStorage.setItem(id, JSON.stringify({
        ...JSON.parse(value),
        updated: false
      }))
    } else {
      localStorage.removeItem(id)
    }
    history.push(`/podcast/${e.currentTarget.id}`)
  }

  return (
    <React.Fragment>
      <TableContainer elevation={5} className={classes.tableContainer} component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell algin="left" colSpan={2} className={classes.cell}>
                {t('sub.podcastName')}
              </TableCell>
              <TableCell algin="left" className={classes.cell}>
                {t('sub.artistName')}
              </TableCell>
              <TableCell algin="left" colSpan={3} className={classes.cell}>
                {t('sub.latestName')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribedPods ? subscribedPods
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(pod => {
                return (
                  <TableRow key={pod.id} className={classes.row}>
                    <TableCell className={classes.cell}>
                      {pod.updated ?
                        <Badge sx={badgeStyle} variant="dot"
                          color='primary'>
                          <img
                            alt="thumbnail"
                            src={pod.image}
                            className={classes.thumbnail}
                          />
                        </Badge> : <img
                          alt="thumbnail"
                          src={pod.image}
                          className={classes.thumbnail}
                        />}
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      <Typography>
                        {pod.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      <Typography>
                        {pod.artist}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      <Typography>
                        {formatDate(pod.date)}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Tooltip title={t('tooltip.viewMoreInfo')}>
                        <IconButton id={pod.id} value={pod.updated} onClick={switchToPodPage}>
                          <ArrowForwardIosOutlined sx={iconStyle} />
                        </IconButton>
                      </Tooltip>

                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Tooltip title={t('tooltip.delete')}>
                        <IconButton id={pod.id}
                          value={pod.name}
                          onClick={handleOpen} >
                          <DeleteOutlineIcon sx={iconStyle} />
                        </IconButton>

                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
              : null
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination array={subscribedPods} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}/>

      <SubDialog open={open} handleClose={handleClose} handleDelete={handleDelete} id={id} value={name} />
    </React.Fragment>
  )
}