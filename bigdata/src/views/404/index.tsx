import React from 'react'
import { useTranslation } from 'react-i18next'

export default function index() {
  const { t } = useTranslation();
  return (
    <div>
      {t('404.title')}
    </div>
  )
}
