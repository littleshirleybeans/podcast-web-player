/**
 * =========================================
 * Component:     PodModal
 * Description:
 * - Diplays the description of a single episode
 * ==========================================
 */
import React from "react";
import ReactHtmlParser from 'react-html-parser';
import { Typography, Box, Modal } from "@material-ui/core"
import useStyles from "./podModalStyles";

export default function PodModal({ open, handleClose, selectedEpisode }) {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box className={classes.modal}>
        {selectedEpisode ? (
          <React.Fragment>
            <img
              alt="thumbnail"
              src={selectedEpisode.image}
              className={classes.thumbnail}
            />
            <Typography variant="h5" id="episode-modal-title">
              {selectedEpisode.title}
            </Typography>
            <Typography variant="body2">
              {ReactHtmlParser(selectedEpisode.desc)}
            </Typography>
          </React.Fragment>
        ) : ''}
      </Box>
    </Modal>
  )
}