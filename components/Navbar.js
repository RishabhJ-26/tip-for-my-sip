"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({redirect: false}) // Prevent automatic redirect
    router.push('/') // Manually redirect to home
  }

  const navLinkClass = (path) =>
    `hover:text-purple-400 transition-colors duration-300 px-3 py-1 rounded ${
      pathname === path ? 'bg-purple-400 text-black' : ''
    }`

  return (
    <nav className='bg-gray-900 shadow-[1px_1px_15px] shadow-white text-white flex justify-between items-center px-4 md:h-16 sticky top-0 z-50'>
      <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
        <img style={{ filter: 'invert(100%) brightness(200%) contrast(200%)' }} className='w-16 h-16' src="/logo.png.png" alt="logo" />
        <span className='text-xl md:text-base my-3 md:my-0'>Tip For My Sip</span>
        <img className='invertImg' src="tea.gif" width={44} alt="" />
      </Link>

      <div className="hidden md:flex space-x-6 mr-6">
        <Link href="/" className={navLinkClass("/")}>
          Home
        </Link>
        <Link href="/about" className={navLinkClass("/about")}>
          About
        </Link>
        <Link href="/contact" className={navLinkClass("/contact")}>
          Contact
        </Link>
      </div>

      <div className='relative flex justify-center items-center md:block gap-4'>
        {session && <>
          <button
            onClick={() => setShowdropdown(!showdropdown)}
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Account
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div
            id="dropdown"
            onMouseLeave={() => setShowdropdown(false)}
            className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
              </li>
            </ul>
          </div>
        </>}

        {session && <button
          className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'
          onClick={handleSignOut}
        >
          Logout
        </button>}

        {!session && (
          <Link href={"/login"}>
            
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
