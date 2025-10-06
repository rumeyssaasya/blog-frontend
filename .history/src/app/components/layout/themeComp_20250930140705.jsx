import React from 'react'
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

const themeComp = () => {
  return (
    <div>
      <FaMoon className='text-xl cursor-pointer dark:hidden' />
      <IoSunny className='text-xl cursor-pointer hidden dark:block' />
    </div>
  )
}

export default themeComp