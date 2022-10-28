/* eslint-disable camelcase */
import { MovieCard } from '../../../Components/MovieCard'
import { useEffect, useState } from 'react'
import { ApiKey } from '../../../lib/APIkey'
import { api } from '../../../lib/axios'

interface moviesType {
  id: string
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
}

export function Popular() {
  const [movies, setMovies] = useState<moviesType[]>([])

  async function GetMovies() {
    const response = await api.get(`/movie/popular${ApiKey}`)
    const results = response.data.results
    setMovies(results)
    console.log(results)
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
              release_date,
              title,
              vote_average,
              vote_count,
              poster_path,
            }) => {
              return (
                <MovieCard
                  key={id}
                  title={title}
                  vote_count={vote_count}
                  vote_average={vote_average}
                  poster_path={poster_path}
                  release_date={release_date}
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
