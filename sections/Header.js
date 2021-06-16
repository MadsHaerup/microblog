import { Logo } from '../components/Logo'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { ChevronDownIcon} from '@heroicons/react/outline'
import { useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/client';
import { FlyoutMenu } from '../components/FlyoutMenu'
import { MobileMenu } from '../components/MobileMenu'
import useMediaQuery from '../hooks/use-media-query'

export const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ session, loading ] = useSession()
  const [ menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef();
  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)
  
  useEffect(() => {
   setMounted(true)
  }, []);

  const ThemeChanger = () =>{
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark'){
      return(
        <SunIcon
        className="w-7 h-7"
        role="button"
        onClick={()=>setTheme('light')}
        />
      );
    } else{
      return ( 
      <MoonIcon
      className="w-7 h-7"
      role="button"
      onClick={()=>setTheme('dark')}
      />
      );
    }
  }

  return (
    <header className="border-b border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between">
       <Logo/>

        <div className="flex items-center space-x-3">
          {ThemeChanger()}

          {!loading ? (
            <div>
              {!session ? (
                <button type="button" onClick={signIn}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
                >Sign in</button>
              ) : (
                <div className="relative" ref={containerRef}>

                <button onClick={()=> setMenuOpen(prev => !prev)}
                  className="flex items-center space-x-1 sm:space-x-2">
                  <img src={session.user.image} alt={session.user.name} 
                  className="rounded-full border-2 border-blue-600 w-8 h8"
                  />
                  <p className="flex items-center sm:space-x-1">
                    <span className="hidden sm:inline-block ">
                      Hello {session.user.name?.split(' ')?.[0] ?? 'there'}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1"/>
                  </p>
                </button>
                <FlyoutMenu  show={menuOpen && isLargeScreen} onClose={()=> setMenuOpen(false)} containerRef={containerRef} />
              </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <MobileMenu show={menuOpen && !isLargeScreen} onClose={()=> setMenuOpen(false)} />
    </header>
  )
}
