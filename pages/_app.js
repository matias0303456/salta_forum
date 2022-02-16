import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Layout from '../components/Layout';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <>
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position='bottom-left'
          hideProgressBar={true}
        />
      </Layout>
    </SessionProvider>
  </>
}

export default MyApp
