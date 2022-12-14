import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MoviesContext } from '../context/moviesContext'
import { Path } from '../utils/imagesPath'

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
  const { getId } = useContext(MoviesContext)
  function handleGetId() {
    getId(id)
  }

  return (
    <div className="flex flex-col text-white w-[31%] md:w-[24%] lg:w-[22%]">
      <div className="relative">
        <NavLink to={`info/${title}`} onClick={handleGetId}>
          <img src={`${Path}${poster_path}`} alt="Movie logo" />
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
