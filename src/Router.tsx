import { Route, Routes } from 'react-router-dom'
import { MovieDetails } from './components/movieDetails'
import { Home } from './pages/home'
import { DefaultLayout } from './pages/Layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="Info" element={<MovieDetails />} />
      </Route>
    </Routes>
  )
}
