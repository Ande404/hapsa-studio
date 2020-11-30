import Layout from '../components/Layout';
import Nav from '../components/Nav';
import StoreFront from '../components/StoreFront';

const store = () => {
  return (
    <div>
      <Layout>
        <Nav />
        <StoreFront />
      </Layout>
    </div>
  );
};

export default store;
