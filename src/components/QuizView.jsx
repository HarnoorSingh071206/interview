import Icon from './Icons'

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuizView({
  questions,
  answers,
  index,
  topicNameFor,
  onSelect,
  onNavigate,
  onFinish,
  onExit,
}) {
  const question = questions[index]
  if (!question) return null

  const answeredCount = questions.filter((q) => answers[q.id] != null).length
  const isLast = index === questions.length - 1
  const allAnswered = answeredCount === questions.length

  return (
    <div className="quiz-shell">
      <div className="quiz-head">
        <div>
          <div className="eyebrow">Practice quiz</div>
          <h1>
            Question {index + 1}
            <span className="quiz-head-total"> of {questions.length}</span>
          </h1>
        </div>
        <button type="button" className="ghost-btn quiz-exit" onClick={onExit}>
          <Icon name="close" size={15} />
          Exit quiz
        </button>
      </div>

      <div className="quiz-progress" aria-hidden="true">
        <div
          className="quiz-progress-fill"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="quiz-stage">
        <div className="quiz-card">
          <div className="quiz-card-top">
            <div className="quiz-card-tags">
              <span className="quiz-topic-pill">{topicNameFor(question.topicId)}</span>
              <span className={`badge ${question.difficulty.toLowerCase()}`}>
                <span className="badge-dot" />
                {question.difficulty}
              </span>
            </div>
            <span className="quiz-answered-count">
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          <h2 className="quiz-question">{question.question}</h2>

          <div
            className="quiz-options"
            role="radiogroup"
            aria-label={`Answer options for question ${index + 1}`}
          >
            {question.options.map((option, optionIndex) => {
              const selected = answers[question.id] === optionIndex
              return (
                <button
                  key={optionIndex}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`quiz-option ${selected ? 'selected' : ''}`}
                  onClick={() => onSelect(question.id, optionIndex)}
                >
                  <span className="option-letter">{LETTERS[optionIndex]}</span>
                  <span className="option-text">{option}</span>
                  <span className="option-check" aria-hidden="true">
                    <Icon name="check" size={13} strokeWidth={2.6} />
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="quiz-nav">
          <button
            type="button"
            className="ghost-btn"
            onClick={() => onNavigate(index - 1)}
            disabled={index === 0}
          >
            Previous
          </button>

          <div className="quiz-dots" aria-label="Question navigation">
            {questions.map((q, dotIndex) => (
              <button
                key={q.id}
                type="button"
                className={`quiz-dot ${dotIndex === index ? 'current' : ''} ${
                  answers[q.id] != null ? 'answered' : ''
                }`}
                onClick={() => onNavigate(dotIndex)}
                aria-label={`Go to question ${dotIndex + 1}`}
                aria-current={dotIndex === index ? 'step' : undefined}
              >
                {dotIndex + 1}
              </button>
            ))}
          </div>

          {isLast ? (
            <button
              type="button"
              className="primary-btn quiz-next-btn"
              onClick={onFinish}
              disabled={!allAnswered}
              title={allAnswered ? 'See your results' : 'Answer every question first'}
            >
              Finish quiz
              <Icon name="check" size={14} strokeWidth={2.4} />
            </button>
          ) : (
            <button
              type="button"
              className="primary-btn quiz-next-btn"
              onClick={() => onNavigate(index + 1)}
            >
              Next
              <Icon name="arrowLeft" size={14} className="icon-flip" />
            </button>
          )}
        </div>

        {isLast && !allAnswered && (
          <p className="quiz-hint">
            {questions.length - answeredCount} question
            {questions.length - answeredCount === 1 ? '' : 's'} still unanswered. Use the
            dots above to jump back.
          </p>
        )}
      </div>
    </div>
  )
}
