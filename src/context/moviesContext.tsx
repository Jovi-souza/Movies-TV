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
  TopRatedMovies: MoviesProps[]
  similar: MoviesProps[]
  page: number
  SearchMovies: (query: string) => void
  GetMovieDetails: (id: number) => void
  GetSimilarMovies: (id: number) => void
  GetMoviesCredits: (id: number) => void
  NextPage: () => void
  PreviousPage: () => void
}

export const MoviesContext = createContext({} as MoviesContextType)

export function MoviesContextProvider({ children }: childrenType) {
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [similar, setSimilar] = useState<MoviesProps[]>([])
  const [moviesdetails, setMoviesDetails] = useState({} as MovieDetailsProps)
  const [TopRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>([])
  const [page, setPage] = useState(1)

  async function GetTopRatedMovies() {
    const response = await api.get(`/movie/top_rated${ApiKey}`)
    const results = response.data.results
    setTopRatedMovies(results)
  }

  async function GetMovieDetails(id: number) {
    const response = await api.get(`/movie/${id}${ApiKey}`)
    const detailsResults = response.data
    setMoviesDetails(detailsResults)
  }

  async function GetSimilarMovies(id: number) {
    const response = await api.get(`/movie/${id}/similar${ApiKey}`)
    const data = response.data.results.slice(0, 10)
    setSimilar(data)
  }

  async function GetMoviesCredits(id: number) {
    const response = await api.get(`/movie/${id}/credits${ApiKey}`)
    const data = response.data.cast.slice(0, 10)
    console.log('teste', data)
  }

  async function SearchMovies(query: string) {
    const response = await api.get(`search/movie${ApiKey}&query=${query}`)
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
      setMovies(results)
    }
    GetMovies()
    GetTopRatedMovies()
  }, [page, setMovies])
  return (
    <MoviesContext.Provider
      value={{
        movies,
        TopRatedMovies,
        moviesdetails,
        similar,
        page,
        SearchMovies,
        GetSimilarMovies,
        GetMovieDetails,
        GetMoviesCredits,
        NextPage,
        PreviousPage,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
