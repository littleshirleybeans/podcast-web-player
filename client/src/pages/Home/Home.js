import React, { useContext, useEffect, useState } from "react"
import { Container, Typography, Button } from "@material-ui/core"
import data from '../../data/regionData'
import services from '../../services/requests'
import { Autocomplete, TextField } from "@mui/material"
import PodSwiper from "../../components/PodSwiper/PodSwiper"
import { MessageContext } from "../../contexts/message-context"
import useStyles, { autoCompleteStyle } from "./homeStyles"
import useDebounce from "../../hooks/useDebounce"
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom"

export default function Home(props) {
  const { t, i18n } = useTranslation();
  const { code } = useParams()
  const classes = useStyles()
  const [region, setRegion] = useState(() => {
    return code ? data.find(r => r.rCode === code) : data.find(r => r.rCode === i18n.language.slice(i18n.language.indexOf("_") + 1).toLowerCase())
  })
  const [inputValue, setInputValue] = useState('')
  const [topPods, setTopPods] = useState([])
  const setMsg = useContext(MessageContext).setMsg

  useEffect(() => {
    services.getPopularPods(region.rCode)
      .then((data) => {
        setTopPods(data)
      })
      .catch(error => {
        setMsg({
          type: 'error',
          desc: 'server_error'
        })
      })

      return () => {
        console.log('topPods:', topPods)
        console.log('cleanup home')
      } 
  }, [])

  const handleRegion = (event, value) => {
    setRegion(value);
  }

  const handleInputChange = (event, value) => {
    setInputValue(value)
  }

  const getTopPods = () => {
    if (!region) {
      setMsg({
        type: 'info',
        desc: 'no_region'
      })
    } else {
      services.getPopularPods(region.rCode)
        .then((data) => {
          setTopPods(data)
          if (region.rCode !== code) {
            props.history.push(`/region/${region.rCode}`)
          }
        })
        .catch(error => {
          setMsg({
            type: 'error',
            desc: 'server_error'
          })
        })
    }
  }

  const handleDiscoverDebounce = useDebounce(getTopPods, 1000)

  return (
    <Container>
      <div className={classes.box}>
        <Typography component='h1' className={classes.title}>
          {t('home.topPodcastsIn')}
        </Typography>
        <Autocomplete
          size='small'
          disablePortal
          value={region}
          inputValue={inputValue}
          onChange={handleRegion}
          onInputChange={handleInputChange}
          options={data}
          sx={autoCompleteStyle}
          isOptionEqualToValue={(option, value) => option.rName === value.rName}
          getOptionLabel={(option) => option.rName}
          renderInput={(params) =>
            <TextField {...params} label={t('home.region')} />
          }
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleDiscoverDebounce}
        >
          {t('home.discover')}
        </Button>
      </div>

      {topPods ? <PodSwiper className={classes.swiper} topPods={topPods} /> : null}

    </Container>
  )
}