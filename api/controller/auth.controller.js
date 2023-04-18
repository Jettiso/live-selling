const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Sign-in handler
exports.signIn = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find user in the database
		const user = await User.findOne({ where: { username } });

		if (user) {
			// Compare password with hashed password in the database
			const isMatch = await bcrypt.compare(password, user.password);

			if (isMatch) {
				// If authentication is successful, generate JWT token
				const token = jwt.sign({ username: user.username }, "your-secret-key", { expiresIn: "1h" });

				res.json({ token });
			} else {
				res.status(401).json({ error: "Invalid username or password" });
			}
		} else {
			res.status(401).json({ error: "Invalid username or password" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

exports.signUp = async (req, res) => {
	const { firstName, lastName, address, username, password, role, id } = req.body;

	try {
		const user = await User.create({
			firstName,
			lastName,
			address,
			username,
			password,
			id,
			role,
		});

		console.log("User created:", user.toJSON());
		res.status(201).json({ success: true, message: "User created successfully" });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ success: false, error: "Failed to create user" });
	}
};
