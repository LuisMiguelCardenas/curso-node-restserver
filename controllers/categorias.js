const { response } = require("express");
const { Categoria } = require("../models");

// controladores

const categoriasGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true }; // para que se vea solo los de estado true

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).populate("usuario", "name").skip(desde).limit(limit),
  ]);

  res.json({
    total,
    categorias,
  });
};

const categoriaGet = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "name");

  res.json({ categoria });
};
const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // genera la data a guardar

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  await categoria.save();

  res.status(201).json(categoria);
};

// actualizar la categora recibiendo el nombre

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};
// borrar categoria - es cambiar el estado a false se requiere el id

const categoriasDelete = async (req, res) => {
  const { id } = req.params;

  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    categoriaBorrada,
  });
};

module.exports = {
  crearCategoria,
  categoriasGet,
  categoriaGet,
  actualizarCategoria,
  categoriasDelete,
};
