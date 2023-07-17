import React from 'react'
import TitleCard from '../../reusable/card/TitleCard'
import TablaLotes from './TablaLotes'


function Lotes() {
  return (
    <TitleCard title='Lotes' subtitle='Un subtitulo' width='90%'>
        <TablaLotes/>
    </TitleCard>
  )
}

export default Lotes