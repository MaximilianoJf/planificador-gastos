import type { ReactNode } from "react"

//Usar ReactNode en el tipo ErrorMessageProps permite que el componente acepte cualquier contenido renderizable por React, no solo texto
// también puedes usar el helper PropsWithChildren de React para lograr lo mismo de forma más conveniente.
//import type { PropsWithChildren } from 'react'
//type ErrorMessageProps = PropsWithChildren<{}> 

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className='bg-red-600 p-2 rounded-lg text-white font-bold text-sm text-center'>{children}</p>
  )
}
