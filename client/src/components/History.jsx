import React from 'react'

function History({ items, onSelect, onClear }) {
  if (items.length === 0) return null

  return (
    <section className="card history-card">
      <div className="history-top">
        <h2 className="title">Recent links</h2>
        <button className="text-btn" onClick={onClear}>Clear</button>
      </div>

      <ul className="history-list">
        {items.map((item) => (
          <li key={item}>
            <button className="history-item" onClick={() => onSelect(item)}>
              <span className="history-url">{item}</span>
              <span className="history-go">Generate</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default History
