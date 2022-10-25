interface CardTypes {
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
}

export function MovieCard(
  {
    poster_path, 
    release_date, 
    title, 
    vote_average, 
    vote_count,
  }
  : CardTypes) {
  const path = "https://image.tmdb.org/t/p/w500"
  return(
    <div className="text-gray-100 w-60">
      <img src={`${path}${poster_path}`} alt="Movie image" className="pointer-events-none rounded"/>
      <span className="text-xs text-gray-400">{release_date}</span>
      <h1 className="text-xs font-semibold">{title}</h1>
      <div className="flex justify-between">
        <p>{vote_average}/10</p>
        <p>{vote_count}</p>
      </div>
    </div>
  )
}