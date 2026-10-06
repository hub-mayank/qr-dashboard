import React from 'react'

function LinkForm({ link, setLink, onSubmit, loading, error }) {
  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <h1 className="heading">Turn any link into a QR code</h1>
      <p className="subheading">Paste a link, hit generate and share the code in one click.</p>

      <label className="label" htmlFor="link">Your link</label>
      <div className="row">
        <div className="field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.43" />
            <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.33-1.33" />
          </svg>
          <input
            id="link"
            type="text"
            inputMode="url"
            placeholder="https://example.com/my-page"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate QR'}
        </button>
      </div>

      {error && <p className="error" role="alert">{error}</p>}
    </form>
  )
}

export default LinkForm
