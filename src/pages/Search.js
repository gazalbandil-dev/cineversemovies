import { useQuery } from '@tanstack/react-query'
import { Spin, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from 'react'
import { searchByTitle, movieById, searchByJoker } from '../api/api'
import Card from "../component/Card"
import PopupCard from '../component/PopupCard';
import notfound from '../assests/notfound.png';
import emogi from '../assests/sunEmogi.png';



const Search = ({ searchQuery }) => {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const trimmedQuery = searchQuery.trim();

  // //for get all the movies data
  const { data: allMoviesData, isLoading: loadingAll, isError: errorAll, error: allError, status } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => searchByJoker(currentPage),
    enabled: !searchQuery,
    retry: false,
    onError: (error) => {
      console.error("Error occurred during API request", error);
    }

  });

  //for search ny title 
  const { data: searchedData, isLoading: loadingSearch, isError: errorSearch, error: searchError, status: searchStatus } = useQuery({
    queryKey: ["searchedTitle", searchQuery, currentPage],
    queryFn: () => searchByTitle(trimmedQuery, currentPage),
    enabled: !!searchQuery,
    keepPreviousData: true,
    retry: false,
    enabled: trimmedQuery.length > 0,
  });



  // for popup mobie by Id
  const { data: movieData, isLoading: loading } = useQuery({
    queryKey: ["movieDetail", selectedMovie],
    queryFn: () => movieById(selectedMovie),
    enabled: !!selectedMovie,

  })
  const searchMovie = searchedData?.Search || [];
  const totalMovie = Number(searchedData?.totalResults || allMoviesData?.totalResults || 0);
  const displayData = searchQuery ? searchMovie : allMoviesData?.Search || [];
  const isLoading = loadingAll || loadingSearch;
  const isError = errorAll || errorSearch;
  const hasNoResults = !isLoading && isError && displayData.length === 0;


  const handleCardClick = (movieId) => {
    setSelectedMovie(movieId);
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMovie(null);

  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-cyan-900 flex flex-col py-10 px-4 text-white">
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Spin size="large" />
        </div>
      ) : (
        <>
         {!trimmedQuery && displayData.length===0 && (
            <div className="flex flex-col items-center mt-10">
              <p className="text-gray-400 text-center mb-4 font-bold text-sm sm:text-md md:text-xl">
                Search your favorite movie or series!!
              </p>
              <div className="bg-gray-800 rounded-full p-6 mb-6 shadow-md">
                <SearchOutlined className="text-gray-600 text-3xl md:text-6xl" />
              </div>

            </div>
          )}

          {hasNoResults && trimmedQuery && (
            <div className="flex flex-col items-center mt-10">
              <p className="text-red-500 text-center mb-4 font-bold text-xl">
                Movie not found !!
              </p>
              <img
                src={notfound}
                alt="not found"
                className="bg-white/80 rounded-full p-4 shadow-lg"
              />
            </div>
          )}


          {Array.isArray(displayData) && displayData.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-4 justify-items-center mt-8 pb-[4rem]">
                {displayData.map((post) => (
                  <Card
                    key={post.imdbID}
                    id={post.imdbID}
                    title={post.Title}
                    image={post.Poster}
                    type={post.Type}
                    year={post.Year}
                    onClick={() => handleCardClick(post.imdbID)}
                  />
                ))}
              </div>

              <Pagination
                current={currentPage}
                pageSize={10}
                total={totalMovie}
                align="center"
                size="default"
                onChange={(page) => setCurrentPage(page)}
                className="mt-8 text-md"
                showSizeChanger={false}
              />
            </>

          )}
        </>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <Spin size="large" />
        </div>
      )}

      {showPopup && selectedMovie && movieData && (
        <PopupCard
          image={movieData.Poster}
          title={movieData.Title}
          rating={movieData.imdbRating}
          imdbId={movieData.imdbID}
          year={movieData.Year}
          rated={movieData.Rated}
          released={movieData.Released}
          genre={movieData.Genre}
          director={movieData.Director}
          writer={movieData.Writer}
          actors={movieData.Actors}
          plot={movieData.Plot}
          language={movieData.Language}
          countrytype={movieData.Country}
          runtime={movieData.Runtime}
          onClose={closePopup}
        />
      )}
    </div>
  );

};
export default Search
