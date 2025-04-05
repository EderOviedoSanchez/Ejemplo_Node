const baseurl = '127.0.0.1:3000/api/v1/';
async function getmovies() {
    try {
        const movies = await fetch(`${baseurl}movies`);
        const result = await movies.json();
        console.log(result.data);
    } catch (error) {
        
    }
    
}