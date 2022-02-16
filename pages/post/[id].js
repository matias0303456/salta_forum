import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Urls from '../../helpers/Urls'
import { useSession } from 'next-auth/react'

export default function Post() {

    const [post, setPost] = useState({})
    const [newComment, setNewComment] = useState({})

    const urlPost = Urls.post
    const urlComment = Urls.comment

    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(async () => {
        if (router.query.id !== undefined) {
            try {
                const res = await axios.get(urlPost + router.query.id)
                setPost(res.data)
            } catch (err) {
                toast.error('Inicia sesión para ver esta página')
            }
        }
    }, [router.query.id])

    const handleChangeComment = e => {
        setNewComment({
            ...newComment,
            postId: post.id,
            userId: parseInt(session.token.sub),
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitComment = async () => {
        try {
            const res = await axios.post(urlComment, newComment)
            setPost({
                ...post,
                comments: [
                    res.data, ...post.comments
                ]
            })
            document.getElementById('commentInput').value = ''
        } catch (err) {
            toast.error(err.message)
        }
    }

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
                {(post.user !== undefined && (parseInt(session.token.sub) === post.user.id)) &&
                    <div className='mt-2'>
                        <button
                            className='bg-orange-500 text-white p-1 rounded mr-2'
                            type='button'
                        >
                            Editar
                        </button>
                        <button
                            className='bg-red-500 text-white p-1 rounded'
                            type='button'
                        >
                            Eliminar
                        </button>
                    </div>
                }
                <article className='border-2 border-gray-300 shadow mt-2 p-4 rounded'>
                    {post.content}
                </article>
                <article className='mt-2'>
                    <h3 className='font-bold'>Comentarios</h3>
                    <div>
                        {post.comments === undefined ?
                            '' :
                            post.comments.length === 0 ?
                                <span>
                                    Aun no hay comentarios
                                </span> :
                                post.comments.map(comment => {
                                    return (
                                        <div key={comment.id}>
                                            <span>
                                                {comment.content}
                                            </span>
                                            <span>
                                                Por @{comment.user.username}
                                            </span>
                                            <span>
                                                {(comment.responses !== undefined && comment.responses.length > 0) &&
                                                    comment.responses.map(resp => {
                                                        return (
                                                            <span>
                                                                {resp.content}
                                                            </span>
                                                        )
                                                    })}
                                            </span>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </article>
                <textarea
                    id='commentInput'
                    className='mt-2 w-1/3 resize-none border border-gray-300 rounded p-1 block'
                    name='content'
                    placeholder='Escribe un comentario...'
                    onChange={e => handleChangeComment(e)}
                ></textarea>
                <button
                    type='button'
                    className='bg-red-800 text-white rounded p-1 mt-1'
                    onClick={handleSubmitComment}
                >
                    Comentar
                </button>
            </section>
        </>
    )
}