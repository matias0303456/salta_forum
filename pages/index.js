import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import Urls from '../helpers/Urls'

export default function Home() {

  const [posts, setPosts] = useState([])

  const urlPost = Urls.post

  useEffect(async () => {
    try {
      const res = await axios.get(urlPost)
      setPosts(res.data)
    } catch (err) {
      toast.error(err.message)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Salta Forum | Inicio</title>
      </Head>
      <div className='p-1'>
        <Layout>
          <section className='p-5'>
            {posts.map(post => (
              <article key={post.id} className="p-4 shadow rounded mb-5">
                <strong>{post.title}</strong>
                <p>{post.user.username}</p>
                <span className='text-gray-400 text-sm'>
                  {new Date().toDateString(post.timestamp)}
                </span>
              </article>
            ))}
          </section>
        </Layout>
      </div>
    </>
  )
}


