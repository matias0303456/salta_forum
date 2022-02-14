import React from 'react'

export default function Footer() {

    let date = new Date(Date.now())
    let fullYear = date.getFullYear()

    return (
        <footer className='
            relative 
            bottom-0
            float-right
            p-1
            text-sm
        '
        >
            Salta Forum &copy; {fullYear} | Todos los derechos reservados
        </footer>
    )
}