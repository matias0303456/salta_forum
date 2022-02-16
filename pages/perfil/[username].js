import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Urls from '../../helpers/Urls'
import { useSession } from 'next-auth/react'

export default function Perfil() {

    const [profile, setProfile] = useState({})

    const urlUser = Urls.user

    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(async () => {
        if (router.query.username !== undefined) {
            try {
                const res = await axios.get(urlUser + router.query.username)
                setProfile(res.data)
            } catch (err) {
                toast.error('Inicia sesión para ver esta página')
            }
        }
    }, [router.query.username])


    if (status === 'unauthenticated') {
        return (
            <>
                <Head>
                    <title>Salta Forum</title>
                </Head>
                <div className='p-5'>
                    <h1 className='font-bold text-2xl text-red-800 text-center'>
                        Inicia sesión para ver esta página
                    </h1>
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Salta Forum | {profile.username}</title>
            </Head>
            <div className='p-5'>
                <h1 className='font-bold text-3xl text-red-800'>
                    @{profile.username}
                </h1>
                <h2 className='font-blod text-2xl text-red-800 mt-4'>
                    Biografía
                </h2>
                <section className='border-2 border-gray-300 shadow mt-2 p-4 rounded'>
                    {profile.bio === null ?
                        <p className='text-gray-300'>
                            No se ha agregado una biografía...
                        </p> :
                        <p>
                            {profile.bio}
                        </p>
                    }
                </section>
                <h2 className='font-blod text-2xl text-red-800 mt-4'>
                    Datos personales
                </h2>
                <section className='border-2 border-gray-300 shadow mt-2 p-4 rounded'>
                    <table className='text-center w-full'>
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <td>{profile.first_name}</td>
                            </tr>
                            <tr>
                                <th>Apellido</th>
                                <td>{profile.last_name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <th>Usuario</th>
                                <td>{profile.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}
