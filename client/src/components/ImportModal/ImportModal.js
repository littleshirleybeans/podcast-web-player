/**
 * =========================================
 * Component:     ImportModal
 * Description:
 * - A modal where you choose your backup file to upload into subscription table
 * ==========================================
 */
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from "@material-ui/core"
import modalStyle from '../ImportModal/importModalStyles'
import { useTranslation } from "react-i18next";

export default function SubModal({ importModalOpen, handleImportModalClose, setDone, done }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const { t } = useTranslation()

  const handleSubmit = () => {
    const blob = new Blob([selectedFile], { type: "application/json" })

    const reader = new FileReader()
    // This is an asyncronous method
    reader.readAsText(blob)
    try {
      reader.onload = (e) => {
        const dataObj = JSON.parse(reader.result)
        if (dataObj) {
          for (const key in dataObj) {
            localStorage.setItem(key, dataObj[key])
          }

          // make sure data has been imported into localStorage, then set 'done' to true
          setDone(true)
        }
      }
    } catch (error) {
      console.log(reader.error)
    }
  }

  const handleChange = (e) => {
    console.log('choose file and open it')
    console.log('submit', e.target.files[0])
    setSelectedFile(e.target.files[0])
  }

  return (
    <Modal
      open={importModalOpen}
      onClose={handleImportModalClose}
    >
      <Box sx={modalStyle}>
        <input type="file" name="file" accept=".json" id="fileInput" onChange={handleChange} />
        <button onClick={handleSubmit} >{t('options.submit')}</button>
        {done ? <Typography>{t('options.uploaded')}</Typography> : null}
      </Box>
    </Modal>
  )
}