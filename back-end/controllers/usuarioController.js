import {Usuario} from '../models/usuarios.js'

export const getAllUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    }catch(error){
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({message:'Error al obtener a los usuarios actuales'});
    }
};
export const createUsuario = async(req, res) =>{
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json({message:'Usuario agregado correctamente',usuario});
    }catch(error){
        console.error('Error al crear el usuario:', error);
        res.status(500).json({message: ' Error al crear el usuario'});
    }
}