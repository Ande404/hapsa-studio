import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Form from '../components/Form';
import GridView from '../components/GridView';
import Featured from '../components/Featured';
import { useAuth } from '../lib/auth';
export default function Home() {
  const auth = useAuth();
  return (
    <Layout>
      <Nav />
      <Hero />

      {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={(e) => auth.signinWithGitHub()}>Sign In</button>
      )}
      <Featured />
      <p>hi</p>

      {/* <GridView /> */}
      {/* <Form /> */}
    </Layout>
  );
}
