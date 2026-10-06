import React from 'react'

function Toast({ message }) {
  return (
    <div className="toast-wrap" aria-live="polite">
      {message && <div className="toast">{message}</div>}
    </div>
  )
}

export default Toast
