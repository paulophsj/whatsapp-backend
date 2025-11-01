import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Estatisticas = sequelize.define(
    "estatisticas", {
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
                model: "chat",
                key: "id"
            }
        },
        tempoMedioCliente: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        tempoMedioFuncionario: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    }
)

export default Estatisticas