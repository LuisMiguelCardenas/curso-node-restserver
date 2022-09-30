const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs =require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        // verificar si el email existe 
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({
                msg: "Usuario o contraseña invalidos - email"
            })
        }

        // verificar si el ususario esta activo en la BD
        if(!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario o contraseña invalidos - estado:false"
            })
        }

        // Verificar la contraseña

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if(!validPassword) {
            return res.status(400).json({
                msg: "Usuario o contraseña invalidos - password"
            })
        }

        // Generar el JWT

        const token = await generarJWT( usuario.id );
        
        res.json({
            msg:'login ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }

};


module.exports = {
    login
}