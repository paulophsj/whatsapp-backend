import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  define: {
    freezeTableName: true
  },
  logging: false
});

export default sequelize