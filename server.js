const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
// const helpers = require('./utils/auth');



const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
  secret: 'Soap Box',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


// app.use(session({ secret: 'Smart Link', resave: true, saveUninitialized:true})); // session secret

// app.use(passport.initialize());

// app.use(passport.session()); // persistent login sessions


app.use(routes);
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Retrieving your inner balance (server listening at port 3001)`))
});
