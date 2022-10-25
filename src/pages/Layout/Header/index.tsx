import Logo from '../../../assets/Logo.svg'
export function Header() {
  
  return(
    <header>
      <nav className='flex justify-between items-center'>
        <img src={Logo} alt="Logo" className='w-20'/>
        <ul className={`text-sm text-gray-100 flex gap-4`}>
          <li className='hover:text-hover	duration-100 cursor-pointer'>Home</li>
          <li className='hover:text-hover duration-100 cursor-pointer'>Series</li>
          <li className='hover:text-hover duration-100 cursor-pointer'>TV Show</li>
        </ul>
      </nav>
    </header>
  )
}