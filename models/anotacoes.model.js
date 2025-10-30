import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Anotacoes = sequelize.define(
    "anotacoes", {
    mensagem: {
        type: DataTypes.TEXT("long"),
        allowNull: false
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
            model: "funcionario",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        references: {
            model: "cliente",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}
)

export default Anotacoes