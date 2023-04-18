import { Sequelize } from "sequelize";
import db from '../config/db.js'
import { v4 as uuidv4 } from "uuid"; // Import UUID library

const User = db.define("user", {
	id: {
		type: Sequelize.UUID,
		defaultValue: () => uuidv4(), // Use UUID library to generate default value
		primaryKey: true,
		unique: true,
		allowNull: false,
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	address: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	role: {
		type: Sequelize.ENUM("buyer", "seller"), // Define role as enum (buyer or seller)
		allowNull: false,
	},
});

// Hash password before saving to database
User.beforeCreate(async (user) => {
	try {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to hash password");
	}
});

User.sync()
	.then(() => {
		console.log("Users table created successfully");
	})
	.catch((error) => {
		console.error("Error creating users table:", error);
	});

export default User;
