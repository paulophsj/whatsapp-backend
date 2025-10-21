import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Mensagem = sequelize.define(
    "mensagem", {
        enviado_por_funcionario: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        mensagem: {
            type: DataTypes.TEXT("long"),
            allowNull: false
        },
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "chat",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    }
)

export default Mensagem