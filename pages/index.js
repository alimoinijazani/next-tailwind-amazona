import ProductItems from '../components/ProductItems';
import Layout from './../components/Layout';
import data from './../utils/data';

export default function Home() {
  return (
    <Layout title="ali ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItems product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}
