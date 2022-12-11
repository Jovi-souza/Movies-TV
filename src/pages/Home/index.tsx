import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { MovieCard } from '../../components/card'
import { MoviesContext } from '../../context/moviesContext'
import { Path } from '../../utils/imagesPath'

import { ArrowLeft, ArrowRight, House } from 'phosphor-react'
import { Loading } from '../../components/loading'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type FormInput = zod.infer<typeof searchFormSchema>

export function Home() {
  const {
    page,
    NextPage,
    PreviousPage,
    BackToHome,
    SearchMovies,

    movies,
    topRated,
    isFetching,
  } = useContext(MoviesContext)

  const { register, handleSubmit, reset } = useForm<FormInput>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchForm(data: FormInput) {
    SearchMovies(data.query)
    reset()
  }

  const pageCount = page === 1 ? 'hidden' : ''

  return (
    <div className="flex flex-col gap-8 relative">
      <form
        onSubmit={handleSubmit(handleSearchForm)}
        className="flex flex-col items-center gap-4 text-center md:flex-row lg:text-left lg:ml-5"
      >
        <input
          type="text"
          className="w-full max-w-xs px-4 py-2 text-white text-sm bg-transparent rounded-full border border-blue-500 outline-none"
          placeholder="Pesquisa"
          {...register('query')}
        />
        <button className="bg-blue-500 p-2 rounded-full">
          <House onClick={BackToHome} color="white" weight="bold" />
        </button>
      </form>
      {isFetching && <Loading />}
      <div className="grid lg:grid-cols-[750px_minmax(200px,_1fr)_10px] justify-center">
        <div className="flex flex-wrap gap-[3%] gap-y-4 justify-center items-center md:gap-[1%] lg:gap-4">
          {movies?.map((item) => {
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
            <h1 className="text-white text-2xl font-semibold">Top Rated</h1>
            {topRated?.map((item) => {
              return (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={`${Path}${item.poster_path}`}
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
      <div className="flex gap-4 items-center justify-center text-white font-semibold">
        <button
          onClick={PreviousPage}
          className={`${pageCount} bg-blue-500 p-2 rounded-full`}
        >
          <ArrowLeft size={12} weight="bold" />
        </button>
        <span
          className={`${pageCount} font-semibold text-xs text-gray-300 border-b`}
        >
          {page - 1}
        </span>
        <span className="font-bold border-b-2 border-blue-500 px-2">
          {page}
        </span>
        <span className="font-semibold text-xs text-gray-300 border-b">
          {page + 1}
        </span>
        <button onClick={NextPage} className="bg-blue-500 p-2 rounded-full">
          <ArrowRight size={12} weight="bold" />
        </button>
      </div>
    </div>
  )
}
