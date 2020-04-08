/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.INTEGER,
    released_date: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
  }, {});
  book.associate = function (models) {
  //   // associations can be defined here
    book.hasMany(models.loan, {
      foreignKey: 'id',
      as: 'bookLoan',
      sourceKey: 'id',
    });
    book.belongsTo(models.Category, {
      foreignKey: 'id',
      as: 'categories',
      sourceKey: 'id',
    });
  };

  return book;
};
