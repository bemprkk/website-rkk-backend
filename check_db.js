const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const run = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully!');
    
    const users = await User.find({});
    console.log('Total users:', users.length);
    users.forEach(u => {
      console.log(`- ID: ${u.id}, Email: ${u.email}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error connecting or querying database:', err);
    process.exit(1);
  }
};

run();
