const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();

router.post("/", cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe de ser de Mongo").isMongoId(),
    check("coleccion").custom((coleccion) =>
      coleccionesPermitidas(coleccion, ["usuarios", "productos"])
    ),
    validarCampos,
    validarArchivoSubir,
  ],
  actualizarImagenCloudinary
  // actualizarImagen
);

router.get("/:coleccion/:id", [
  check("id", "El id debe de ser de Mongo").isMongoId(),
  check("coleccion").custom((coleccion) =>
    coleccionesPermitidas(coleccion, ["usuarios", "productos"])
  ),
  validarCampos,
  mostrarImagen,
]);

module.exports = router;
