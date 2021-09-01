const sequelize = require('../config/connection');
const { User, Parent, Teacher, Student } = require('../models');

const userData = require('./userData.json');
const parentData = require('./parentData.json');
const teacherData = require('./teacherData.json');
const studentData = require('./studentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Parent.bulkCreate(parentData, {
    individualHooks: true,
    returning: true,
  });

  await Teacher.bulkCreate(teacherData, {
    individualHooks: true,
    returning: true,
  });

  await Student.bulkCreate(studentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
