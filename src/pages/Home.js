import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { allMovies, movieById } from '../api/api'
import { Carousel } from "antd";
import Card from "../component/Card"
import PopupCard from '../component/PopupCard';

const Home = () => {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    // //for get all the movies data
    const { data: allMoviesData, isLoading: loadingAll, isError: errorAll, error: allError, status } = useQuery({
        queryKey: ["posts"],
        queryFn: allMovies,
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

    const images = [
        'https://www.tallengestore.com/cdn/shop/products/stranger_things_13_139fead2-a70d-4ea9-acdf-dca20dd885a5.jpg?v=1514020449',
        'https://images-cdn2.welcomesoftware.com/assets/Wednesday_Season_2.jpg/Zz01M2Y1YWFiNjZlM2IxMWYwYTEyMDhlOTQ5YTAyYzQzZA==?width=768&height=430',
        'https://blog.vidangel.com/wp-content/uploads/2022/08/LockeAndKey_Blog_Image.jpg',
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202408/the-great-indian-kapil-show-155721617-16x9_1.jpg?VersionId=vO18CIIUMqpdgInurtdRrNGix8_MORqR'
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-cyan-900 flex flex-col py-10 px-4 text-white">
                {/* carousel */}
                <div className="w-full h-[32rem]">
                    <Carousel
                        autoplay
                        effect="fade"
                        fade="true"
                        arrows
                        autoplaySpeed={1200}
                    >
                        {images.map((src, idx) => (
                            <div key={idx}>
                                <img
                                    src={src}
                                    alt={`Slide ${idx + 1}`}
                                    className="w-full h-[32rem] shadow:md rounded-md "
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Movie card */}
                <div className=" justify-start mx-[1rem] mt-[3rem] ">
                    <h2 className="font-bold text-2xl text-white font-inter">Movies</h2>
                </div>
                <div class="w-full h-0.5 bg-gray-300/40 blur-6 mt-4"></div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mx-auto items-center mt-8">
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




        </>
    )
}

export default Home
