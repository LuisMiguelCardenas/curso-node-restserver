const { Router } = require("express");
const { check } = require("express-validator");
const { esRoleValido, emailExiste, exiteUsuarioById } = require("../helpers/db-validators");

const { validarCampos } = require('../middlewares/validar-campos')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( exiteUsuarioById ),
    check('role').custom( (role) => esRoleValido(role) ),
    validarCampos
], usuariosPut);

router.post("/",[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser más de seis letras').isLength({min:6}),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom((email) => emailExiste(email)),
  // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom( (role) => esRoleValido(role) ),
  validarCampos
], usuariosPost);

router.delete("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( exiteUsuarioById ),
  validarCampos
] ,usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
