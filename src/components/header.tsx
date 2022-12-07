import Logo from '../assets/Logo.svg'

export function Header() {
  return (
    <header className="flex justify-center items-center py-4 max-w-4xl">
      <img src={Logo} alt="Logo" className="w-32" />
    </header>
  )
}
