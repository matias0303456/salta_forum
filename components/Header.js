import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

export default function Header() {

    const router = useRouter()

    const { data: session } = useSession()

    return (
        <header className='bg-red-800 p-4 rounded flex justify-between items-center'>
            <nav className='bg-neutral-100 p-3 rounded flex'>
                <div
                    className='
                        font-serif
                        text-4xl
                        p-1
                        mr-6'
                >
                    Salta Forum
                </div>
                <ul className='flex items-center font-serif text-xl'>
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
                    {session &&
                        <>
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
                                onClick={() => router.push('/perfil/' + 'matias0303456')}
                            >
                                Perfil
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
                                onClick={() => router.push('/nuevo_post')}
                            >
                                Nuevo
                            </li>
                        </>
                    }
                </ul>
            </nav>
            <div className='float-right'>
                {session ?
                    <button
                        type='button'
                        className='bg-black text-white p-2 rounded'
                        onClick={() => signOut()}
                    >
                        Salir
                    </button> :
                    <>
                        <button
                            type='button'
                            className='bg-black text-white p-2 rounded mr-2'
                        >
                            Registrarse
                        </button>
                        <button
                            type='button'
                            className='bg-black text-white p-2 rounded'
                            onClick={() => signIn()}
                        >
                            Iniciar sesión
                        </button>
                    </>
                }
            </div>
        </header>
    )
}