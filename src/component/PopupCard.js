import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import Noimage from "../assests/Noimage.jpg"

const PopupCard = ({
    image,
    title,
    rating,
    imdbId,
    year,
    rated,
    released,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    countrytype,
    runtime,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 ">
            <div className="relative bg-gray-900 rounded-lg shadow-lg w-[90%] max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-600 transition"
                >
                    <CloseOutlined className="text-2xl" />
                </button>
                <div className="flex flex-col md:flex-row gap-6 border-b pb-4 mb-4">
                    <div className="flex-shrink-0 mt-8 w-full md:w-1/3 flex justify-center">
                        <img
                            src={image || Noimage}
                            alt={title}
                            className="rounded-md shadow-md w-full drop-shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = Noimage;
                            }}
                        />
                    </div>
                    <div className="flex ms-8 flex-col justify-center w-full md:w-2/3 space-y-1">
                        <h2 className="text-2xl font-semibold text-gray-200">{title}</h2>
                        <p className="text-gray-300">Year: {year}</p>
                        <p className="text-gray-300">Rated: {rated}</p>
                        <p className="text-gray-300">Runtime: {runtime}</p>
                        <p className="text-gray-300">Language: {language}</p>
                    </div>

                </div>

                <div className="space-y-2 text-gray-300">
                    <p className="italic text-gray-400">{plot}</p>
                    <p><span className="font-semibold">IMDb Rating:</span> {rating}⭐</p>
                    <p><span className="font-semibold">IMDb ID:</span> {imdbId}</p>
                    <p><span className="font-semibold">Released:</span> {released}</p>
                    <p><span className="font-semibold">Genre:</span> {genre}</p>
                    <p><span className="font-semibold">Actors:</span> {actors}</p>
                    <p><span className="font-semibold">Director:</span> {director}</p>
                    <p><span className="font-semibold">Writer:</span> {writer}</p>
                    <p><span className="font-semibold">Country:</span> {countrytype}</p>
                </div>
            </div>
        </div>
    );
};

export default PopupCard;
