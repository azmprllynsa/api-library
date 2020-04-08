/* eslint-disable func-names */

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {});
  Category.associate = function (models) {
  //   // associations can be defined here
    Category.hasMany(models.book, {
      foreignKey: 'id_category',
      as: 'categories',
      sourceKey: 'id',
    });
  };
  return Category;
};
