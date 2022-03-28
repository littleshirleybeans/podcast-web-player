/**
 * =========================================
 * Component:     SubModal
 * Description:
 * - Displays information of updates
 * ==========================================
 */
import React from "react";
import { Typography, Modal, Box } from "@material-ui/core"
import useStyles from "./subModalStyles";
import { useTranslation } from "react-i18next";

export default function SubModal({ modalOpen, handleModalClose, updatedPods, count}) {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
    >
      <Box className={classes.modal}>
        <Typography variant='h6'>{t('options.count')} {count.current}</Typography>
        <Typography variant='h6'>{t('options.unreads')} {updatedPods.length}</Typography>

        {updatedPods.map((pod, i) => {
          return (
            <Typography variant='body2' key={i}>
              {i+1} | {pod.name}
            </Typography>
          )
        })}
      </Box>

    </Modal>
  )
}