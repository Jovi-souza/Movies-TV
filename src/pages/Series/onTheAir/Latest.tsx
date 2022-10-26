/* eslint-disable camelcase */
import { useEffect, useRef, useState } from 'react'
import { MovieCard } from '../../../Components/MovieCard'
import { motion } from 'framer-motion'
import { api } from '../../../lib/axios'
import { ApiKey } from '../../../lib/APIkey'

interface moviesType {
  id: string
  name: string
  overview: string
  poster_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
}

export function OnAir() {
  const [movies, setMovies] = useState<moviesType[]>([])
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  async function GetMovies() {
    const response = await api.get(`/tv/on_the_air${ApiKey}`)
    const results = response.data.results
    setMovies(results)
  }

  useEffect(() => {
    GetMovies()
    setWidth(
      Number(carousel.current?.scrollWidth) -
        Number(carousel.current?.offsetWidth),
    )
  }, [])

  return (
    <div className="w-full mx-auto flex flex-col gap-4 overflow-hidden">
      <h1 className="text-yellow-500 text-xl">On the Air</h1>
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
              vote_average,
              vote_count,
              poster_path,
              first_air_date,
              name,
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
