import React, { useContext, useEffect, useState } from "react"
import { Container, Grid, Typography } from '@material-ui/core'
import PodCard from '../../components/PodCard/PodCard'
import services from '../../services/requests'
import { useHistory, useParams } from "react-router"
import { MessageContext } from "../../contexts/message-context";
import useStyles, { Skeleton1, Skeleton2, Skeleton3 } from "./searchPageStyles"
import { useTranslation } from "react-i18next"
import Pagination from "../../components/Pagination/Pagination"

export default function SearchPage({ searchItem }) {
  const classes = useStyles()
  const history = useHistory()
  const { item } = useParams()
  const [podcasts, setPodcasts] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(12)
  const setMsg = useContext(MessageContext).setMsg
  const { t } = useTranslation()

  useEffect(() => {
    if (item) {
      services.getPodcasts(item)
        .then((data) => {
          setPodcasts(data)
        })
        .catch(error => {
          setMsg({
            type: 'error',
            desc: 'server_error'
          })
        })
    }

    return () => {
      console.log('podcasts:', podcasts)
      console.log('cleanup search')
    }

  }, [history, setPodcasts, item])

  if (!podcasts) {
    return (
      <React.Fragment>
        <Container className={classes.loadingPage}>
          <Skeleton2 variant="rectangular" />
          <Skeleton2 variant="rectangular" />
          <div className={classes.skeletonWrapper}>
            {[...Array(12)].map((s, index) => {
              return (
                <div key={index}>
                  <Skeleton1 variant="rectangular" />
                  <Skeleton3 variant="rectangular" />
                  <Skeleton3 variant="rectangular" />
                </div>
              )
            })}
          </div>
        </Container>
      </React.Fragment>
    )
  } else if (podcasts.length > 0) {
    return (
      <React.Fragment>
        <Container className={classes.page}>
          <Typography variant="h5">
            {t('search.searchResultsFor')} {item || searchItem}
          </Typography>
          <Typography>
            {t('search.found')} {podcasts.length} {t('search.matches')}
          </Typography>

          <Pagination array={podcasts} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage} />

          <Grid className={classes.card} container spacing={3}>
            {podcasts && podcasts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(podcast => (
                <Grid item key={podcast.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <PodCard podcast={podcast} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </React.Fragment>
    )
  } else {
    return (
      <Typography variant="h5" className={classes.msg}>
        {t('search.noPodcastsFound')}
      </Typography>
    )
  }
}