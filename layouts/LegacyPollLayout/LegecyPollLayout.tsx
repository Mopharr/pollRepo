import React from 'react'
import { Helmet } from 'react-helmet'
import LegacyPoll from '../../pages/LegacyPoll'

const LegecyPollLayout = () => {
  return (
    <div>
       <Helmet>
        <title>Legacy Polls</title>
        <meta name="description" content="Legecy" />
      </Helmet>
      <LegacyPoll/>
    </div>
  )
}

export default LegecyPollLayout
