import { createContext, ReactNode, useState } from 'react'
import { ApiKey } from '../utils/APIkey'
import { api } from '../lib/axios'
import { useQuery } from 'react-query'

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

interface CastProps {
  id: number
  name: string
  character: string
  profile_path: string
  known_for_department: string
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
  movies: MoviesProps[] | undefined
  TopRatedMovies: MoviesProps[] | undefined
  moviesdetails: MovieDetailsProps
  cast: CastProps[]
  page: number
  GetMovieDetails: (id: number) => void
  GetMoviesCredits: (id: number) => void
  BackToHome: () => void
  NextPage: () => void
  PreviousPage: () => void
}

export const MoviesContext = createContext({} as MoviesContextType)

export function MoviesContextProvider({ children }: childrenType) {
  const [cast, setCast] = useState<CastProps[]>([])
  const [moviesdetails, setMoviesDetails] = useState({} as MovieDetailsProps)
  const [page, setPage] = useState(1)

  const { data: movies } = useQuery<MoviesProps[]>(
    'topRatedMovies',
    async () => {
      const response = await api.get(`/movie/popular${ApiKey}&page=${page}`)
      return response.data.results.slice(0, 10)
    },
  )

  const { data: TopRatedMovies } = useQuery<MoviesProps[]>(
    'topRatedMovies',
    async () => {
      const response = await api.get(`/movie/top_rated${ApiKey}`)
      return response.data.results.slice(0, 10)
    },
  )

  async function GetMovieDetails(id: number) {
    const response = await api.get(`/movie/${id}${ApiKey}`)
    const detailsResults = response.data
    setMoviesDetails(detailsResults)
  }

  async function GetMoviesCredits(id: number) {
    const response = await api.get(`/movie/${id}/credits${ApiKey}`)
    const data = response.data.cast.slice(0, 10)
    setCast(data)
  }

  // async function SearchMovies(query: string) {
  //   const response = await api.get(`search/movie${ApiKey}&query=${query}`)
  //   const results = response.data.results

  // }

  function BackToHome() {
    setPage((state) => (state = 1))
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

  return (
    <MoviesContext.Provider
      value={{
        movies,
        moviesdetails,
        TopRatedMovies,
        cast,
        page,
        GetMovieDetails,
        GetMoviesCredits,
        NextPage,
        PreviousPage,
        BackToHome,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
