import { Route, Routes } from 'react-router-dom'
import { Info } from './pages/Details/Info'
import { Home } from './pages/Home'
import { DefaultLayout } from './pages/Layout/DefaultLayout'
import { Series } from './pages/Series'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Series" element={<Series />} />
        <Route path="/Info" element={<Info />} />
      </Route>
    </Routes>
  )
}
