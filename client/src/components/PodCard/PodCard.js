/**
 * =========================================
 * Component:     PodCard
 * Description:
 * - Displays information of podcast, including cover, podcast name and artist name
 * (You'll find them on home page and search page)
 * ==========================================
 */
import React from 'react'
import { CardContent, CardMedia, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './podCardStyles';

export default function PodCard({ podcast }) {
  const classes = useStyles()

  return (
    <div className={classes.card}>
      <Link to={`/podcast/${podcast.id}`} className={classes.link}>
        <div className={classes.info}>
          <CardMedia
            className={classes.img}
            image={podcast.image}
            alt="podcast image"
          >
          </CardMedia>
          <CardContent className={classes.title}>
            <Typography gutterBottom variant="h6" component="div" >
              {podcast.name}
            </Typography>
            <Typography variant="body2">
              {podcast.artist}
            </Typography>
          </CardContent>
        </div>
      </Link>
    </div>
  )
}