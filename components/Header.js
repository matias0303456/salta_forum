import React from 'react'
import { useRouter } from 'next/router'

export default function Header() {

    const router = useRouter()

    return (
        <header className='bg-red-800 p-4 rounded'>
            <nav className='bg-neutral-100 p-3 rounded'>
                <ul className='flex font-serif text-xl'>
                    <li
                        className='
                            cursor-pointer  
                            p-1 
                            rounded 
                            text-black 
                            hover:text-white
                            hover:bg-red-800 
                            hover:transition-all
                            duration-300'
                        onClick={() => router.push('/')}
                    >
                        Inicio
                    </li>
                    <li
                        className='
                            ml-3 
                            cursor-pointer
                            p-1 
                            rounded 
                            text-black 
                            hover:text-white 
                            hover:bg-red-800
                            hover:transition-all 
                            duration-300'
                        onClick={() => router.push('/perfil')}
                    >
                        Perfil
                    </li>
                </ul>
            </nav>
        </header>
    )
}