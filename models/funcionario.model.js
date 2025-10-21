import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Funcionario = sequelize.define(
    "funcionario", {
        nome: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT("long"),
            allowNull: false
        },
        first_access: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "empresa",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
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

export default Funcionario