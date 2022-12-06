import { BrowserRouter } from 'react-router-dom'
import { MoviesContextProvider } from './context/moviesContext'
import { Router } from './Router'

export function App() {
  return (
    <div className="px-4">
      <BrowserRouter>
        <MoviesContextProvider>
          <Router />
        </MoviesContextProvider>
      </BrowserRouter>
    </div>
  )
}
