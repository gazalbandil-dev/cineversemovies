import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllMovies, movieById } from '../api/api'
import { Carousel } from "antd";
import Card from "../component/Card"
import PopupCard from '../component/PopupCard';
import image1 from '../assests/strangerThings.png';
import image2 from '../assests/wednes.jpg';
import image3 from '../assests/LockeAndKey.jpg';
import image4 from '../assests/kapil.png';


const Home = () => {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  // //for get all the movies data
  const { data: allMoviesData, isLoading: loadingAll, isError: errorAll, error: allError, status } = useQuery({
    queryKey: ["movies"],
    queryFn: getAllMovies,
  });

  // for popup mobie by Id
  const { data: movieData, isLoading: loading } = useQuery({
    queryKey: ["movieDetail", selectedMovie],
    queryFn: () => movieById(selectedMovie),
    enabled: !!selectedMovie,

  })

  const handleCardClick = (movieId) => {
    setSelectedMovie(movieId);
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMovie(null);

  }

  const images = [image1, image2, image3, image4];


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="w-full relative">
        <Carousel autoplay effect="fade" arrows autoplaySpeed={3000}>
          {images.map((src, i) => (
            <div key={i} className="relative h-[28rem] md:h-[36rem] w-full">
              <img src={src} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-8 md:left-16">
                <h1 className="text-2xl text-white md:text-4xl font-extrabold drop-shadow-lg">
                  Featured Shows
                </h1>
                <p className="text-gray-300 mt-2 text-lg md:text-xl">
                  Trending · Popular · New Releases
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className=" justify-start mx-[1rem] mt-[3rem] ">

        <h2 className="font-bold text-2xl tracking-wide">Trending Movies</h2>
        <div className="mt-1 w-[] h-1 bg-cyan-400/80 rounded-full"></div>

      </div>



      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-4 justify-items-center mt-8 pb-[4rem]">
        {allMoviesData?.map((post) => (
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
export default Home
