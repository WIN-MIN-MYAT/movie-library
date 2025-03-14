import React from 'react'

// eslint-disable-next-line react/prop-types
const MovieCard = ({movie:{title,vote_average,poster_path,release_date,original_language}}) => {
    return (
        <div className="movie-card">
            <img className='mb-5' src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}`:'/no-movie.png'} alt={title}/>
            <div>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src="star.svg" alt="star"/>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p> {vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                        <span>•</span>
                        <p className='lang'>{original_language}</p>
                        <span>•</span>
                        <p className='year'>
                            {/* eslint-disable-next-line react/prop-types */}
                            {release_date ? release_date.split('-')[0] : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieCard
