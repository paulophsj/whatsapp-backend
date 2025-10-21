import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Empresa = sequelize.define(
    "empresa", 
    {
        nome: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT("long"),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            references: {
                model: "role",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    }
)

export default Empresa