const mongoose = require('mongoose'); // ORM object relational model

// connect to the database
// use native promise instead of other third party promise (since monoose just third party, and promise is recent added in)
mongoose.Promise = global.Promise;// latest monogoose use the native promise so no longer need this line here
// mongoos behind the sense, take care of timing that connect to the data, and come back (like async and await);

let db = {
    localhost: 'mongodb://localhost:27017/TodoDb',
    mlab: 'mongodb://mangoMonkey:K1n9h0n0@ds117422.mlab.com:17422/mango'
  };
mongoose.connect( db.localhost || db.mlab);
// mongoose.connect('mongodb://localhost:27017/TodoDb');

module.exports = {mongoose};