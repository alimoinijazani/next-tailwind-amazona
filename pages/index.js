import axios from 'axios';
import { useContext } from 'react';
import ProductItems from '../components/ProductItems';
import Product from '../Model/product';
import db from '../utils/db';
import Layout from './../components/Layout';
import { Store } from './../utils/Store';
import { toast } from 'react-toastify';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Add to Cart');
  };
  return (
    <Layout title="ali ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItems
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return { props: { products: products.map(db.convertDocToObj) } };
}
