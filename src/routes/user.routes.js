const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user.controller');

/**Crear las rutas.*/
/**Ruta para el método index. */
router.get('/', usercontroller.index);
/**Ruta para el método create. */
router.post("/", usercontroller.create);
/**Ruta para el método update. */
router.put("/:id", usercontroller.update);
/**Ruta para el método destroy */
router.delete("/:id", usercontroller.destroy);
/**Ruta para el método consult. */
router.get("/:id", usercontroller.consult);

/**Exportar el router para poder ser utilizado en otras partes de la API.*/
module.exports = router;