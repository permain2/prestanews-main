import React from 'react'

// Navbar logo (small, shown in the top-left)
export function Logo() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '4px 0'
    }}>
      <img 
        src="/logo/screened-icon.png" 
        alt="Screened" 
        style={{ 
          height: '28px', 
          width: 'auto',
          objectFit: 'contain'
        }} 
      />
      <span style={{
        fontFamily: '"Sora", sans-serif',
        fontWeight: 700,
        fontSize: '16px',
        color: '#162433',
      }}>
        Screened
      </span>
    </div>
  )
}

// Studio logo (shown on the login page)
export function StudioLogo() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      gap: '12px',
      padding: '20px'
    }}>
      <img 
        src="/logo/screened-logo.png" 
        alt="Screened" 
        style={{ 
          height: '48px', 
          width: 'auto',
          objectFit: 'contain'
        }} 
      />
      <span style={{
        fontFamily: '"Sora", sans-serif',
        fontWeight: 500,
        fontSize: '14px',
        color: '#68727C',
      }}>
        Content Management
      </span>
    </div>
  )
}
