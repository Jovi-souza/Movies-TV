import { BrowserRouter } from 'react-router-dom'
import { DetailsContextProvider } from './context/detailsContext'
import { Router } from './Router'

export function App() {
  return (
    <div className="bg-background p-4 h-max">
      <BrowserRouter>
        <DetailsContextProvider>
          <Router />
        </DetailsContextProvider>
      </BrowserRouter>
    </div>
  )
}
