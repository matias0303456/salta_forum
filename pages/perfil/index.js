import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'

export default function Perfil() {
    return (
        <>
            <Head>
                <title>Salta Forum | Mi perfil</title>
            </Head>
            <div className='p-1'>
                <Layout>
                    <h1>
                        Mi perfil
                    </h1>
                </Layout>
            </div>
        </>
    )
}