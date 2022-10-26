import { Airing } from './Airing/Popular'
import { Popular } from './Most/Popular'
import { OnAir } from './onTheAir/Latest'
import { TopRated } from './Top/Rated'

export function Series() {
  return (
    <div className="flex flex-col gap-8 mt-4 justify-center items-center">
      <Popular />
      <TopRated />
      <Airing />
      <OnAir />
    </div>
  )
}
