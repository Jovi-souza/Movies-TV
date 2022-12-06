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
  TopRatedMovies: MoviesProps[]
  moviesdetails: MovieDetailsProps
  GetMovieDetails: (id: number) => void
  SearchMovies: (query: string) => void
  NextPage: () => void
  PreviousPage: () => void
}

export const MoviesContext = createContext({} as MoviesContextType)

export function MoviesContextProvider({ children }: childrenType) {
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [TopRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>([])
  const [moviesdetails, setMoviesDetails] = useState({} as MovieDetailsProps)
  const [page, setPage] = useState(1)

  async function GetTopRatedMovies() {
    const response = await api.get(`/movie/top_rated${ApiKey}`)
    const results = response.data.results
    setTopRatedMovies(results)
  }

  async function GetMovieDetails(id: number) {
    const response = await api.get(`/movie/`, {
      params: {
        ApiKey,
        id,
      },
    })
    const results = response.data
    setMoviesDetails(results)
  }

  async function SearchMovies(query: string) {
    const response = await api.get(`/movie/popular$`, {
      params: {
        ApiKey,
        query,
      },
    })
    const results = response.data.results
    setMovies(results)
  }

  function NextPage() {
    setPage((state) => ++state)
  }

  function PreviousPage() {
    if (page === 1) {
      setPage((state) => (state = 2))
    }
    setPage((state) => --state)
  }

  useEffect(() => {
    async function GetMovies() {
      const response = await api.get(`/movie/popular${ApiKey}&page=${page}`)
      const results = response.data.results
      console.log(response.data.page)
      setMovies(results)
    }
    GetMovies()
    GetTopRatedMovies()
  }, [page, setMovies])
  return (
    <MoviesContext.Provider
      value={{
        movies,
        moviesdetails,
        GetMovieDetails,
        TopRatedMovies,
        NextPage,
        PreviousPage,
        SearchMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
