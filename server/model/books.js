import { DataTypes } from "sequelize";

const Books = (sequelize) => {
  const Schema = {
    title: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: true, // NOT NULL in SQL (standartine reiksme - true)
    },
    author: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    description: {
      type: DataTypes.TEXT, //=TEXT
    },
    image: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    category: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    price: {
      type: DataTypes.INTEGER, //=INT
    },
  };
  return sequelize.define("books", Schema);
};

export default Books;
