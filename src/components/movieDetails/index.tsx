import { useContext } from 'react'

import { MoviesContext } from '../../context/moviesContext'
import { Calendar, Clock, Star, Flag } from 'phosphor-react'

export function MovieDetails() {
  const { moviesdetails } = useContext(MoviesContext)
  const path = 'https://image.tmdb.org/t/p/w500/'
  return (
    <div>
      <header className="flex gap-4">
        <img
          src={`${path}${moviesdetails.poster_path}`}
          alt=""
          className="w-28 h-max object-cover"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl text-white font-semibold">
            {moviesdetails.title}
          </h1>
          <div className="flex flex-wrap text-gray-300">
            <div className="flex flex-wrap gap-2">
              {moviesdetails.genres?.map((item) => {
                return <span key={item.name}>{item.name},</span>
              })}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} weight="bold" className="text-blue-500" />
              {moviesdetails.release_date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} weight="bold" className="text-blue-500" />
              {moviesdetails.runtime} min
            </div>
          </div>
        </div>
      </header>
      <div>
        <p className="text-gray-200 text-xl mt-4">{moviesdetails.tagline}</p>
        <p className="text-gray-400 text-2xl mt-4">{moviesdetails.overview}</p>
        <div className="flex gap-2 items-center">
          <Star size={16} weight="fill" color="yellow" />
          <span>{moviesdetails.vote_average?.toFixed(1)}</span>
          <Flag size={16} weight="fill" color="red" />
          <span>{moviesdetails.vote_count}</span>
        </div>
        <div>
          <h2 className="text-xl text-gray-100 mt-8">Studios</h2>
          <div className="flex flex-wrap gap-2">
            {moviesdetails.production_companies?.map((item) => {
              return (
                <div key={item.name} className="flex gap-2 text-gray-400">
                  <span>{item.name}</span>
                  <span>{item.origin_country},</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
