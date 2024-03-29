import db from '../../utils/db';
import data from './../../utils/data';
import User from './../../Model/user';
import Product from '../../Model/product';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfuly' });
};

export default handler;
