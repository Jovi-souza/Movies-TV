/* eslint-disable camelcase */
import { useContext } from 'react'
import { DetailsContext } from '../../context/detailsContext'

export function Info() {
  const { movieDetails } = useContext(DetailsContext)
  const { overview, title, poster_path, release_date, original_language } =
    movieDetails
  const path = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className="flex gap-16 pt-7">
      <div>
        <img src={`${path}${poster_path}`} alt="Title" className="w-max" />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-gray-100 text-5xl">{title}</h1>
        <p className=" text-gray-400 text-2xl">{overview}</p>
        <div className="flex gap-4 text-gray-500">
          <span>{release_date}</span>
          <span className="uppercase">{original_language}</span>
        </div>
      </div>
    </div>
  )
}
