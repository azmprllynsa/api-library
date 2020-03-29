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
  // book.associate = function(models) {
  //   // associations can be defined here
  // };
  return book;
};
