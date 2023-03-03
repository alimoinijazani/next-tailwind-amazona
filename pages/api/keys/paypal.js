import { getSession } from 'next-auth/react';
import NextCors from 'nextjs-cors';
const handler = async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};
export default handler;
