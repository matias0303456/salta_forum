import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Urls from '../../helpers/Urls'

export default function Post() {

    const [post, setPost] = useState({})

    const urlPost = Urls.post

    const router = useRouter()

    useEffect(async () => {
        if (router.query.id !== undefined) {
            try {
                const res = await axios.get(urlPost + router.query.id)
                setPost(res.data)
            } catch (error) {
                toast.error(err.message)
            }
        }
    }, [router.query.id])

    return (
        <>
            <Head>
                <title>Salta Forum | {post.title}</title>
            </Head>
            <section className='p-5'>
                <h1 className='font-bold text-3xl text-red-800'>
                    {post.title}
                </h1>
                <p>
                    Por <span
                        className='cursor-pointer hover:text-red-800'
                        onClick={() => post.user !== undefined && router.push('/perfil/' + post.user.username)}
                    >
                        {post.user !== undefined && post.user.username}
                    </span> | <span
                        className='text-gray-300 text-sm'
                    >
                        {post.timestamp}
                    </span>
                </p>
                <article className='border-2 border-gray-300 shadow mt-2 p-4 rounded'>
                    {post.content}
                </article>
            </section>
        </>
    )
}