import React from 'react'

const Footer = () => {
  return (
    <footer>
    <div className="container mx-auto  bg-indigo-300 dark:bg-violet-700 ">
    
            <div className="flex items-center  h-20 p-10">
              <div className="flex items-center space-x-4">
                  <ThemeComp />
              </div>
              <div className="font-bold ">
                <div className='text-violet-800 text-5xl dark:text-indigo-100'>Tarvina Blog</div>
              </div>
            </div>  
    </div>
    <footer/>
  )
}

export default Footer