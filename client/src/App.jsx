import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import LinkForm from './components/LinkForm'
import QrCard from './components/QrCard'
import History from './components/History'
import Toast from './components/Toast'

function App() {
  const [link, setLink] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('history')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    if (!toast) return
    let timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const generate = async (url) => {
    setLoading(true)
    setError('')

    try {
      let res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      let data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      setResult(data)
      setLink(data.url)
      setHistory((old) => [data.url, ...old.filter((item) => item !== data.url)].slice(0, 5))
    } catch (err) {
      setError('server is not reachable')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generate(link)
  }

  return (
    <div>
      <Navbar />
      <main className="layout">
        <LinkForm
          link={link}
          setLink={setLink}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
        <QrCard result={result} showToast={setToast} />
        <History items={history} onSelect={generate} onClear={() => setHistory([])} />
      </main>
      <Toast message={toast} />
    </div>
  )
}

export default App
