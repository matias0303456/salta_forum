import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Salta Forum | Inicio</title>
      </Head>
      <div className='p-1'>
        <Layout>
          <h1>Inicio</h1>
        </Layout>
      </div>
    </>
  )
}
