import React, { useContext, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { MessageContext } from "../../contexts/message-context";
import { useTranslation } from "react-i18next";

export default function Messages({ children }) {
  const [open, setOpen] = useState(false);
  const messageContext = useContext(MessageContext)
  const { msg, setMsg } = messageContext
  const { t } = useTranslation()

  const allMessages = {
    server_error: t('message.server_error'),
    no_keyword: t('message.no_keyword'),
    no_region: t('message.no_region'),
    resource_failed: t('message.resource_failed'),
    already_added: t('message.already_added'),
    added_to_queue: t('message.added_to_queue'),
    no_upcoming: t('message.no_upcoming')
  }

  useEffect(() => {
    setOpen(true)
  }, [msg])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
      setMsg(null);
      return;
    }

    setOpen(false);
    setMsg(null);
  };

  if (msg) {
    return (
      <React.Fragment>
        {children}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity={msg.type} color={msg.type} variant='filled' sx={{ width: '100%' }}>
            {msg.content || allMessages[msg.desc]}
          </Alert>
        </Snackbar>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}