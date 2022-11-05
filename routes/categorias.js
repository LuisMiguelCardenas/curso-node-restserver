const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  categoriasGet,
  categoriasDelete,
  categoriaGet,
  actualizarCategoria,
} = require("../controllers/categorias");
const { exiteCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// hacer midleware personaliozado para validad el id

// Obtener todas las categorias - publico
router.get("/", categoriasGet);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exiteCategoriaPorId),
    validarCampos,
  ],
  categoriaGet
);

// Crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar - privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(exiteCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);
// Borrar una categoria - solo si es admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exiteCategoriaPorId),
    validarCampos,
  ],
  categoriasDelete
);

module.exports = router;
