import React, { useContext, useEffect, useState } from "react"
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search'
import { useHistory } from "react-router-dom"
import AudioPlayer from '../AudioPlayer/AudioPlayer'
import PodcastsIcon from '@mui/icons-material/Podcasts';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import { MessageContext } from "../../../contexts/message-context"
import Tooltip from '@mui/material/Tooltip';
import useStyles, { iconStyle, Search, SearchIconWrapper, StyledInputBase } from "./layoutStyles"
import useDebounce from "../../../hooks/useDebounce"
import { useTranslation } from 'react-i18next';
import QueueDialog from "../../QueueDialog/QueueDialog"

export default function Layout({ children, searchItem, setSearchItem, changeLanguage, lng }) {
  const [scroll, setScroll] = useState(0)
  const classes = useStyles()
  const history = useHistory()
  const setMsg = useContext(MessageContext).setMsg
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openQueue, setOpenQueue] = useState(false);

  const handleClose = (event) => {
    const curLng = event.currentTarget.id
    setAnchorEl(null);
    changeLanguage(lng.find(l => l === curLng))

    setOpenQueue(false)
  };

  const handleSearchPage = () => {
    return history.push(`/search/${searchItem}`)
  }

  const handleSearchDebounce = useDebounce(handleSearchPage, 1000)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchItem) {
      setMsg({
        type: 'info',
        desc: 'no_keyword'
      })
    } else {
      handleSearchDebounce()
    }
  }

  const handleScrollTop = () => {
    window.scrollTo(0, 0)
  }

  const handleScrollY = () => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY)
    })
  }

  const switchToSub = () => {
    history.push('/subscription')
  }

  const switchToHome = () => {
    history.push('/')
  }

  const handleLanguageChange = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleQueue = () => {
    setOpenQueue(true)
  }

  const handleScrollDebounce = useDebounce(handleScrollY, 2000)

  useEffect(() => {
    handleScrollDebounce()
  }, [handleScrollDebounce])


  return (
    <React.Fragment>
      <AppBar
        className={classes.appbar}
        elevation={1}
      >
        <Toolbar>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={iconStyle} />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography
                variant="h5"
                noWrap
                className={classes.title}
              >
                <span className={classes.font}>Podcast</span> Web Player
              </Typography>
            </AccordionSummary>

            <AccordionDetails className={classes.accordionDetails}>
              <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.searchBar}>
                <Search
                  type="submit"
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder={t('layout.search')}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                </Search>
              </form>

              <div className={classes.iconWrapper}>
                <Tooltip title={t('tooltip.home')}>
                  <IconButton
                    onClick={switchToHome}
                    className={classes.iconButton}
                  >
                    <HomeIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('tooltip.queue')}>
                  <IconButton
                    className={classes.iconButton}
                    onClick={handleQueue}
                  >
                    <QueueMusicIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
                <QueueDialog openQueue={openQueue} handleClose={handleClose} />

                <Tooltip title={t('tooltip.subPage')}>
                  <IconButton
                    onClick={switchToSub}
                    className={classes.iconButton}
                  >
                    <PodcastsIcon fontSize='large' />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t('tooltip.languageChange')}>
                  <IconButton
                    className={classes.iconButton}
                    onClick={handleLanguageChange}
                  >
                    <LanguageOutlinedIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {lng.map((l, i) => {
                    return <MenuItem onClick={handleClose} id={l} key={i} disableRipple>{t(`language.${l}`)}</MenuItem>

                  })}
                </Menu>
              </div>
            </AccordionDetails>
          </Accordion>
        </Toolbar>
      </AppBar>


      <div>
        <div className={classes.toolbar}></div>
        {children}
        <div className={classes.toolbar}></div>
      </div>

      <AudioPlayer className={classes.audioPlayer} />
      {
        scroll > 500
          ? <div className={classes.toTopWrapper}>
            <Tooltip title={t('tooltip.backToTop')}>

              <ArrowUpwardOutlinedIcon
                onClick={handleScrollTop}
                className={classes.toTop}
                sx={iconStyle}
              />
            </Tooltip>

          </div>
          : null
      }
    </React.Fragment >
  )
}