import Logo from '../../assets/Logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <img src={Logo} alt="Logo" className="w-32" />
      <nav className="text-white font-semibold">
        <ul className="flex gap-4">
          <li>
            <NavLink to="/" className="hover:text-blue-500">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/series" className="hover:text-blue-500">
              Tv Series
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
