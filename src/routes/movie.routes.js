const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.conntroller');

/**Crear las rutas.*/
/**Ruta para el método index. */
router.get('/', movieController.index);
/**Ruta para el método create. */
// router.post("/", movieController.create);
// /**Ruta para el método update. */
// router.put("/:id", movieController.update);
// /**Ruta para el método destroy */
// router.delete("/:id", movieController.destroy);
// /**Ruta para el método consult. */
// router.get("/:id", movieController.consult);

/**Exportar el router para poder ser utilizado en otras partes de la API.*/
module.exports = router;