/**
 * =========================================
 * Component:     QueueDialog
 * Description:
 * - A queue that stores and displays all the episodes you want to listen to
 * - It'll automatically play the next episode when the current one finishes playing.
 * ==========================================
 */
import React, { useContext, useEffect } from "react";
import { Dialog, List, ListItem, ListItemText, Divider, Typography, ListItemAvatar, Avatar, IconButton } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close';
import useStyles, { iconStyle, secondaryStyle } from "./queueDialogStyles";
import { useTranslation } from "react-i18next";
import { AudioContext } from '../../contexts/audio-context';
import { QueueContext } from '../../contexts/queue-context';

export default function QueueDialog({ openQueue, handleClose }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const audioContext = useContext(AudioContext);
  const audioObj = audioContext;
  const { setAudio } = audioContext;
  const queueContext = useContext(QueueContext);
  const { queue, setQueue } = queueContext

  useEffect(() => {
    if (queue.some(a => a.id === audioObj.id)) {
      setQueue(queue.filter(a => a.id !== audioObj.id))
    }
  }, [audioObj])

  const handleQueuePlay = (...a) => {
    setAudio(...a)
    // console.log(a)
  }

  const handleDelete = (a) => {
    setQueue(queue.filter(q => a.id !== q.id))
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={openQueue}
        onClose={handleClose}
      >
        <List className={classes.list}>
          <Typography className={classes.font} variant="h6">{t('queue.queue')}</Typography>

          <Typography className={classes.font}>{t('queue.nowplaying')}</Typography>
          <ListItem>
            {audioObj?.id ? <ListItemAvatar>
              <Avatar alt="" src={audioObj.image} />
            </ListItemAvatar> : <Typography className={classes.font} variant="body2">{t('queue.noplaying')}</Typography>}
            <ListItemText primary={audioObj.trackName} secondary={audioObj.collectionName} secondaryTypographyProps={secondaryStyle} />
          </ListItem>
          <Divider className={classes.divider} />
          <Typography className={classes.font}>{t('queue.nextup')} ({t('queue.total')}: {queue ? queue.length : 0})</Typography>

          {queue ? queue.map((a, i) => {
            return (
              <React.Fragment key={a.id}>
                <ListItem className={classes.nextItem}  onClick={() => handleQueuePlay(...[a.id, a.audio, a.image, a.collectionName, a.trackName])}>
                  <Typography className={classes.font}>{i + 1}</Typography>
                  <ListItemAvatar>
                    <Avatar alt="" src={a.image} />
                  </ListItemAvatar>
                  <ListItemText primary={a.trackName} secondary={a.collectionName}
                    secondaryTypographyProps={secondaryStyle} />
                  <IconButton onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(a)
                  }}>
                    <CloseIcon sx={iconStyle} />
                  </IconButton>
                </ListItem>
                <Divider className={classes.divider}/>
              </React.Fragment>
            )
          }) : null}
        </List>
      </Dialog>
    </React.Fragment>
  )
}