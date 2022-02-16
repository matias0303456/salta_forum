import Head from 'next/head'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import Urls from '../../helpers/Urls'
import { toast } from 'react-toastify'

export default function Registro() {

    const [newUser, setNewUser] = useState({})

    const urlUser = Urls.user

    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            await axios.post(urlUser, newUser)
            toast.success('Usuario registrado correctamente')
            setTimeout(() => {
                signIn()
            }, 2000);
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Head>
                <title>Salta Forum | Registro</title>
            </Head>
            <div className='p-5'>
                <h1 className='font-bold text-3xl text-red-800'>
                    Registro de usuario
                </h1>
                <form className='text-center mt-3 p-3 w-1/3 rounded shadow'>
                    <div className='mb-5 block'>
                        <label htmlFor='title' className='block text-lg font-bold text-red-800'>
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            className='border-2 border-gray-200 rounded p-1'
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className='mb-5 block'>
                        <label htmlFor='title' className='block text-lg font-bold text-red-800'>
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            className='border-2 border-gray-200 rounded p-1'
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className='mb-5 block'>
                        <label htmlFor='title' className='block text-lg font-bold text-red-800'>
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            className='border-2 border-gray-200 rounded p-1'
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className='mb-5 block'>
                        <label htmlFor='title' className='block text-lg font-bold text-red-800'>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className='border-2 border-gray-200 rounded p-1'
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className='mb-5 block'>
                        <label htmlFor='title' className='block text-lg font-bold text-red-800'>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            className='border-2 border-gray-200 rounded p-1'
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <button
                        type='button'
                        className='bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-3'
                        onClick={handleSubmit}
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </>
    )
}