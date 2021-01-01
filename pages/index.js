import { useEffect } from 'react';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Form from '../components/Form';
import Link from 'next/link';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
    return () => {};
  }, [user]);

  return (
    <Layout>
      <Nav />
      <div style={{ padding: '40px' }}>
        <p>
          <Link href='/dashboard'>
            <a>Go to dashboard</a>
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
