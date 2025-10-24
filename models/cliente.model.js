import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Cliente = sequelize.define(
    "cliente", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numeroCliente: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false // == Posso ter o mesmo cliente em outro Whatsapp ==
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
        emAtendimento: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 4,
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