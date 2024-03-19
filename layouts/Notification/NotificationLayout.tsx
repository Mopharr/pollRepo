import React from 'react'
import Notification from '../../pages/Notification'
import { Helmet } from 'react-helmet'

const NotificationLayout = () => {
  return (
    <>
    <Helmet>
        <title>Notification Polls</title>
        <meta name="description" content="Home" />
      </Helmet>
    <Notification />
    </>
  )
}

export default NotificationLayout
