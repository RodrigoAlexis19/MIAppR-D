/*import React from 'react'
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

export default IconCard */

/* import React from 'react'
import { Link } from 'react-router-dom'

function IconCard({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <div
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 shadow-[inset_0_4px_8px_rgba(255,255,255,0.15),0_6px_15px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[#20242a] to-[#333843] flex items-center justify-center backdrop-blur-md"
      >
        <img
          src={icon}
          alt={label}
          className="w-20 h-20 object-contain select-none"
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

export default IconCard */

/*import React from 'react'
import { Link } from 'react-router-dom'

function IconCard({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <div
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 shadow-[inset_0_4px_10px_rgba(255,255,255,0.5),_0_6px_15px_rgba(0,0,0,0.3)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),rgba(255,255,255,0.1))] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] backdrop-blur-md flex items-center justify-center"
      >
        <img
          src={icon}
          alt={label}
          className="w-20 h-20 object-contain select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <span className="mt-2 text-sm text-center text-black dark:text-white">
        {label}
      </span>
    </Link>
  )
}

export default IconCard */ 

import React from 'react'
import { Link } from 'react-router-dom'

function IconCard({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <div
        className={`
          w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 flex items-center justify-center backdrop-blur-md
          bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.7),rgba(255,255,255,0.05))]
          dark:bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.1),rgba(0,0,0,0.6))]
          shadow-[inset_0_4px_10px_rgba(255,255,255,0.4),_inset_0_-6px_10px_rgba(0,0,0,0.25),_0_8px_16px_rgba(0,0,0,0.3)]
          dark:shadow-[inset_0_4px_6px_rgba(255,255,255,0.1),_inset_0_-4px_8px_rgba(0,0,0,0.6),_0_8px_18px_rgba(0,0,0,0.5)]
        `}
      >
        <img
          src={icon}
          alt={label}
          className="w-20 h-20 object-contain select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <span className="mt-2 text-sm text-center text-black dark:text-white">
        {label}
      </span>
    </Link>
  )
}

export default IconCard
