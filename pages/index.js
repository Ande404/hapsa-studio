import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Form from '../components/Form';
import GridView from '../components/GridView';
import Featured from '../components/Featured';
export default function Home() {
  return (
    <Layout>
      <Nav />
      <Hero />

      <Featured />

      {/* <GridView /> */}
      {/* <Form /> */}
    </Layout>
  );
}
