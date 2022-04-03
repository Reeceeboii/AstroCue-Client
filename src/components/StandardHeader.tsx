import Head from "next/head";

/** A standard head component with title and favicon */
const StandardHead = () => { 
  return (
    <Head>
      <title>AstroCue</title>
      <meta name="description" content="AstroCue" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default StandardHead;