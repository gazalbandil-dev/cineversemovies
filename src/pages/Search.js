import { useQuery } from '@tanstack/react-query'
import { Spin, Pagination } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useState } from 'react'
import { allMovies, searchByTitle, movieById, searchByJoker } from '../api/api'
import Card from "../component/Card"
import PopupCard from '../component/PopupCard';
import notfound from '../assests/notfound.png';
import { useNavigate } from 'react-router-dom';


const Search = ({ searchQuery }) => {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
 

  // //for get all the movies data
  const { data: allMoviesData, isLoading: loadingAll, isError: errorAll, error: allError, status } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => searchByJoker(currentPage),
   
  });

  //for search ny title 
  const { data: searchedData, isLoading: loadingSearch, isError: errorSearch, error: searchError, status: searchStatus } = useQuery({
    queryKey: ["searchedTitle", searchQuery, currentPage],
    queryFn: () => searchByTitle(searchQuery, currentPage),
    enabled: !!searchQuery,
    keepPreviousData: true,
    retry: false,
  });


  // for popup mobie by Id
  const { data: movieData, isLoading: loading } = useQuery({
    queryKey: ["movieDetail", selectedMovie],
    queryFn: () => movieById(selectedMovie),
    enabled: !!selectedMovie,

  })

  const displayData = searchQuery ? searchedData:allMoviesData;
  const isLoading = loadingAll || loadingSearch;
  const isError = errorAll || errorSearch;
  const hasNoResults = !isLoading && isError && !displayData ;

  // const totalResults = displayData?.totalResults || 0;
  // const pageSize = 10;
  


  const handleCardClick = (movieId) => {
    setSelectedMovie(movieId);
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMovie(null);

  }

  const handleClick = () => {
    navigate("/");
  }


  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-cyan-900 flex flex-col py-10 px-4 text-white">
    {isLoading ? (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    ) : (
      <>
        <div className="">
          <button
            onClick={handleClick}
            className="rounded-full transition-all duration-300 hover:bg-white/20 hover:shadow-cyan-100"
          >
            <ArrowLeftOutlined className="text-white p-3 text-lg border-1 border-white bg-black/20 rounded-full" />
          </button>
        </div>

        {hasNoResults ? (
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
        ) : (
          <>
           
            {Array.isArray(displayData) && displayData.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center mt-8">
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
            )}
            {/* {displayData.length > 0 && (
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalResults}
                align="center"
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: 20, textAlign: "center" }}
                showSizeChanger={false}
              />
            )} */}
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
