import React from 'react'
import { Helmet } from "react-helmet";
import Explore from '../../pages/Explore';


const ExploreLayout = () => {
  return (
    <div>
         <Helmet>
        <title>Explore Polls</title>
        <meta name="description" content="Home" />
      </Helmet>
      <Explore />
    </div>
  )
}

export default ExploreLayout