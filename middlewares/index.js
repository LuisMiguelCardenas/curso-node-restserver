const validaJWT = require("../middlewares/validar-jwt");
const validaCampos = require("../middlewares/validar-campos");
const validaRoles = require("../middlewares/validar-role");
const validarArchivoSubir = require("../middlewares/validar-archivo");

module.exports = {
  ...validaJWT,
  ...validaCampos,
  ...validaRoles,
  ...validarArchivoSubir,
};
