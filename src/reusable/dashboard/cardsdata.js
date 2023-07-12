import { Home, Person, Topic, Scanner } from "@mui/icons-material"

export const dataHomeCard = 
    [ 
        {
        title:'Digitalizacion', 
        subtitle:'Creación e Impresion de Etiquetas',
        description:'Creación de etiquetas y pasos, reimpresión de etiquetas',
        url:'/digitalizacion',
        icon:<Scanner/>
    },
    {
        title:'Documentos', 
        subtitle:'Visualización de Lotes',
        description:'Visualización y modificación de estado, de documentos correspondientes al lote de una fecha.',
        url:'/home',
        icon:<Topic/>
    },
    {
        title:'Gestion de Usuarios', 
        subtitle:'Visualización de Lotes',
        description:'Visualización y modificación de estado, de documentos correspondientes al lote de una fecha.',
        url:'/home',
        icon:<Person/>
        }
    
]


export const dataInicializacionCard = 
    [ 
        {
        title:'Etiquetas', 
        subtitle:'Creación e impresion de etiquetas',
        description:'Creación de etiquetas y pasos, reimpresión de etiquetas',
        url:'etiquetas'
    },
    {
        title:'Lotes', 
        subtitle:'Visualización de Lotes',
        description:'Visualización y modificación de estado, de documentos correspondientes al lote de una fecha.',
        url:'/home'
        }
    
]

