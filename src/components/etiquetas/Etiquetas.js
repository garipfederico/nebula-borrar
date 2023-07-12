import React from 'react'
import TitleCard from '../../reusable/card/TitleCard'
import { Stack, Typography } from '@mui/material'
import FormEtiqueta from './FormEtiqueta'

function Etiquetas() {
  return (
    <Stack width="100vw" flexDirection='column' justifyContent='center' alignItems='center' sx={{mt:'30px'}}>
    <TitleCard 
      title='Etiquetas'
      subtitle='Creacion e impresion de etiquetas'
      width='60vw'  
      sx={{marginY:'auto'}}
      >
       <FormEtiqueta/>
      </TitleCard>
    </Stack>
  )
}

export default Etiquetas