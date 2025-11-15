
const allMovies = async () => {
    const BaseUrl = "http://localhost:3001/Search";
    const allMoviesApi = `${BaseUrl}`;
    const response = await fetch(allMoviesApi);
    const postData = await response.json();
    return postData;
};

const searchByJoker = async (Page) => {
    const BaseUrl = "https://omdbapi.com/?apikey=2770b6b7&s=Joker";
    const searchUrl = `${BaseUrl}&page=${Page}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error);
    }
    return data.Search;
};


const searchByTitle = async (query, Page) => {
    const BaseUrl = "https://omdbapi.com/?apikey=2770b6b7&s=";
    const searchUrl = `${BaseUrl}${encodeURIComponent(query)}&page=${Page}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(data.Error);
    }
    return data.Search;
    // return {
    //     searchResults: data.Search,    
    //     totalResults: data.totalResults 
    // };
};

const movieById = async (movieId) => {
    const BaseUrl = "https://omdbapi.com/?apikey=2770b6b7&i=";
    const searchUrl = `${BaseUrl}${movieId}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data;

}

export { allMovies, searchByTitle, movieById, searchByJoker };

