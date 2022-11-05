const { Router } = require("express");
const { check } = require("express-validator");
const {
  productosGet,
  productoGet,
  crearProducto,
  actualizarProducto,
  productoDelete,
} = require("../controllers/productos");
const {
  existeProductoPorId,
  exiteCategoriaPorId,
} = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// hacer midleware personaliozado para validad el id

// Obtener todas los productos - publico
router.get("/", productosGet);

// Obtener un producto por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  productoGet
);

// Crear producto - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("categoria", "No es un Id de Mongo").isMongoId(),
    check("categoria").custom(exiteCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Actualizar - privado - cualquiera con token valido
router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProductoPorId), validarCampos],
  actualizarProducto
);
// Borrar una categoria - solo si es admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  productoDelete
);

module.exports = router;
