const sequelize = require('../config/connection');
const { User, Quote, UserFollower } = require('../Models');

const userData = require('./userData.json');
const QuoteData = require('./QuoteData.json');
const Followers = require('./userFollowersQuoteData.json');
// const AppQuotes = require('./applicationQuotesData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const quote of QuoteData) {
    await Quote.create({
      ...quote,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  };

  await UserFollower.bulkCreate(Followers, {
    individualHooks: true,
    returning: true,
  });

  // await AppQuotes.bulkCreate(Quote, {
  //   individualHooks: true,
  //   returning: true,
  // });

  console.log('seeded')
  process.exit(0);
};

seedDatabase();
