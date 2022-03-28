/**
 * =========================================
 * Component:     SubDialog
 * Description:
 * - A confirmation dialog that pops up when deleting subscription
 * ==========================================
 */
import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default function SubDialog({id, value, open, handleClose, handleDelete}) {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {`${t('sub.deleteMsg')}"${value}"`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>{t('sub.cancel')}</Button>
          <Button onClick={() => handleDelete(id)} autoFocus>
            {t('sub.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}