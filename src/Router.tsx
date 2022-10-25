import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { DefaultLayout } from './pages/Layout/DefaultLayout'
import { Series } from './pages/Series'
import { TvShow } from './pages/TvShow'

export function Router() {
  return(
    <Routes> 
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/Home' element={<Home />}/>
        <Route path='/TV Show' element={<TvShow />}/>
        <Route path='/Series' element={<Series />}/>
      </Route>
    </Routes>
  )
}