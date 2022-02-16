import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
    return (
        <div className='p-1'>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}