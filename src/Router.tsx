import { Route, Routes } from 'react-router-dom'
import { MovieDetails } from './components/moviesDetails'
import { Home } from './pages/home'
import { DefaultLayout } from './pages/Layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="info/:name" element={<MovieDetails />} />
      </Route>
    </Routes>
  )
}
