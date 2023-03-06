import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from './../utils/error';
import axios from 'axios';
import Layout from './../components/Layout';

export default function ProfileScreen() {
  const { data: session } = useSession();
  console.log(session);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('profile updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="profile">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="w-full"
            {...register('name', { requierd: 'not optional' })}
            id="name"
          />
        </div>
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="w-full"
            {...register('email', {
              requierd: 'not optional',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'inser valid email',
              },
            })}
            id="email"
          />
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            {...register('password', {
              requierd: 'not optional',
              minLength: { value: 6, message: 'should be more than 5' },
            })}
            id="password"
          />
        </div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <div>
          <label htmlFor="confirmPassword">confirmPassword</label>
          <input
            type="password"
            className="w-full"
            {...register('confirmPassword', {
              requierd: 'not optional',
              minLength: { value: 6, message: 'should be more than 5' },
              validate: (value) => value === getValues('password'),
            })}
            id="confirmPassword"
          />
        </div>
        {errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword.message}</div>
        )}
        <div className="mb-4">
          <button className="primary-button">Update Profile</button>
        </div>
      </form>
    </Layout>
  );
}
ProfileScreen.auth = true;
