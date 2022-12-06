import { createContext, ReactNode, useEffect, useState } from 'react'
import { ApiKey } from '../lib/APIkey'
import { api } from '../lib/axios'

interface childrenType {
  children: ReactNode
}

interface MovieDetailsProps {
  id: number
  title: string
  overview: string
  genres: { name: string }[]
  poster_path: string
  release_date: string
  tagline: string
  runtime: number
  vote_average: number
  vote_count: number
  production_companies: {
    name: string
    logo_path: string
    origin_country: string
  }[]
}

interface MoviesProps {
  id: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}

interface MoviesContextType {
  movies: MoviesProps[]
  moviesdetails: MovieDetailsProps
  GetMovieDetails: (id: number) => void
}

export const MoviesContext = createContext({} as MoviesContextType)

export function MoviesContextProvider({ children }: childrenType) {
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [moviesdetails, setMoviesDetails] = useState({} as MovieDetailsProps)

  async function GetMovies() {
    const response = await api.get(`/movie/popular${ApiKey}`)
    const results = response.data.results
    setMovies(results)
  }

  async function GetMovieDetails(id: number) {
    const response = await api.get(`/movie/${id}${ApiKey}`)
    const results = response.data
    setMoviesDetails(results)
  }

  useEffect(() => {
    GetMovies()
  }, [])
  return (
    <MoviesContext.Provider value={{ movies, moviesdetails, GetMovieDetails }}>
      {children}
    </MoviesContext.Provider>
  )
}
