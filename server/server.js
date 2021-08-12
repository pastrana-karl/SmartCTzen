const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Uncaught exception handler
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>", 
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    userNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successfully');
});

const port = process.env.PORT || 3000;
const server = app.listen(port);

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});