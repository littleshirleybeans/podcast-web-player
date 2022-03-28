import React, { useContext } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AudioContext } from '../../../contexts/audio-context';
import { MessageContext } from '../../../contexts/message-context';
import { QueueContext } from '../../../contexts/queue-context';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip from '@mui/material/Tooltip';
import useStyles, { iconStyle } from './audioPlayerStyles';
import { useTranslation } from "react-i18next";

export default function Player() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  const audioContext = useContext(AudioContext);
  const { audio, image, collectionName, trackName, setAudio } = audioContext;
  const setMsg = useContext(MessageContext).setMsg
  const { queue } = useContext(QueueContext)
  const { t } = useTranslation()

  const setMessageHandler = (message) => {
    setMsg({
      type: 'error',
      desc: 'resource_failed'
    })
    console.log(message)
  }

  const handleCloseAudioPlayer = () => {
    setAudio(null, null, null, null)
  }

  const handleNext = () => {
    const a = queue[0]
    if(a){
      setAudio(a.id, a.audio, a.image, a.collectionName, a.trackName)
      return
    }
    setMsg({
      type: 'info',
      desc: 'no_upcoming'
    })
  }

  const handleEnded = () => {
    const a = queue[0]
    if(a){
      setAudio(a.id, a.audio, a.image, a.collectionName, a.trackName)
      return
    }
    setAudio(null, null, null, null, null)
  }

  if (!audio) {
    return null
  } else {
    return (
      <Typography className={classes.container} component='div'>
        <img className={classes.img} alt="" src={image} />
        <AudioPlayer
          src={audio}
          autoPlay
          className={classes.mediaPlayer}
          header={`${trackName} // ${collectionName}`}
          onError={setMessageHandler}
          showFilledVolume
          showSkipControls 
          layout={matches ? 'stacked' : 'horizontal'}
          onClickNext={handleNext}
          onEnded={handleEnded}
        />

        <Tooltip title={t('tooltip.close')}>
          <HighlightOffIcon sx={iconStyle} onClick={handleCloseAudioPlayer} />
        </Tooltip>

      </Typography>
    )
  }
}