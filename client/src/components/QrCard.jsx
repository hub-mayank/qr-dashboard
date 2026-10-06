import React from 'react'

function QrCard({ result, showToast }) {
  if (!result) {
    return (
      <aside className="card qr-card empty">
        <div className="placeholder" aria-hidden="true"></div>
        <p className="muted">Your QR code will show up here</p>
      </aside>
    )
  }

  const getBlob = async () => {
    let res = await fetch(result.qr)
    return res.blob()
  }

  const copyImage = async (blob) => {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast('QR copied, paste it anywhere')
    } catch (err) {
      await navigator.clipboard.writeText(result.url)
      showToast('Link copied to clipboard')
    }
  }

  // share the qr image with the link, or copy it if share is not supported
  const handleShare = async () => {
    let blob = await getBlob()
    let file = new File([blob], 'qr-code.png', { type: 'image/png' })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'QR code', text: result.url })
      } catch (err) {
        if (err.name !== 'AbortError') showToast('Could not share')
      }
      return
    }

    copyImage(blob)
  }

  const handleCopy = async () => {
    copyImage(await getBlob())
  }

  let hostname = new URL(result.url).hostname

  return (
    <aside className="card qr-card">
      <div className="qr-frame">
        <img src={result.qr} alt={`QR code for ${result.url}`} />
      </div>

      <a className="qr-link" href={result.url} target="_blank" rel="noreferrer">
        {result.url}
      </a>

      <button className="btn primary full" onClick={handleShare}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
          <path d="M16 6l-4-4-4 4" />
          <path d="M12 2v13" />
        </svg>
        Share
      </button>

      <div className="actions">
        <button className="btn ghost" onClick={handleCopy}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </button>
        <a className="btn ghost" href={result.qr} download={`qr-${hostname}.png`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          Download
        </a>
      </div>
    </aside>
  )
}

export default QrCard
