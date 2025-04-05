const express = require('express');

const router = express.Router()

/**Rutas para el controlador de usuarios. */
const userrouter = require("./src/routes/user.routes");
router.use("/users/", userrouter);
/**Rutas para el controlador de películas. */
const movieRouter = require("./src/routes/movie.routes");
router.use("/movies", movieRouter);

/**Exportar el módulo. */
module.exports = router;