// components/ProfileIcon.jsx
import { useState, useRef, useEffect } from 'react'
import './style/ProfileIcon.scss'

export default function ProfileIcon({ user }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Click bahar ho to close karo
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = user?.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : 'U'

  return (
    <div className="profile-icon-wrap" ref={ref}>
      <button
        className="avatar-btn"
        onClick={() => setOpen(p => !p)}
        aria-label="Profile menu"
      >
        {user?.avatar ? (
          <img className="avatar-img" src={user.avatar} alt="avatar" />
        ) : (
          <div className="avatar-initials">{initials}</div>
        )}
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <p className="dropdown-name">{user?.userName || 'User'}</p>
            <p className="dropdown-email">{user?.email}</p>
          </div>
          {/* <div className="dropdown-divider" />
          <button className="dropdown-item" onClick={() => { navigate('/profile'); setOpen(false) }}>
            Profile
          </button> */}
          {/* <button className="dropdown-item" onClick={() => { navigate('/settings'); setOpen(false) }}>
            Settings
          </button>
          <div className="dropdown-divider" />
        //   <button className="dropdown-item danger" onClick={() =>setOpen(false) }}>
        //     Logout
        //   </button> */}
        </div>
      )}
    </div>
  )
}