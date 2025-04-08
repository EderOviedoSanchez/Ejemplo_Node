const baseurl = 'http://127.0.0.1:3000/api/v1/';
async function getmovies() {
    try {
        const movies = await fetch(`${baseurl}movies`);
        const result = await movies.json();
        console.log(result.data);

        showmovies(result.data)

    } catch (error) {
        console.error("Error al obtener las películas", error.message)
    }
}
getmovies();

function showmovies(movies) {
    console.log("Entro a showmovies.")
    const container = document.getElementById("movies");
    /**Limpiar el contenedor (Quitar cualquier elemento del div) antes de agregar nuevas películas. */
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieelement = document.createElement("div");
        /**Agregar una clase al elemento. */
        movieelement.classList.add("movie");
        movieelement.innerHTML = `<img src ="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h3>${movie.original_title}</h3>
        <p> Fecha de estreno: ${movie.release_date}</p>`;
        container.appendChild(movieelement);
    });
}

movieelement.addEventListener("click", () => {
    /**Redirige a detail.html pasando el id de la película. */
    window.location.href = `detail.html?movieId = ${movie.id}`;
})