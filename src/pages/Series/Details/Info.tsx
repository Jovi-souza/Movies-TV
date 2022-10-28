/* eslint-disable camelcase */
import { useContext } from 'react'
import { DetailsContext } from '../../../context/detailsContext'

export function SeriesInfo() {
  const { seriesDetails } = useContext(DetailsContext)
  const { overview, title, poster_path, release_date, original_language } =
    seriesDetails
  const path = 'https://image.tmdb.org/t/p/w500'

  return (
    <div>
      <div>
        <img src={`${path}${poster_path}`} alt="Title" className="" />
      </div>
      <div className="">
        <h1 className="text-gray-100 ">{title}</h1>
        <p className=" text-gray-400 ">{overview}</p>
        <div className="flex text-gray-500">
          <span>{release_date}</span>
          <span className="uppercase">{original_language}</span>
        </div>
      </div>
    </div>
  )
}
