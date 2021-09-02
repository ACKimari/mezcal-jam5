const User = require('./User');
const Quote = require('./Quote');
const UserFollower = require('./UserFollower');
const LikedQuote = require('./LikedQuote');

User.hasMany(Quote, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Quote.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(LikedQuote, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

LikedQuote.belongsToMany(User, {
    as: "favorites",
    through: "LikedQuote"
});

// User.belongsToMany(User, {
//     as: "Followers",
//     through: "Followers"
// });

module.exports = { User, Quote, UserFollower, LikedQuote };
