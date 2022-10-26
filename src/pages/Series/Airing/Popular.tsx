/* eslint-disable camelcase */
import { MovieCard } from '../../../Components/MovieCard'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

export function Airing() {
  const [movies, setMovies] = useState<moviesType[]>([])
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  async function GetMovies() {
    const response = await api.get(`/tv/airing_today${ApiKey}`)
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
    <div className="w-full mx-auto flex flex-col gap-4 overflow-hidden">
      <h1 className="text-yellow-500 text-xl">Airing</h1>
      <motion.div
        ref={carousel}
        className="cursor-grab w-full"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          className="flex gap-6 w-max items-center justify-center"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {movies.map(
            ({
              id,
              name,
              vote_average,
              vote_count,
              poster_path,
              first_air_date,
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
