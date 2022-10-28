import { Route, Routes } from 'react-router-dom'
import { MoviesInfo } from './pages/Home/Details/Info'
import { SeriesInfo } from './pages/Series/Details/Info'
import { Home } from './pages/Home'
import { DefaultLayout } from './pages/Layout/DefaultLayout'
import { Series } from './pages/Series'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="Info" element={<MoviesInfo />} />
        <Route path="/Series" element={<Series />} />
        <Route path="series/Info" element={<SeriesInfo />} />
      </Route>
    </Routes>
  )
}
