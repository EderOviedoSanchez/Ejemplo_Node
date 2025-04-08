require("dotenv").config();

const express = require('express');
/**Importar la herramienta de cors. */
const cors = require('cors');
/**Decirle a Node que vamos a utilizar express. */
const app = express();
/**Permitir todas las solicitudes. */
app.use(cors());
/**Este middleware es obligatorio. */
app.use(express.json());

const sequelize = require(`./src/models/dbconnection`);
require(`./src/models/sync_tables`)

const routes = require('./api.routes');
app.use('/api/v1', routes);

app.get('/', (req, res) =>{
    res.send('¡Hola mundo desde Node con Express!');
});

app.listen(process.env.PORT, async () =>{
    console.log(process.env.BIENVENIDA, process.env.PORT);
    try{
        await sequelize.authenticate();
        console.log("Conexión establecida con éxito a la base de datos.");
        await sequelize.sync({alter: true}); /**Cambia automáticamente las tablas al haber cambios. */
        console.log("Tablas sincronizadas");
    } catch (error) {
        console.error("Error conectando a la base de datos:", error); /**Lanza el mensaje de error y especifica el error. */
    }
});


