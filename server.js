const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
// const helpers = require('./utils/auth');
const passport = require('passport')


// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;


// const sess = {
//   secret: 'Smart Link',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

 
// app.use(session({ secret: 'Smart Link', resave: true, saveUninitialized:true})); // session secret
 
// app.use(passport.initialize());
 
// app.use(passport.session()); // persistent login sessions


app.use(routes);

// sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Retrieving your inner balance (server listening)`))
// });
