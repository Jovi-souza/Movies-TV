import { useContext } from 'react'
import { MovieCard } from '../../components/card'
import { MoviesContext } from '../../context/moviesContext'

export function Home() {
  const { movies } = useContext(MoviesContext)
  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
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
    </div>
  )
}
