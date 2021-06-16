import { Logo } from '../components/Logo'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
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
      {ThemeChanger()}
    </div>
    </header>
  )
}
