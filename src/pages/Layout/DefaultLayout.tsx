import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'

export function DefaultLayout() {
  return (
    <div className="px-4 max-w-5xl mx-auto">
      <Header />
      <Outlet />
    </div>
  )
}
