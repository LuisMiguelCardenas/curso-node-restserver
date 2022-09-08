const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {

  const {q, nombre = 'No name', apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get Api -- controlador",
    q,
    nombre,
    apikey,
    limit,
    page
  });
};

const usuariosPut = (req, res) => {

  const id = req.params.id;

  res.json({
    msg: "put Api - controlado",
    id: id
  });
};
const usuariosPost = (req, res) => {
  const body = req.body;

  res.json({
    msg: "post Api - controlado",
    body
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete Api - controlado",
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch Api - controlado",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
