const sequelize = require('../config/connection');
const { User, Quote, Category } = require('../Models');

const userData = require('./userData.json');
const QuoteData = require('./QuoteData.json');
const Category = require('../categoryQuoteData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(categoryQuoteData, {
    individualHooks: true,
    returning: true,
  });

  for (const quote of QuoteData) {
    await Quote.create({
      ...quote,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log('seeded')
  process.exit(0);
};

seedDatabase();
