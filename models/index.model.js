import Role from "./role.model.js";
import Chat from "./chat.model.js";
import Empresa from "./empresa.model.js";
import Cliente from "./cliente.model.js";
import Session from "./session.model.js";
import Mensagem from "./mensagem.model.js";
import Funcionario from "./funcionario.model.js";

const db = {}

db.empresa = Empresa
db.role = Role
db.funcionario = Funcionario
db.chat = Chat
db.cliente = Cliente
db.mensagem = Mensagem
db.session = Session

db.role.hasMany(db.empresa, {foreignKey: "role_id"})
db.empresa.belongsTo(db.role, {foreignKey: "role_id"})

db.role.hasMany(db.cliente, {foreignKey: "role_id"})
db.cliente.belongsTo(db.role, {foreignKey: "role_id"})

db.cliente.hasMany(db.chat, {foreignKey: "cliente_id"})
db.chat.belongsTo(db.cliente, {foreignKey: "cliente_id"})

db.funcionario.hasMany(db.chat, {foreignKey: "funcionario_id"})
db.chat.belongsTo(db.funcionario, {foreignKey: "funcionario_id"})

db.empresa.hasMany(db.funcionario, {foreignKey: "empresa_id"})
db.funcionario.belongsTo(db.empresa, {foreignKey: "empresa_id"})

db.role.hasMany(db.funcionario, {foreignKey: "role_id"})
db.funcionario.belongsTo(db.role, {foreignKey: "role_id"})

db.chat.hasMany(db.mensagem, {foreignKey: "chat_id"})
db.mensagem.belongsTo(db.chat, {foreignKey: "chat_id"})

db.empresa.hasOne(db.session, {foreignKey: "empresa_id"})
db.session.belongsTo(db.empresa, {foreignKey: "empresa_id"})

export default db