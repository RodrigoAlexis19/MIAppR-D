import React from 'react'
import { Link } from 'react-router-dom'

function IconCard({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <div
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-inner bg-gradient-to-br from-white/10 via-white/5 to-white/0 dark:from-white/10 dark:via-white/5 dark:to-white/0
        flex items-center justify-center backdrop-blur-md"
      >
        <img
          src={icon}
          alt={label}
          className="w-16 h-16 object-contain select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <span className="mt-2 text-sm text-center text-white dark:text-white">
        {label}
      </span>
    </Link>
  )
}

export default IconCard


