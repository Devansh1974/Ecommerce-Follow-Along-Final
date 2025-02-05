if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path : "./config/.env",
    });
}

const connectDatabase = require('./db/Database.js');
const app = require("./app.js");
const PORT = process.env.PORT || 8080;

// Log the DB_URL to verify it's being read correctly
console.log("DB_URL:", process.env.DB_URL);

const server = app.listen(PORT, async () => {
    connectDatabase();
    console.log("The server is running on Port:" + PORT + " URL: http://localhost:" + PORT);
});
