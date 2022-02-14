import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import { useState } from 'react'
import axios from 'axios'
import Urls from '../../helpers/Urls'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Nuevo_post() {

    const [newPost, setNewPost] = useState({})

    const urlPost = Urls.post

    const router = useRouter()

    const handleChange = e => {
        setNewPost({
            ...newPost,
            userId: 2,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post(urlPost, newPost)
            if (res.status === 201) {
                router.push('/')
                toast.success('Post creado correctamente')
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <>
            <Head>
                <title>Salta Forum | Nuevo Post</title>
            </Head>
            <div className='p-1'>
                <Layout>
                    <div className='p-5'>
                        <h1 className='font-bold text-3xl text-red-800'>Nuevo Post</h1>
                        <form className='text-center mt-3 p-3 w-1/3 rounded shadow'>
                            <div className='mb-5 block'>
                                <label htmlFor='title' className='block text-lg font-bold text-red-800'>
                                    Título
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className='border-2 border-gray-200 rounded p-1'
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div className='block'>
                                <label htmlFor='content' className='block text-lg font-bold text-red-800'>
                                    Contenido
                                </label>
                                <textarea
                                    name='content'
                                    className='border-2 border-gray-200 rounded p-1 resize-none w-full'
                                    onChange={e => handleChange(e)}
                                ></textarea>
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
                </Layout>

            </div>
        </>
    )
}