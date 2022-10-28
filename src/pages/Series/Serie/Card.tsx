import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DetailsContext } from '../../../context/detailsContext'

/* eslint-disable camelcase */
interface CardTypes {
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
  id: string
}

export function SerieCard({ poster_path, title, vote_average, id }: CardTypes) {
  const { GetTvDetails } = useContext(DetailsContext)
  const path = 'https://image.tmdb.org/t/p/w500'

  function handleGetMovieDetails() {
    GetTvDetails(id)
  }

  return (
    <div className="flex flex-col text-gray-100 w-32  overflow-hidden sm:w-44 xl:w-60">
      <NavLink to="Info">
        <img
          src={`${path}${poster_path}`}
          alt="Movie image"
          className="rounded w-full h-48 sm:h-max"
          id={id}
          onClick={handleGetMovieDetails}
        />
      </NavLink>
      <h1 className="text-xs font-semibold w-max sm:text-sm md:text-base lg:text-lg">
        {title}
      </h1>
      <p className="flex justify-between text-xs md:text-sm">
        <span className="text-blue-500 font-extrabold">TMDB</span>
        {vote_average}/10
      </p>
    </div>
  )
}
