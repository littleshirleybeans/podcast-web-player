import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { MessageContext } from '../../contexts/message-context';
import Tooltip from '@mui/material/Tooltip';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import useStyles, { iconStyle } from './subscriptionPageStyles';
import SubTable from '../../components/SubTable/SubTable';
import SubModal from '../../components/SubModal/SubModal';
import Options from '../../components/Options/Options'
import { useTranslation } from 'react-i18next';


const getLocalStorage = () => {
  let favArr = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)

    // if there's no value, remove the item so as to avoid the error caused when rendering SubTable
    if (!value) {
      localStorage.removeItem(key)
      continue
    } else if (!Number(key) || (Object.prototype.toString.call(JSON.parse(value)) !== '[object Object]')) continue
    favArr[i] = JSON.parse(value)
  }
  return favArr
}

export default function Subscription() {
  const [subscribedPods, setSubscribedPods] = useState(getLocalStorage())
  const classes = useStyles()
  const count = useRef(0)
  const [isChecking, setIsChecking] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [done, setDone] = useState(false)
  const updatedPods = subscribedPods.filter(pod => pod.updated)
  const setMsg = useContext(MessageContext).setMsg
  const { t } = useTranslation()

  useEffect(() => {
    setSubscribedPods(getLocalStorage())
    if (isChecking === 2) {
      setMsg({
        type: 'success',
        content: `${t('message.updated')} ${count.current} ${t('message.podcasts')}`
      })
      setIsChecking(0)
    }

  }, [isChecking])

  useEffect(() => {
    if (done) {
      setSubscribedPods(getLocalStorage())
    }
  }, [done])

  const handleModalOpen = (e) => {
    setModalOpen(true)
  }

  const handleModalClose = () => setModalOpen(false)

  return (
    <Container className={classes.page}>

      <Typography variant='h5' component='h5' color='primary' className={classes.title}>
        {subscribedPods.length} {subscribedPods.length === 1 ? t('sub.subscription') : t('sub.subscriptions')}
      </Typography>

      <Options
        count={count}
        setIsChecking={setIsChecking}
        subscribedPods={subscribedPods}
        done={done}
        setDone={setDone} />

      {isChecking ? <Typography variant='body2'>{t('sub.waitMsg')}</Typography> : null}

      <div className={classes.messageWrapper}>
        <Tooltip title={t('tooltip.viewUpdates')}>
          <MessageOutlinedIcon onClick={handleModalOpen} sx={iconStyle} />
        </Tooltip>
      </div>

      <SubModal modalOpen={modalOpen} handleModalClose={handleModalClose} updatedPods={updatedPods} count={count} />

      <SubTable subscribedPods={subscribedPods} setSubscribedPods={setSubscribedPods} />

    </Container >
  )
}