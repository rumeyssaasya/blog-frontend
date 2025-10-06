import React from 'react'
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

const themeComp = () => {
  return (
    <div>
      <FaMoon size={25} className='text-xl cursor-pointer' />
      <IoSunny size={28} className='text-xl cursor-pointer' />
    </div>
  )
}

export default themeComp