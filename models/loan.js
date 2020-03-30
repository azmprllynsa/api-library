module.exports = (sequelize, DataTypes) => {
  const loan = sequelize.define('loan', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    borrow_date: DataTypes.STRING,
    expired_date: DataTypes.STRING,
    return_date: DataTypes.STRING,
    forfeit: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line func-names
  loan.associate = function (models) {
    // associations can be defined here
    loan.belongsTo(models.book, {
      foreignKey: 'book_id',
      as: 'book',
      sourceKey: 'id',
    });

    loan.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
      sourceKey: 'id',
    });
  };
  return loan;
};
