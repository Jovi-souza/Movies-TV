import { Popular } from "./Most/Popular";
import { TopRated } from "./Top/Rated";
import { Upcomming } from "./Next/Upcomming";

export function Home() {
  return(
    <div className="flex flex-col gap-8 mt-4">
      <Popular />
      <TopRated />
      <Upcomming />
    </div>
  )
}