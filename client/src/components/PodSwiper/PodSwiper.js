/**
 * =========================================
 * Component:     PodSwiper
 * Description:
 * - Displays top podcasts in a certain region on home page
 * ==========================================
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import useStyles from './podSwiperStyles';

export default function PodSwiper({ topPods }) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Swiper
      breakpoints={{
        slidesPerView: 1,
        spaceBetween: 10,
        // when window width is >= 320px
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        640: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 640px
        960: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {topPods.map && topPods.map(podcast => (
        <SwiperSlide key={podcast.id}>
          <div className={classes.wrapper} onClick={() => history.push(`/podcast/${podcast.id}`)}>
            <img className={classes.image} src={podcast.image} alt='' />
            <Typography>{podcast.name}</Typography>
            <Typography variant='body2'>{podcast.artist}</Typography>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}