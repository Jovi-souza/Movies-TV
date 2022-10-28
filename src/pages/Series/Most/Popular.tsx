/* eslint-disable camelcase */
import { MovieCard } from '../../../Components/MovieCard'
import { useEffect, useState } from 'react'
import { ApiKey } from '../../../lib/APIkey'
import { api } from '../../../lib/axios'

interface moviesType {
  id: string
  name: string
  overview: string
  poster_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
}

export function Popular() {
  const [movies, setMovies] = useState<moviesType[]>([])

  async function GetMovies() {
    const response = await api.get(`/tv/popular${ApiKey}`)
    const results = response.data.results
    setMovies(results)
  }

  useEffect(() => {
    GetMovies()
  }, [])

  return (
    <div>
      <h1 className="text-yellow-500">Most Popular</h1>
      <div>
        <div className="flex gap-2 flex-wrap justify-center md:gap-4 xl:gap-6">
          {movies.map(
            ({
              id,
              first_air_date,
              name,
              vote_average,
              vote_count,
              poster_path,
            }) => {
              return (
                <MovieCard
                  key={id}
                  title={name}
                  vote_count={vote_count}
                  vote_average={vote_average}
                  poster_path={poster_path}
                  release_date={first_air_date}
                  id={id}
                />
              )
            },
          )}
        </div>
      </div>
    </div>
  )
}
