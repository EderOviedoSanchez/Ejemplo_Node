const express = require('express');

const router = express.Router()

/**Rutas para el controlador de usuarios. */
const userrouter = require("./src/routes/user.routes");
router.use("/users/", userrouter);
/**Exportar el módulo. */
module.exports = router;