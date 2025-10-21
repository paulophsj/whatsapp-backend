import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Cliente = sequelize.define(
    "cliente", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero_cliente: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3,
            references: {
                model: "role",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    }
)

export default Cliente