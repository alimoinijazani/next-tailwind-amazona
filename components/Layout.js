import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + '-amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="h-12 flex justify-between items-center shadow-md px-4">
            <Link href="/">
              <span className="text-lg font-bold">Amazona</span>
            </Link>
            <div>
              <Link href="/cart">
                <span className="p-2">Cart</span>
              </Link>
              <Link href="/login">
                <sapn>Login</sapn>
              </Link>
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
