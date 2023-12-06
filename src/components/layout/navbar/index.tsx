import Image from "next/image"
import Link from "next/link"

const Navbar: React.FC = () => {
  return (
    <div className='bg-white shadow-xl'>
      <div className='container mx-auto'>
        <nav className='flex items-center justify-between px-7 mb-8'>
          <div>
            <Image src='/logo.png' alt='logo' width={60} height={60} />
          </div>
          <ul className='flex gap-5 px-3'>
            <li>
              <Link
                href='/dashboard'
                className='text-gray-700 hover:underline hover:underline-offset-2'
              >
                Dashboard
              </Link>
            </li>
            {/* <li>
              <Link
                href='/'
                className='text-gray-700 hover:underline hover:underline-offset-2'
              >
                Organization
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
