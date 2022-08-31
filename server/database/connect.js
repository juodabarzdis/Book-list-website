import { Sequelize } from "sequelize";
import Books from "../model/books.js";
import Users from "../model/users.js";
import mysql from "mysql2/promise";

const database = {};

const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "booksapp",
};

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  // Create database
  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  // Use database
  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    {
      dialect: "mysql",
    }
  );

  // Create table // per egza keiciam tik sita
  database.Books = Books(sequelize);
  database.Users = Users(sequelize);

  await sequelize.sync({ alter: true });
} catch {
  console.log("Error connecting to database");
}

export default database;
