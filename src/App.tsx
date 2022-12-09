import { QueryClientProvider } from 'react-query'

import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import { MoviesContextProvider } from './context/moviesContext'
import { queryClient } from './utils/queryClient'

export function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MoviesContextProvider>
            <Router />
          </MoviesContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}
