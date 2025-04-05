const User = require("../models/user.model");
const {Op} = require("sequelize");
/**Función index, devuelve el listado de usuarios.*/
const index = async (req, res) =>{
    try {
    const users = await User.findAll();
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
        return res.status(500).json({
            status: false,
            msg: `Error al obtener el listado de usuarios: ${error.message}`,
            data: null,
        });
    }
};
/**Función create, crea un nuevo usuario. */
const create = async (req, res) =>{
    try {
    console.log(req.body);
    /**conct user = await User.create(req.body); */
    const [user, created] = await User.findOrCreate({
        where: {email: req.body.email},
        defaults: req.body,
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
    const idUser = req.params.id;
    try {
    const user = await User.findByPk(idUser);
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
            msg: "Email ya existe en otro usuario. No se puede crear.",
            data: null,
        });
    }
    const userUpdate = await User.update(req.body, {
        where: {id: idUser},
    });
    const userUpdated = await User.findByPk(id);
    return res.status(200).json({
        status: true,
        msg: `Usuario con el id: ${id} actualizado de forma correcta.`,
        data: userUpdated,
    });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: `Error al actualizar el usuario con el ${id}.`,
            data: null,
        });
    }
};
/**Función destroy, elimina el usuario. */
const destroy = async (req, res) =>{
    const idUser = req.params.id;
    try {
    const user = await User.findByPk(idUser);
    if (!user) {
        return res.status(404).json({
            status: false,
            msg: `Usuario a eliminar con el id ${idUser} no encontrado en base de datos.`,
            data: null,
        });
    }
    await user.destroy();
    return res.status(200).json({
        status: true,
        msg: `Usuario con el id ${idUser} ha sido eliminado correctamente.`,
        data: userUpdated,
    });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: `Error al eliminar el usuario con el ${idUser}.`,
            data: null,
        });
    }
};
/**Función consult, muestra un solo registro. */
const consult = async (req, res) =>{
    const id = req.params.id;
    try {
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            status: false,
            msg: `Usuario con el id ${id} no encontrado en la base de datos.`,
            data: null,
        });
    }
    return res.status(200).json({
        status: true,
        msg: "Usuario encontrado de forma correcta.",
        data: user,
    });
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: `Error al obtener el usuario con el id ${id}: ${error.message}.`,
            data: null,
        });
    }
};
/**Exportar el módulo para su uso externo.*/
module.exports = {
    index, create, update, destroy, consult,
};