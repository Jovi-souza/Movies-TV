/* eslint-disable camelcase */
import { MovieCard } from '../../../Components/MovieCard'
import { useEffect, useState } from 'react'
import { ApiKey } from '../../../lib/APIkey'
import { api } from '../../../lib/axios'
import { ArrowFatLineLeft, ArrowFatLineRight } from 'phosphor-react'

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
  let [page, setPage] = useState(1)

  function NextPage() {
    setPage((page += 1))
  }

  function PreviousPage() {
    if (page === 0) {
      page = 1
    }
    setPage((page -= 1))
  }

  useEffect(() => {
    async function GetMovies() {
      const response = await api.get(`/movie/popular${ApiKey}&page=${page}`)
      const results = response.data.results
      const pages = response.data.page
      setMovies(results)
      console.log(pages)
    }

    GetMovies()
  }, [page])

  return (
    <div>
      <h1 className="text-yellow-500 pb-4 sm:text-md md:text-xl">
        Most Popular
      </h1>
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
      <div className="flex justify-center gap-8 mt-4 text-gray-200">
        <button
          onClick={PreviousPage}
          className="flex gap-2 justify-center items-center"
        >
          <ArrowFatLineLeft size={24} weight="bold" className="text-blue-500" />
          Previous
        </button>
        <span>{page}</span>
        <button
          onClick={NextPage}
          className="flex gap-2 justify-center items-center"
        >
          Next
          <ArrowFatLineRight
            size={24}
            weight="bold"
            className="text-blue-500"
          />
        </button>
      </div>
    </div>
  )
}
