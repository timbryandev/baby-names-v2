import { useEffect, useState } from 'react'
import Head from 'next/head'
import Status from '../components/Status'
import Footer from '../components/Footer'
import NamesList from '../components/NamesList'
import SubmitName from '../components/SubmitName'

export default function Home() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Reset success status after timeout
  useEffect(() => {
    setTimeout(() => setSuccess(false), 5000)
  }, [success])

  return (
    <div className='container'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Baby Bryan #2</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css'
        ></link>
      </Head>

      <header>
        <h1>Names for Baby&nbsp;Bryan 2020</h1>
      </header>

      <main>
        {error && (
          <section>
            <Status message={error} type='error' />
          </section>
        )}
        {success && (
          <section>
            <Status
              message={
                'Thank you for your name suggestion - it will be added to our list shortly!'
              }
              type='success'
            />
          </section>
        )}
        <section>
          <SubmitName onError={setError} onSubmit={() => setSuccess(true)} />
        </section>
        <section>
          <NamesList onError={setError} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
