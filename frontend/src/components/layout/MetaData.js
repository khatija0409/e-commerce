import React from 'react'
import Helmet from "react-helmet"
const MetaData = ({title}) => {
  return (
<Helmet>
    {/*in whichever component this gets used ,its title will be set with hhe help of helmet  */}
    <title>
        {title}
    </title>
</Helmet>
  )
}

export default MetaData
