import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../utils/db.js';
import { User } from '../models/User.js';
import { Note } from '../models/Note.js';

const run = async () => {
  await connectDB();
  console.log('Seeding...');

  //Create test user
  const email = process.env.SEED_USER_EMAIL || 'test@example.com';
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name: 'Seed User', isVerified: true });
    console.log('Created user', user.email);
  } else {
    console.log('User exists:', email);
  }

  // Create some notes
  const notes = [
    { title: 'Seed Note 1', content: 'This is a seeded note.' },
    { title: 'Seed Note 2', content: 'Another seeded note.' },
  ];
  for (const n of notes) {
    await Note.create({ ...n, user: user._id });
  }
  console.log('Notes created');

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
