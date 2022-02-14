import React from 'react'

export default function Footer() {

    let date = new Date(Date.now())
    let fullYear = date.getFullYear()

    return(
        <footer>
            Salta Forum &copy; {fullYear} | Todos los derechos reservados.
        </footer>
    )
}