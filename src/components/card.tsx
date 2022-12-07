import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MoviesContext } from '../context/moviesContext'

/* eslint-disable camelcase */
interface MoviesProps {
  poster_path: string
  release_date: string
  title: string
  vote_average?: number
  vote_count?: number
  id: number
}

export function MovieCard({
  poster_path,
  release_date,
  title,
  vote_average,
  vote_count,
  id,
}: MoviesProps) {
  const { GetMovieDetails, GetSimilarMovies, GetMoviesCredits } =
    useContext(MoviesContext)
  function handleGetMovieData() {
    GetMovieDetails(id)
    GetSimilarMovies(id)
    GetMoviesCredits(id)
  }

  const path = 'https://image.tmdb.org/t/p/w500/'
  return (
    <div className="flex flex-col text-white w-[31%] keen-slider__slide md:w-[24%] lg:w-[22%]">
      <div className="relative w-full">
        <NavLink to={title} onClick={handleGetMovieData}>
          <img src={`${path}${poster_path}`} alt="Movie logo" />
        </NavLink>
        <div className="absolute left-1 bottom-1 text-xs px-4 rounded bg-gray-500 bg-opacity-60">
          {release_date?.substring(0, 4)}
        </div>
      </div>
      <div className="text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </div>
      <div className="flex gap-2 text-xs">
        <div>
          <span className="text-blue-600 font-bold">TMDB </span>
          <span>{vote_count}</span>
        </div>
        <div>{vote_average}</div>
      </div>
    </div>
  )
}
