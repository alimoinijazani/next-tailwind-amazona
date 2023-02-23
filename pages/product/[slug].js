import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from './../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from './../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  //like react useParams
  const { slug } = query;

  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = (product) => {
    console.log(product);
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Product is out of Stock ');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 relative">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            responsive="true"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category:{product.category}</li>
            <li>Brand: {product.brand} </li>
            <li>
              {product.rating} of {product.numReviews} Reviews
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>${product.countInStock > 0 ? 'In stock' : 'Unavailble'}</div>
            </div>
            <button
              className="primary-button w-full"
              type="button"
              onClick={() => addToCartHandler(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
