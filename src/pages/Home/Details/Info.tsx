/* eslint-disable camelcase */
import { useContext } from 'react'
import { DetailsContext } from '../../../context/detailsContext'
import { Star, Money, Clock } from 'phosphor-react'

export function MoviesInfo() {
  const { movieDetails } = useContext(DetailsContext)
  const {
    overview,
    title,
    poster_path,
    release_date,
    original_language,
    vote_average,
    vote_count,
    budget,
    revenue,
    runtime,
    status,
  } = movieDetails
  const path = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className="flex flex-col mt-6 justify-center items-center sm:max-w-lg lg:gap-4">
      <div>
        <img src={`${path}${poster_path}`} alt="Title" className="" />
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-gray-100 sm:text-2xl md:text-3xl">{title}</h1>
          <p className="flex justify-center items-center gap-2">
            <Star size={16} weight="fill" className="text-yellow-400" />
            <span className="text-gray-200">{vote_average}</span>
          </p>
        </div>
        <p className=" text-gray-400 my-2 lg:text-lg">{overview}</p>
        <p className="text-gray-200">
          Votes <span className="text-blue-400">{vote_count}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-200">
          <Clock size={16} />
          {runtime} minutes
        </p>
        <p className="flex items-center gap-2 text-gray-200">
          <Money size={16} weight="duotone" />
          Receita
          <span className="text-blue-400">{revenue}</span>
        </p>
        <p className="flex gap-2 items-center text-gray-200">
          <Money size={16} weight="duotone" />
          orçamento
          <span className="text-blue-400">{budget}</span>
        </p>
        <div className="flex gap-2 text-gray-500">
          <span>{release_date}</span>
          <span className="">Language: {original_language}</span>
          <span className="">{status}</span>
        </div>
      </div>
    </div>
  )
}
