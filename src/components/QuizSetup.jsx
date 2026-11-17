import { useEffect } from 'react'
import Icon from './Icons'

export default function QuizSetup({
  topics,
  bank,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  onStart,
  onClose,
}) {
  const poolSize = selected.reduce((total, id) => total + (bank[id]?.length || 0), 0)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="quiz-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        <div className="quiz-modal-head">
          <div className="quiz-modal-icon">
            <Icon name="spark" size={22} />
          </div>
          <div>
            <h2 id="quiz-modal-title">Generate a quiz</h2>
            <p>Pick the topics you want to be tested on.</p>
          </div>
          <button
            type="button"
            className="icon-btn quiz-modal-close"
            onClick={onClose}
            aria-label="Close quiz setup"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="quiz-modal-body">
          <div className="quiz-modal-meta">
            <span>
              Select one or more topics
              <span className="quiz-modal-selected"> {selected.length} selected</span>
            </span>
            <div className="quiz-select-actions">
              <button type="button" className="link-btn" onClick={onSelectAll}>
                Select all
              </button>
              <span aria-hidden="true">·</span>
              <button type="button" className="link-btn" onClick={onClear} disabled={!selected.length}>
                Clear
              </button>
            </div>
          </div>

          <div className="quiz-topic-grid">
            {topics.map((topic) => {
              const active = selected.includes(topic.id)
              return (
                <label
                  key={topic.id}
                  className={`quiz-topic-option ${active ? 'selected' : ''}`}
                  style={{ '--accent': topic.accent }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => onToggle(topic.id)}
                  />
                  <span className="quiz-topic-icon">
                    <Icon name={topic.icon} size={17} />
                  </span>
                  <span className="quiz-topic-copy">
                    <strong>{topic.name}</strong>
                    <small>10 MCQs</small>
                  </span>
                  <span className="quiz-tick" aria-hidden="true">
                    <Icon name="check" size={12} strokeWidth={2.6} />
                  </span>
                </label>
              )
            })}
          </div>

          <div className="quiz-pool-note">
            <Icon name="target" size={15} />
            <span>
              {poolSize} question{poolSize === 1 ? '' : 's'} in the pool · each quiz is 2 easy,
              2 moderate and 1 hard
            </span>
          </div>
        </div>

        <div className="quiz-modal-foot">
          <button type="button" className="ghost-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="primary-btn quiz-start-btn"
            onClick={onStart}
            disabled={!selected.length}
          >
            <Icon name="play" size={14} />
            Start quiz
          </button>
        </div>
      </div>
    </div>
  )
}
