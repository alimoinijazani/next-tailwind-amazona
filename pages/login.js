import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1>Login</h1>
        <div className="mb-4">
          <labet htmlFor="email">Email</labet>
          <input
            type="email"
            id="email"
            autoFocus
            className="w-full"
            {...register('email', {
              required: 'Please enter Email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$/i,
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <labet htmlFor="password">Password</labet>
          <input
            type="password"
            id="password"
            autoFocus
            className="w-full"
            {...register('password', {
              required: 'Please enter Password',
              minLength: {
                value: 6,
                message: 'password shoul be more than 5 character',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Login
          </button>
        </div>
        <div>
          Don&apos;t Have an account?{' '}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
}
