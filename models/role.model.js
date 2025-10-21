import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

export const roles = ["admin", "empresa", "funcionario"]

const Role = sequelize.define(
    "role", 
    {
        tipo: {
            type: DataTypes.ENUM(...roles),
            allowNull: false
        }
    }
)

export async function createRoles() {
    try {
        for(const role of roles){
            await Role.findOrCreate({
                where: {tipo: role},
                defaults: {tipo: role}
            })
        }
        console.log("Roles criadas com sucesso!")
    } catch (error) {
        console.log("Erro ao criar roles")
    }
}

export default Role