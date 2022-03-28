import React, { useContext, useEffect, useState } from "react"
import ReactHtmlParser from 'react-html-parser';
import { useParams } from "react-router-dom"
import { Container, Typography, Paper, Box } from "@material-ui/core"
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import services from '../../services/requests'
import { MessageContext } from "../../contexts/message-context";
import Tooltip from '@mui/material/Tooltip';
import useStyles, { Skeleton1, Skeleton2, Skeleton3, iconStyle } from "./podcastPageStyles";
import PodTable from "../../components/PodTable/PodTable";
import { useTranslation } from 'react-i18next';

export default function PodcastPage() {
  const classes = useStyles()
  const [episodes, setEpisodes] = useState(null)
  const { id } = useParams()
  const podId = Number(id)
  
  const [selectedPod, setSelectedPod] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [podDesc, setPodDesc] = useState('loading...')
  const setMsg = useContext(MessageContext).setMsg
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);

    services.getEpisodes(podId)
      .then((data) => {
        setSelectedPod(data[0])
        const returnedEpisodes = data.filter((e, i) => i !== 0)
        setEpisodes(returnedEpisodes)
      })
      .catch(error => {
        setMsg({
          type: 'error',
          desc: 'server_error'
        })
      })

    services.getPodDesc(podId)
      .then((data) => {
        setPodDesc(data)
      }).catch((error) => {
        // console.log(error)
      })

    if (localStorage.hasOwnProperty(podId)) {
      setSubscribed(true)
    }

    return () => {
      console.log('episodes:', episodes)
      console.log('cleanup')
    }
  }, [podId, setEpisodes])

  // toggleSub function
  const toggleSub = () => {
    if (localStorage.hasOwnProperty(podId)) {
      localStorage.removeItem(podId)
      setSubscribed(false)
      setMsg({
        type: 'success',
        content: `${t('message.unsubscribed')} "${selectedPod.name}".`
      })
    } else {
      const pod = {
        id: podId,
        name: selectedPod.name,
        artist: selectedPod.artist,
        image: selectedPod.image,
        date: episodes[0].date,
        updated: false
      }
      localStorage.setItem(podId, JSON.stringify(pod))
      setSubscribed(true)
      setMsg({
        type: 'success',
        content: `${t('message.subscribed')} "${selectedPod.name}".`
      })
    }

  }

  if (!selectedPod) {
    return (
      <React.Fragment>
        <Container className={classes.loadingPage}>
          <div className={classes.skeletonWrapper}>
            <Skeleton1 variant="rectangular" />
            <Skeleton2 variant="rectangular" />
            <Skeleton3 variant="rectangular" />
          </div>
        </Container>
      </React.Fragment>
    )
  } else {
    return (
      <Container className={classes.page}>
        <img className={classes.img} src={selectedPod.image} alt="" />

        <Paper elevation={5} className={classes.wrapper}>

          <Box className={classes.content}>
            <div className={classes.podName}>
              <Typography variant="h5">
                {selectedPod.name}
              </Typography>
              <Typography variant="h6">
                {selectedPod.artist}
              </Typography>
            </div>

            <div className={classes.genresContainer}>
              {selectedPod.genres ? selectedPod.genres.map((genre, i) => {
                return (
                  <Typography key={i} className={classes.genres} variant="body2">{genre}</Typography>
                )
              }) : null}
            </div>

            <div className={classes.desc}>
              <Typography variant='body2' component='h6'>
                {ReactHtmlParser(podDesc)}
              </Typography>
            </div>

          </Box>

          {subscribed
            ? <Tooltip title={t('tooltip.addedToSub')}>
              <TurnedInIcon  onClick={toggleSub} className={classes.sub} sx={iconStyle} />
            </Tooltip>
            : <Tooltip title={t('tooltip.addToSub')}>
              <TurnedInNotIcon onClick={toggleSub} className={classes.sub} sx={iconStyle} />
            </Tooltip>
          }
        </Paper>

        <PodTable episodes={episodes} />
      </Container>
    )
  }
}