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
    loan.hasMany(models.book, {
      foreignKey: 'id',
      as: 'bookLoan',
      sourceKey: 'id',
    });

    loan.hasMany(models.user, {
      foreignKey: 'id',
      as: 'userLoan',
      sourceKey: 'id',
    });
  };
  return loan;
};
