import Logo from '../../assets/Logo.svg'

export function Header() {
  return (
    <header className="flex justify-center items-center py-4 max-w-4xl">
      <img src={Logo} alt="Logo" className="w-32" />
      {/* <nav className="text-white font-semibold">
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
      </nav> */}
    </header>
  )
}
