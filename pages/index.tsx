import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import { useAstroCueContext } from '../src/context/AstroCueUser/AstroCueUserContext';
import useLoginRedirect from '../src/lib/hooks/useLoginRedirect';

/** Home page */
const Home: NextPage = () => {
  useLoginRedirect();

  const { astroCueUser } = useAstroCueContext();

  return (
    <Layout >

    </Layout>
  )
}

export default Home;
