module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    title: {
      type: Sequelize.STRING(128),
    },
    description: {
      type: Sequelize.STRING(500),
    },
    author: {
      type: Sequelize.INTEGER(11),
    },
    released_date: {
      type: Sequelize.STRING(20),
    },
    image: {
      type: Sequelize.STRING(256),
    },
    status: {
      type: Sequelize.INTEGER(11),
    },
    id_category: {
      type: Sequelize.INTEGER(20),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('books'),
};
