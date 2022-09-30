const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");



const usuariosGet = async (req = request, res = response) => {

  // const {q, nombre = 'No name', apikey, page = 1, limit } = req.query;
  const { limit= 5, desde = 0} = req.query
  const query = { estado:true } // para que se vea solo los de estado true

  // const usuarios = await Usuario.find(query)
    // .skip( desde )
    // .limit(limit);

  //const total =await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip( desde )
    .limit(limit)
  ])

  res.json({
    total,
    usuarios

  });
};

const usuariosPut = async (req, res) => {

  const id = req.params.id;
  const { _id, password, google, email, ...rest} = req.body;

  // Validar contra la DB
  if( password ){
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt );

  }

  const usuario = await Usuario.findByIdAndUpdate( id, rest);

  res.json({usuario});
};
const usuariosPost = async (req, res) => {


  const { name, email, password, role } = req.body;
  const usuario = new Usuario( { name, email, password, role } );

  // encirptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt )


  // Guardar en DB
  await usuario.save();

  res.json({
    msg: "post Api - controlado",
    usuario
  });
};

const usuariosDelete = async (req, res) => {

  const { id } = req.params;

  const uid = req.uid

  // Borrado fisicamente 
  // const usuario = await Usuario.findByIdAndDelete( id )
  
  // Para borrarlo sin quitarlo de la base de datos
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
  const usuarioAutenticado = req.usuario

  res.json({
    usuario,
    usuarioAutenticado
  });
};

const usuariosPatch =  (req, res) => {
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
