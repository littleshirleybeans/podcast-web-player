/**
 * =========================================
 * Component:     PodTable
 * Description:
 * - Displays information of every episode as well as almost every detail regarding it.
 * - Available to choose which episode to play
 * ==========================================
 */
import React, { useContext, useState } from "react";
import { AudioContext } from '../../contexts/audio-context';
import { QueueContext } from "../../contexts/queue-context";
import { MessageContext } from "../../contexts/message-context";
import { IconButton, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import PodModal from "../../components/PodModal/PodModal";
import useStyles, { iconStyle } from "./podTableStyles";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination/Pagination";

export default function PodTable({ episodes }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const { t } = useTranslation()

  const { setMsg } = useContext(MessageContext)

  const { id, setAudio } = useContext(AudioContext)
  const setAudioHandler = (id, audio, image, collectionName, trackName) => {
    setAudio(id, audio, image, collectionName, trackName)
  }

  const { queue, setQueue } = useContext(QueueContext)
  const setQueueHandler = (id, audio, image, collectionName, trackName) => {
    const audioObj = {
      id,
      audio,
      image,
      collectionName,
      trackName
    }
    if(queue.some(a => audioObj.id === a.id)) {
      setMsg({
        type: 'info',
        desc: 'already_added'
      })
      return
    }
    setQueue(queue.concat(audioObj))
    setMsg({
      type: 'success',
      desc: 'added_to_queue'
    })
  }

  // format date function
  const formatDate = (date) => {
    return date.substring(0, date.indexOf('T'))
  }

  // format duration function
  const formatDuration = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60)
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${hours}:${minutes}:${seconds}`
  }

  // handle open modal
  const handleOpen = (e) => {
    setOpen(true)
    setSelectedEpisode(episodes.find(episode => episode.epiId === Number(e.target.id || e.currentTarget.id)))
  }

  const handleClose = () => setOpen(false)

  return (
    <React.Fragment>
      <TableContainer elevation={5} className={classes.tableContainer} component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell algin="left" colSpan={3} className={classes.cell}>
                {t('podcast.episodeTitle')}
              </TableCell>
              <TableCell algin="left" className={classes.cell}>
                {t('podcast.releaseDate')}
              </TableCell>
              <TableCell algin="left" className={classes.cell}>
                {t('podcast.duration')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes ? episodes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(episode => {
                return (
                  <TableRow key={episode.epiId} className={classes.row}>
                    <TableCell className={classes.cell}>
                      {id === episode.epiId
                        ? <IconButton><PauseCircleOutlinedIcon sx={iconStyle} /></IconButton>
                        : <Tooltip title={t('tooltip.play')}>
                          <IconButton id={episode.epiId}
                            onClick={() => setAudioHandler(episode.epiId, episode.url, episode.image, episode.collectionName, episode.title)}> <PlayCircleOutlinedIcon sx={iconStyle} /></IconButton>
                        </Tooltip>
                      }
                       
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Tooltip title={t('tooltip.addToQueue')}>
                        <IconButton onClick={() => setQueueHandler(episode.epiId, episode.url, episode.image, episode.collectionName, episode.title)}>
                          <AddIcon sx={iconStyle} />
                      </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      <Typography
                        id={episode.epiId}
                        onClick={handleOpen}
                        className={classes.epiName}
                      >{episode.title}</Typography>

                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      {formatDate(episode.date)}
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      {formatDuration(episode.duration)}
                    </TableCell>

                  </TableRow>)
              }) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination array={episodes} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}/>

      <PodModal open={open} handleClose={handleClose} selectedEpisode={selectedEpisode} />
    </React.Fragment>
  )
}