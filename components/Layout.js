import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  console.log(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  return (
    <>
      <Head>
        <title>{title ? title + '-amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-between">
        <header>
          <nav className="h-12 flex justify-between items-center shadow-md px-4">
            <Link href="/" className="text-lg font-bold">
              Amazona
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="rounded-full bg-red-600 px-2 py-1 ml-1 text-xs text-white font-bold">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link href="/login">Login</Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="h-10 flex justify-center items-center shadow-inner">
          copyright @ 2022
        </footer>
      </div>
    </>
  );
}
