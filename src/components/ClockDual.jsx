import React, { useEffect, useState } from 'react'

const ClockDual = () => {
  const [horaChile, setHoraChile] = useState('')
  const [horaVenezuela, setHoraVenezuela] = useState('')

  useEffect(() => {
    const updateClocks = () => {
      const chileTime = new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Santiago'
      })

      const veneTime = new Date().toLocaleTimeString('es-VE', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Caracas'
      })

      setHoraChile(chileTime)
      setHoraVenezuela(veneTime)
    }

    updateClocks()
    const interval = setInterval(updateClocks, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-12 items-center justify-center text-lg text-[#9ee7ff]">
      <div className="flex items-center gap-2">
        🇨🇱 <span>{horaChile}</span>
      </div>
      <div className="flex items-center gap-2">
        🇻🇪 <span>{horaVenezuela}</span>
      </div>
    </div>
  )
}

export default ClockDual