import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Session = sequelize.define(
    "session", {
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
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        qrCode: {
            type: DataTypes.TEXT("long"),
            allowNull: true
        }
    }
)

export default Session