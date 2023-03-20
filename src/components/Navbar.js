import Link from 'next/link'
// import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
  // const [session, loading] = useSession()
  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href='#'>Money Transfer App</a>
      </h1>
      <ul className={`main-nav`}>
        <li>
          <Link href='/'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            Blog
          </Link>
        </li>
        {/* <li>
            <Link href='/api/auth/signin' legacyBehavior>
              <a
                onClick={e => {
                  e.preventDefault()
                  signIn('github')
                }}>
                Sign In
              </a>
            </Link>
          </li>
          <li>
            <Link href='/api/auth/signout' legacyBehavior>
              <a
                onClick={e => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign Out
              </a>
            </Link>
          </li> */}
      </ul>
    </nav>
  )
}

export default Navbar