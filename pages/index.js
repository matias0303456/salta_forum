import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Urls from '../helpers/Urls'

export default function Home() {

  const [posts, setPosts] = useState([])

  const urlPost = Urls.post

  const router = useRouter()

  useEffect(async () => {
    try {
      const res = await axios.get(urlPost)
      setPosts(res.data.reverse())
    } catch (err) {
      toast.error(err.message)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Salta Forum | Inicio</title>
      </Head>
      <section className='p-5'>
        {posts.map(post => (
          <article key={post.id} className="p-4 shadow rounded mb-5">
            <strong
              className='cursor-pointer hover:text-red-800'
              onClick={() => router.push('/post/' + post.id)}
            >
              {post.title}
            </strong>
            <p
              className='cursor-pointer hover:text-red-800'
              onClick={() => router.push('/perfil/' + post.user.username)}
            >
              {post.user.username}
            </p>
            <span className='text-gray-400 text-sm'>
              {post.timestamp}
            </span>
          </article>
        ))}
      </section>
    </>
  )
}


