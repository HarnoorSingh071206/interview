import Icon from './Icons'

export default function Sidebar({
  topics,
  activeTopicId,
  onSelectTopic,
  reviewedIds,
  reviewCount,
  totalCount,
  onReset,
  open,
  onClose,
  onOpenQuiz,
}) {
  const percent = totalCount ? Math.round((reviewCount / totalCount) * 100) : 0

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span>P</span>
          </div>
          <div className="brand-text">
            <strong>PrepDeck</strong>
            <span>Web dev interview prep</span>
          </div>
          <button
            type="button"
            className="icon-btn sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <button type="button" className="quiz-cta" onClick={onOpenQuiz}>
          <span className="quiz-cta-icon">
            <Icon name="spark" size={17} />
          </span>
          <span className="quiz-cta-copy">
            <strong>Generate quiz</strong>
            <small>5 MCQs · your topics</small>
          </span>
          <Icon name="chevron" size={15} className="quiz-cta-arrow" />
        </button>

        <div className="side-label">Topics</div>
        <nav className="topic-nav" aria-label="Topics">
          {topics.map((topic) => {
            const count = topic.questions.length
            const done = topic.questions.filter((q) => reviewedIds.has(q.id)).length
            return (
              <button
                key={topic.id}
                type="button"
                className={`topic-item ${activeTopicId === topic.id ? 'active' : ''}`}
                onClick={() => onSelectTopic(topic.id)}
                style={{ '--accent': topic.accent }}
                aria-current={activeTopicId === topic.id ? 'page' : undefined}
              >
                <span className="topic-icon">
                  <Icon name={topic.icon} size={17} />
                </span>
                <span className="topic-name">{topic.name}</span>
                <span className="topic-count">
                  {done > 0 ? `${done}/${count}` : count}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-foot">
          <div className="progress-card">
            <div className="progress-top">
              <span className="progress-title">
                <Icon name="target" size={15} />
                Overall progress
              </span>
              <span className="progress-pct">{percent}%</span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <div className="progress-meta">
              {reviewCount} of {totalCount} reviewed
            </div>
            <button
              type="button"
              className="reset-btn"
              onClick={onReset}
              disabled={reviewCount === 0}
            >
              <Icon name="reset" size={13} />
              Reset progress
            </button>
          </div>
          <p className="side-note">
            Built for the GR Web Dev roadmap. Pick a topic, filter by difficulty,
            and reveal answers one by one.
          </p>
        </div>
      </aside>
    </>
  )
}
