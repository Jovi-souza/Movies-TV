import { createContext, ReactNode, useState } from 'react'
import { api } from '../lib/axios'
import { apiKey } from '../utils/APIkey'
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
  topRated: MoviesProps[] | undefined
  movieDetails: MovieDetailsProps | undefined
  cast: CastProps[] | undefined
  page: number
  isFetching: boolean
  getId: (id: number) => void
  SearchMovies: (query: string) => void
  BackToHome: () => void
  NextPage: () => void
  PreviousPage: () => void
}

export const MoviesContext = createContext({} as MoviesContextType)

export function MoviesContextProvider({ children }: childrenType) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [id, setId] = useState<number | null>(null)

  const getId = (id: number) => {
    setId(id)
  }

  const { data: movies, isFetching } = useQuery<MoviesProps[]>(
    ['movies', page, searchQuery],
    async () => {
      if (searchQuery) {
        const { data } = await api.get(
          `search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
        )
        return data.results
      }

      const { data } = await api.get(
        `/movie/popular?api_key=${apiKey}&page=${page}`,
      )
      return data.results
    },
    {
      staleTime: 1000 * 60 * 15, // 15 minutos
    },
  )

  const { data: topRated } = useQuery<MoviesProps[]>(
    'topRatedMovies',
    async () => {
      const { data } = await api.get(`/movie/top_rated?api_key=${apiKey}`)
      return data.results.slice(0, 10)
    },
  )

  const { data: movieDetails } = useQuery<MovieDetailsProps>(
    ['moviesDetails', id],
    async () => {
      const { data } = await api.get(`/movie/${id}?api_key=${apiKey}`)
      return data
    },
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 15, // 15 minutos
    },
  )

  const { data: cast } = useQuery<CastProps[]>(
    ['cast', id],
    async () => {
      const { data } = await api.get(`/movie/${id}/credits?api_key=${apiKey}`)
      const castResult = data.cast.slice(0, 10)
      return castResult
    },
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 15, // 15 minutos
    },
  )

  function SearchMovies(query: string) {
    setSearchQuery(query)
  }

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
        topRated,
        movieDetails,
        isFetching,
        cast,
        page,
        getId,
        SearchMovies,
        NextPage,
        PreviousPage,
        BackToHome,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
