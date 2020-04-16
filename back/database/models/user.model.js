module.exports = (Sequelize, connector) => {
  const User = connector.define("user", {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
  });

  return User;
};
