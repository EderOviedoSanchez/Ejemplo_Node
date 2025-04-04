const {sync} = require("../models/user.model");
const {Op} = require("sequelize");
/**Función index, devuelve el listado de usuarios.*/
const index = async (req, res) =>{
    try {
    const user = await User.findAll();
    if (!users || users.length == 0) {
        return res.status(404).json({
            status: false,
            msg: "No esxisten usuarios en la base de datos.",
            data: null,
        });
    }
    return res.status(200).json({
        status: true,
        msg: "Listado de usuarios obtenidos correctamente.",
        data: users,
    });
    } catch (error) {
    
    }
};
/**Función create, crea un nuevo usuario. */
const create = async (req, res) =>{
    try {
    console.log(req.body);
    /**conct user = await User.create(req.body); */
    const [user, created] = await User.findOrCreate({
        where: {email: req.body.email},
        default: req.body,
    });
    if (!created) {
        return res.status(409).json({
            status: false,
            msg: "Email ya existe en otro usuario. No se puede crear.",
            data: null,
        });
    }
    return res.status(201).json({
        status: true,
        msg: "Usuario creado de forma correcta.",
        data: user,
    });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: `Error al crear un usuario: ${error.message}`,
            data: null,
        });
    }
};
/**Función update, actualizar usuario. */
const update = async (req, res) =>{
    try {
    const idUser = req.params.id;
    const user = await User.findByPK(idUser);
    if (!user) {
        return res.status(404).json({
            status: false,
            msg: `Usuario a modificar con el id: ${idUser} no encontrado en base de datos.`,
            data: null,
        });
    }
    const emailExist = await User.findOne({
        where: {email: req.body.email, id: {[Op.ne]: idUser}},
    });
    if (emailExist) {
        return res.status(409).json({
            status: false,
            msg: `Usuario a actualizar con el id: ${idUser} no se encuentra en la base de datos.`,
        });
    }


    const userUpdate = await User.update(req.body, {
        where: {id: idUser},
    });/** Falta escribir este código. */
    const userUpdated = await User.findByPK(id);
    return res.status(200).json({
        status: true,
        msg: `Usuario con el id: ${id} actualizado de forma correcta.`,
        data: userUpdated,
    });
    } catch (error) {
    
    }
};
/**Función destroy, elimina el usuario. */
const destroy = async (req, res) =>{
    try {
    const idUser = req.params.id;
    const user = await User.findByPK(idUser);
    if (!user) {
        return res.status(404).json({
            status: false,
            msg: `Usuario a eliminar con el id: ${idUser} no encontrado en base de datos.`,
            data: null,
        });
    }
    } catch (error) {
    
    }
};
/**Función consult, muestra un solo registro. */
const consult = async (req, res) =>{
    try {
    const id = req.params;
    const user = await User.findByPK(id);
    if (!user) {
        return res.status(404).json({
            status: false,
            msg: `Usuario con el id: ${id}, no encontramos en base de datos.`,
            data: null,
        });
    }
    return res.status(200).json({
        status: true,
        msg: "Usuario encontrado de forma correcta.",
        data: user,
    });
    } catch (error) {
        return res.status(404).json({
            status: false,
            msg: `Usuario con el id: ${id}, no encontramos en base de datos.`,
            data: null,
        });/**Falta copiar el código en esta sección. */
    }
};
/**Exportar el módulo para su uso externo.*/
module.exports = {
    index, create, update, destroy, consult,
};