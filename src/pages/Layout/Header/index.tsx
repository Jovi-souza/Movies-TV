import Logo from '../../../assets/Logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  
  return(
    <header>
      <nav className='flex justify-between items-center'>
        <img src={Logo} alt="Logo" className='w-20 md:w-40'/>
        <ul className={`text-sm text-gray-100 flex gap-4 md:gap-8`}>
          <li className='hover:text-hover	duration-100 cursor-pointer md:text-lg'>
            <NavLink to="/Home">
              Home
            </NavLink>
          </li>
          <li className='hover:text-hover duration-100 cursor-pointer md:text-lg'>
            <NavLink to="/series">
              Series
            </NavLink>
          </li>
          <li className='hover:text-hover duration-100 cursor-pointer md:text-lg'>
            <NavLink to="/TV Show">
              TV Show
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}