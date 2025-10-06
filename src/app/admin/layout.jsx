'use client'

import { useTheme } from 'next-themes'

export default function AdminLayout({ children }) {
  const { theme } = useTheme()
  const containerStyle = { padding: '24px', margin: '12px' }
  const containerClass = theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
  return (
    <div style={containerStyle} className={containerClass}>
      {children}
    </div>
  )
}


