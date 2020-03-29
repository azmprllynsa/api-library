'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('user', {
    card_number: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    job: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.STRING,
    role_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};