const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no está registrado en la DB`);
  }
};

const emailExiste = async ( email="" ) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ${email} ya está registrado`)
  }
};

const exiteUsuarioById = async ( id ) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`)
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  exiteUsuarioById
};
