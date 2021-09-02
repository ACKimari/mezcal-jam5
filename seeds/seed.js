const sequelize = require('../config/connection');
const { User, Quote } = require('../models');

const userData = require('./userData.json');
const QuoteData = require('./QuoteData.json');
const Category = require('../Models/Category');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate([angryQuoteData, happyQuoteData, HumblemeQuoteData, peacefulQuoteData, sadQuoteData], {
    individualHooks: true,
    returning: true,
  });

  for (const quote of QuoteData) {
    await Quote.create({
      ...quote,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
