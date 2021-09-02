const User = require('./User');
const Quote = require('./Quote');
const UserFollower = require('./UserFollower');

User.hasMany(Quote, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Quote.belongsTo(User, {
    foreignKey: 'user_id'
});

// User.belongsToMany(User, {
//     as: "Followers",
//     through: "Followers"
// });

module.exports = { User, Quote, UserFollower };
