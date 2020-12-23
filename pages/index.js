import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Form from '../components/Form';
import Link from 'next/link';
import { useAuth } from '../context/auth';
export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <Nav />
      <div style={{ padding: '40px' }}>
        <p>{`User ID: ${user ? user.uid : 'no user signed in'}`}</p>
        {JSON.stringify(user)}
        <p>
          <Link href='/dashbaord'>
            <a>Go to authenticated route</a>
          </Link>
        </p>
        <p>
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
