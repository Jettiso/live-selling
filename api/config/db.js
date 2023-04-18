const Sequelize = require("sequelize");

// Replace the connection parameters with your MySQL database credentials
const sequelize = new Sequelize("users", "root", "Jetdb1234", {
	host: "localhost",
	dialect: "mysql",
});

module.exports = sequelize;
