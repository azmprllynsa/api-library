module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('loans', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    book_id: {
      type: Sequelize.INTEGER,
    },
    borrow_date: {
      type: Sequelize.STRING,
    },
    expired_date: {
      type: Sequelize.STRING,
    },
    return_date: {
      type: Sequelize.STRING,
    },
    forfeit: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('loans'),
};
