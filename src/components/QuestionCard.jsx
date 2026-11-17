import Answer from './Answer'
import Icon from './Icons'

export default function QuestionCard({
  q,
  index,
  isOpen,
  onToggle,
  reviewed,
  onReview,
  accent,
  showTopic = false,
}) {
  const bodyId = `answer-${q.id}`

  return (
    <article
      id={`q-${q.id}`}
      className={`q-card ${isOpen ? 'is-open' : ''} ${reviewed ? 'is-reviewed' : ''}`}
      style={{ '--accent': accent }}
    >
      <div className="q-head">
        <button
          type="button"
          className="q-main"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={bodyId}
        >
          <span className="q-index">{String(index).padStart(2, '0')}</span>
          <span className="q-text-wrap">
            <span className="q-text">{q.question}</span>
            <span className="q-meta">
              {showTopic && <span className="q-topic-chip">{q.topicName}</span>}
              <span className={`badge ${q.difficulty.toLowerCase()}`}>
                <span className="badge-dot" />
                {q.difficulty}
              </span>
            </span>
          </span>
          <span className="q-chevron" aria-hidden="true">
            <Icon name="chevron" size={18} />
          </span>
        </button>

        <button
          type="button"
          className={`q-review ${reviewed ? 'active' : ''}`}
          onClick={onReview}
          aria-pressed={reviewed}
          title={reviewed ? 'Mark as not reviewed' : 'Mark as reviewed'}
        >
          <Icon name="check" size={15} strokeWidth={2.4} />
          <span className="sr-only">
            {reviewed ? 'Mark as not reviewed' : 'Mark as reviewed'}
          </span>
        </button>
      </div>

      <div className="q-body" id={bodyId}>
        <div className="q-body-inner">
          <div className="answer">
            <div className="answer-label">
              <Icon name="book" size={14} />
              Answer
            </div>
            <Answer text={q.answer} />
            <div className="answer-footer">
              <button
                type="button"
                className={`mark-btn ${reviewed ? 'active' : ''}`}
                onClick={onReview}
              >
                <Icon name="check" size={14} strokeWidth={2.4} />
                {reviewed ? 'Reviewed' : 'Mark as reviewed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
