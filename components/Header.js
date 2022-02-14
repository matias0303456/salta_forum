import React from 'react'
import { useRouter } from 'next/router'

export default function Header() {

    const router = useRouter()

    return (
        <header className='bg-red-800 p-4 rounded'>
            <nav className='bg-neutral-100 p-3 rounded'>
                <ul className='flex'>
                    <li
                        onClick={() => router.push('/')}
                    >
                        Inicio
                    </li>
                    <li
                        onClick={() => router.push('/perfil')}
                    >
                        Perfil
                    </li>
                </ul>
            </nav>
        </header>
    )
}