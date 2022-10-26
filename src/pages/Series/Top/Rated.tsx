/* eslint-disable camelcase */
import { useEffect, useRef, useState } from 'react'
import { MovieCard } from '../../../Components/MovieCard'
import { motion } from 'framer-motion'
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

export function TopRated() {
  const [movies, setMovies] = useState<moviesType[]>([])
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  async function GetMovies() {
    const response = await api.get(`/tv/top_rated${ApiKey}`)
    const results = response.data.results
    setMovies(results)
  }

  useEffect(() => {
    setWidth(
      Number(carousel.current?.scrollWidth) -
        Number(carousel.current?.offsetWidth),
    )
    GetMovies()
  }, [])

  return (
    <div className="w-full mx-auto flex flex-col gap-4 overflow-hidden justify-center">
      <h1 className="text-yellow-500 text-xl">Top Rated</h1>
      <motion.div
        ref={carousel}
        className="cursor-grab w-full"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          className="flex gap-6 w-max h-full justify-center items-center"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {movies.map(
            ({
              id,
              name,
              first_air_date,
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
        </motion.div>
      </motion.div>
    </div>
  )
}
