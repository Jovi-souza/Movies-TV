import { createContext, ReactNode, useState } from 'react'
import { ApiKey } from '../lib/APIkey'
import { api } from '../lib/axios'

interface childrenType {
  children: ReactNode
}
interface genresType {
  id: number
  name: string
}

interface MovieDetailsType {
  title: string
  overview: string
  poster_path: string
  release_date: string
  original_language: string
  genres: genresType[]
}

interface DetailsContextType {
  GetMovieDetails: (id: string) => void
  GetTvDetails: (id: string) => void
  movieDetails: MovieDetailsType[]
}

export const DetailsContext = createContext({} as DetailsContextType)
export function DetailsContextProvider({ children }: childrenType) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType[]>([])

  async function GetMovieDetails(id: string) {
    const response = await api.get(`/movie/${id}${ApiKey}`)
    const result = await response.data
    setMovieDetails(result)
    console.log(result)
  }

  async function GetTvDetails(id: string) {
    const response = await api.get(`/tv/${id}${ApiKey}`)
    const result = response.data
    setMovieDetails(result)
  }

  return (
    <DetailsContext.Provider
      value={{ GetMovieDetails, GetTvDetails, movieDetails }}
    >
      {children}
    </DetailsContext.Provider>
  )
}
