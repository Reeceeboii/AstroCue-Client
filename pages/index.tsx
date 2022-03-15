import type { NextPage } from 'next'
import Head from 'next/head'
import Button from '@mui/material/Button'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AstroCue</title>
        <meta name="description" content="AstroCue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Button variant="contained">Hello World</Button>
        
      </main>

      <footer className={styles.footer}>
        <p>Some footer content</p>
      </footer>
    </div>
  )
}

export default Home
