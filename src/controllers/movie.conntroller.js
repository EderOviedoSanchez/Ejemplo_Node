const axios = require('axios');/**Esto es una importación del progrma axios. */
/**Llamado del listado de películas. */
const index = async (req, res) =>{
try {
    /**Llamar el servicio de the moviedb */
    const movies = await axios.get(`${process.env.TMDB_BASE_URL}/movie/now_playing`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            language: 'es-Es',
            Region: 'CO'
        }
    });
    return res.status(200).json({
        status: true,
        msg: 'Películas listadas de forma correcta.',
        data: movies.data.results
    });
} catch (error) {
    return res.status(500).json({
        status: false,
        msg: 'Error al recuperar las películas.',
        data: null
    });
}
}
module.exports = {index}