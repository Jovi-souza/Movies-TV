import { createContext, ReactNode, useState } from 'react'
import { ApiKey } from '../lib/APIkey'
import { api } from '../lib/axios'

interface childrenType {
  children: ReactNode
}

interface DetailsType {
  title: string
  overview: string
  poster_path: string
  release_date: string
  original_language: string
  revenue: number
  budget: number
  runtime: number
  status: string
  vote_average: number
  vote_count: number
}

// interface SerieDetailsType {
//   title: string
//   overview: string
//   poster_path: string
//   release_date: string
//   original_language: string
//   revenue: number
//   budget: number
//   runtime: number
//   status: string
//   vote_average: number
//   vote_count: number
// }

interface DetailsContextType {
  GetMovieDetails: (id: string) => void
  GetTvDetails: (id: string) => void
  movieDetails: DetailsType
  seriesDetails: DetailsType
}

export const DetailsContext = createContext({} as DetailsContextType)
export function DetailsContextProvider({ children }: childrenType) {
  const [movieDetails, setMovieDetails] = useState({} as DetailsType)
  const [seriesDetails, setSeriesDetails] = useState({} as DetailsType)

  async function GetMovieDetails(id: string) {
    const response = await api.get(`/movie/${id}${ApiKey}`)
    const result = await response.data
    setMovieDetails(result)
    console.log(result)
  }

  async function GetTvDetails(id: string) {
    const response = await api.get(`/tv/${id}${ApiKey}`)
    const result = response.data
    setSeriesDetails(result)
    console.log(result)
  }

  return (
    <DetailsContext.Provider
      value={{ GetMovieDetails, GetTvDetails, movieDetails, seriesDetails }}
    >
      {children}
    </DetailsContext.Provider>
  )
}
