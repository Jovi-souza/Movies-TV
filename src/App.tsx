import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

export function App() {
  return (
    <div className="bg-background p-4">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}
