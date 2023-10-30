import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize("testconnect", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
