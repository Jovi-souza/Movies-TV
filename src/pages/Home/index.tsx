import { useContext } from 'react'
import { MovieCard } from '../../components/card'
import { MoviesContext } from '../../context/moviesContext'

export function Home() {
  const { movies, TopRatedMovies, NextPage, PreviousPage } =
    useContext(MoviesContext)

  const path = 'https://image.tmdb.org/t/p/w500/'

  return (
    <div>
      <div className="grid lg:grid-cols-[750px_minmax(200px,_1fr)_10px] justify-center">
        <div className="flex flex-wrap gap-2 justify-center items-center lg:gap-4">
          {movies.map((item) => {
            return (
              <MovieCard
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                title={item.title}
                release_date={item.release_date}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            )
          })}
        </div>
        <div className="hidden flex-col rounded lg:flex">
          <div className="flex flex-col gap-4 px-4">
            <h1 className="text-white text-2xl font-semibold">Destaques</h1>
            {TopRatedMovies.map((item) => {
              return (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={`${path}${item.poster_path}`}
                    alt="Poster movie"
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="text-gray-500 text-xs">
                    <h1 className="text-white text-sm w-28 overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.title}
                    </h1>
                    <span className="mr-2 text-yellow-500">
                      {item.vote_average}
                    </span>
                    <span>{item.release_date.substring(0, 4)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center my-6">
        <button
          onClick={PreviousPage}
          className="bg-blue-500 text-white font-semibold px-2 rounded"
        >
          previous
        </button>
        <button
          onClick={NextPage}
          className="bg-blue-500 text-white font-semibold px-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}
