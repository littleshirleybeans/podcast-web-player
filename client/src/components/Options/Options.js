/**
 * =========================================
 * Component:     Options
 * Description:
 * - Here are 3 features of this component:
 * ---- Update subscriptions
 * ---- Download backup file
 * ---- Upload backup file
 * ==========================================
 */
import React, { useState, useContext } from 'react';
import { Button, Link, MenuItem } from "@material-ui/core"
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImportModal from '../../components/ImportModal/ImportModal'
import services from '../../services/requests'
import useThrottle from '../../hooks/useThrottle';
import { MessageContext } from '../../contexts/message-context';
import useStyles, { StyledMenu } from './optionsStyles';
import { useTranslation } from 'react-i18next';

export default function Options({ setIsChecking, count, subscribedPods, setDone, done }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [url, setUrl] = useState(null)
  const [filename, setFilename] = useState(null)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const setMsg = useContext(MessageContext).setMsg
  const { t } = useTranslation()
  const idArr = subscribedPods.map(p => p.id)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkUpdates = () => {
    setAnchorEl(null)

    if (!subscribedPods.length) return

    console.log('checking...')

    setIsChecking(1)
    services.getLatestReleaseDate(idArr)
      .then((data) => {
        console.log(data)
        data.forEach((item, i) => {
          if (subscribedPods[i].date !== item.date) {
            localStorage.setItem(item.id, JSON.stringify({
              ...subscribedPods[i],
              date: item.date,
              updated: true
            }))
            count.current++
            console.log('count', count.current)
          }
        })
        setIsChecking(2)
        console.log('checked')
      }).catch(error => {
        setMsg({
          type: 'error',
          desc: 'server_error'
        })
      })
  }

  const handleUpdate = useThrottle(checkUpdates, subscribedPods.length * 1000)

  const handleBackup = () => {
    console.log('no localStorage')
    setAnchorEl(null)
    if (localStorage.length === 0) return
    console.log("started");
    const _myArray = JSON.stringify(localStorage, null, 4);

    const blob = new Blob([_myArray], { type: "octet/stream" })
    setFilename('backup_' + Date() + '.json')
    setUrl(window.URL.createObjectURL(blob))

    console.log("finished");
  }

  const handleImportModalOpen = () => {
    setAnchorEl(null)
    setImportModalOpen(true)
  }

  const handleImportModalClose = () => {
    setImportModalOpen(false)
    setDone(false)
  }

  return (
    <React.Fragment>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('options.options')}
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUpdate} disableRipple>
          <RefreshIcon />
          {t('options.updateSub')}
        </MenuItem>
        <MenuItem onClick={handleBackup} disableRipple>
          <DownloadIcon />
          <Link
            className={classes.link}
            underline="none"
            href={url} download={filename}
          >
            {t('options.downloadBackup')}
          </Link>

        </MenuItem>
        <MenuItem onClick={handleImportModalOpen} disableRipple>
          <UploadIcon />
          {t('options.uploadBackup')}
        </MenuItem>
      </StyledMenu>

      <ImportModal
        importModalOpen={importModalOpen}
        handleImportModalClose={handleImportModalClose}
        setDone={setDone}
        done={done}
      />

    </React.Fragment>
  );
}