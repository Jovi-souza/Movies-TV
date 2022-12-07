import { Route, Routes, useLocation } from 'react-router-dom'
import { MovieDetails } from './components/moviesDetails'
import { Home } from './pages/home'
import { DefaultLayout } from './pages/Layout/DefaultLayout'

export function Router() {
  const location = useLocation()
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path={location.pathname} element={<MovieDetails />} />
      </Route>
    </Routes>
  )
}
