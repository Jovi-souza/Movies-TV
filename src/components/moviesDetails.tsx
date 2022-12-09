import { useContext } from 'react'

import { MoviesContext } from '../context/moviesContext'
import { Calendar, Clock, Star, Flag, ArrowLeft } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { Path } from '../utils/imagesPath'
import { CastCard } from './cast'

export function MovieDetails() {
  const { moviesdetails, cast } = useContext(MoviesContext)
  console.log(cast)

  return (
    <div className="flex flex-col gap-8 max-w-4xl m-auto">
      <NavLink
        to="/"
        className="flex gap-2 items-center bg-red-500 text-white w-max rounded px-2"
      >
        <ArrowLeft weight="bold" /> back
      </NavLink>
      <div className="flex gap-4">
        <img
          src={`${Path}${moviesdetails?.poster_path}`}
          alt="movie poster"
          className="w-28 h-max object-cover"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl text-white font-semibold">
            {moviesdetails.title}
          </h1>
          <div className="flex flex-col gap-4 text-gray-300">
            <div className="flex flex-wrap gap-2">
              {moviesdetails.genres?.map((item) => {
                return (
                  <span
                    className="bg-blue-600 px-2 text-white font-bold rounded"
                    key={item.name}
                  >
                    {item.name}
                  </span>
                )
              })}
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <Calendar size={16} weight="bold" className="text-blue-500" />
                {moviesdetails.release_date?.slice(0, 4)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} weight="bold" className="text-blue-500" />
                {moviesdetails.runtime} min
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1
            className={`${
              !moviesdetails.tagline ? 'hidden' : 'block'
            } w-max text-base text-white font-semibold border-b border-white`}
          >
            Descrição
          </h1>
          <p className="text-gray-400 text-xl">{moviesdetails.tagline}</p>
        </div>
        <div>
          <h1 className="w-max text-base text-white font-semibold border-b border-white">
            Visão geral
          </h1>
          <p className="text-gray-400 text-xl">{moviesdetails.overview}</p>
        </div>
        <div className="w-max flex gap-4 bg-gray-900 text-white px-4 py-2 rounded">
          <span className="flex items-center gap-2">
            <Star size={16} weight="fill" color="yellow" />
            {moviesdetails.vote_average?.toFixed(1)}
          </span>
          <span className="flex items-center gap-2">
            <Flag size={16} weight="fill" color="green" />
            {moviesdetails.vote_count}
          </span>
        </div>
        <div
          className={`${
            moviesdetails.production_companies?.length === 0
              ? 'hidden'
              : 'block'
          } flex flex-col gap-4 bg-gray-900 text-white px-4 py-2 rounded`}
        >
          <h1 className="text-xl">Studios</h1>
          <div className="text-gray-300">
            {moviesdetails.production_companies?.map((item) => {
              return (
                <div key={item.name} className="flex gap-1">
                  <span>{item.name}/</span>
                  <span>{item.origin_country}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-gray-900 text-white px-4 py-2 rounded">
          <h1 className="text-xl">Cast</h1>
          <div className="flex gap-4 overflow-x-scroll">
            {cast.map((item) => {
              return (
                <CastCard
                  key={item.id}
                  name={item.name}
                  character={item.character}
                  knownForDepartment={item.known_for_department}
                  profilePath={item.profile_path}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
