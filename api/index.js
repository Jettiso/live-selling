const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register authentication routes
app.use("/api/auth", authRoutes);

// Add other routes and middleware for your application as needed

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
