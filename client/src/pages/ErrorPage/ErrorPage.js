import React from 'react'
import Typography from '@material-ui/core/Typography';
import useStyles from './errorPageStyles';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.error}>
       <Typography>{t('errorPage.errorPageMsg')}</Typography>
    </div>
  )
}

export default ErrorPage