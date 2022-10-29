/* eslint-disable camelcase */
import { useContext } from 'react'
import { DetailsContext } from '../../../context/detailsContext'

export function SeriesInfo() {
  const { seriesDetails } = useContext(DetailsContext)
  const {
    overview,
    poster_path,
    name,
    first_air_date,
    number_of_episodes,
    number_of_seasons,
    status,
    vote_average,
    vote_count,
  } = seriesDetails
  const path = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className="flex flex-col mt-6 justify-center items-center sm:max-w-lg lg:gap-4">
      <div>
        <img src={`${path}${poster_path}`} alt="Title" className="" />
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-gray-100 sm:text-2xl md:text-3xl">{name}</h1>
          <p className="flex justify-center items-center gap-2">
            <span className="text-gray-200">{vote_average}</span>
          </p>
        </div>
        <p className=" text-gray-400 my-2 lg:text-lg">{overview}</p>
        <p className="text-gray-200">
          Votes <span className="text-blue-400">{vote_count}</span>
        </p>
        <div className="flex gap-2 text-gray-500">
          <span className="">{status}</span>
        </div>
        <div className="flex gap-4  text-gray-500">
          <p>Date {first_air_date}</p>
          <p>Number of Seasons {number_of_seasons}</p>
          <p>Number of Episodes {number_of_episodes}</p>
        </div>
      </div>
    </div>
  )
}
