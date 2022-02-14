import React from 'react'

export default function Footer() {

    let date = new Date(Date.now())
    let fullYear = date.getFullYear()

    return (
        <footer className='
            absolute 
            bottom-0
            right-0
            p-1
            text-sm
        '
        >
            Salta Forum &copy; {fullYear} | Todos los derechos reservados
        </footer>
    )
}