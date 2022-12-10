import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Announcement = sequelize.define("Announcement", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  link: DataTypes.STRING,
  date: DataTypes.DATE,
});

Announcement.sync();

export default Announcement;
