import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Predefinidas = sequelize.define(
    "predefinidas", {
    mensagem: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ativa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
            model: "funcionario",
            key: "id"
        }
    }
}
)

export default Predefinidas