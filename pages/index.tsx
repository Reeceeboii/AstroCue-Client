import type { NextPage } from 'next';
import Layout from '../src/components/Layout/Layout';
import { useAstroCueContext } from '../src/Context/AstroCueUser/AstroCueUserContext';
import useLoginRedirect from '../src/lib/Hooks/useLoginRedirect';

/** Home page */
const Home: NextPage = () => {
  useLoginRedirect();

  const { astroCueUser } = useAstroCueContext();

  return <Layout></Layout>;
};

export default Home;
