import Icon from './Icons'

const LETTERS = ['A', 'B', 'C', 'D']

function messageFor(score, total) {
  const ratio = total ? score / total : 0
  if (ratio === 1) return 'Flawless. You nailed every question.'
  if (ratio >= 0.8) return 'Strong performance — just a small gap to close.'
  if (ratio >= 0.6) return 'Solid effort. Read the explanations and run it again.'
  if (ratio >= 0.4) return 'Getting there. The review below is your cheat sheet.'
  return 'Good start — read the explanations, then give it another shot.'
}

function ScoreRing({ percent }) {
  const size = 118
  const stroke = 9
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <div className="result-score">
      <svg width={size} height={size} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--brand)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="result-score-text">
        <strong>{percent}%</strong>
        <span>score</span>
      </div>
    </div>
  )
}

export default function QuizResults({
  questions,
  answers,
  topicNameFor,
  onRetake,
  onChangeTopics,
  onExit,
}) {
  const total = questions.length
  const score = questions.filter((q) => answers[q.id] === q.answer).length
  const percent = total ? Math.round((score / total) * 100) : 0

  return (
    <div className="quiz-shell">
      <section className="result-card">
        <div className="result-copy">
          <div className="eyebrow">Quiz complete</div>
          <h1>
            {score} / {total} correct
          </h1>
          <p>{messageFor(score, total)}</p>
          <div className="result-actions">
            <button type="button" className="primary-btn" onClick={onRetake}>
              <Icon name="shuffle" size={14} />
              Retake with new questions
            </button>
            <button type="button" className="ghost-btn" onClick={onChangeTopics}>
              Change topics
            </button>
            <button type="button" className="ghost-btn" onClick={onExit}>
              Back to study
            </button>
          </div>
        </div>
        <ScoreRing percent={percent} />
      </section>

      <div className="review-head">
        <h2>
          <Icon name="book" size={17} />
          Answer review
        </h2>
        <span>Correct answers and explanations</span>
      </div>

      <div className="review-list">
        {questions.map((question, index) => {
          const chosen = answers[question.id]
          const isCorrect = chosen === question.answer
          return (
            <article
              key={question.id}
              className={`review-card ${isCorrect ? 'right' : 'wrong'}`}
            >
              <header className="review-card-head">
                <span className="review-index">Q{index + 1}</span>
                <span className="quiz-topic-pill">{topicNameFor(question.topicId)}</span>
                <span className={`badge ${question.difficulty.toLowerCase()}`}>
                  <span className="badge-dot" />
                  {question.difficulty}
                </span>
                <span className={`badge ${isCorrect ? 'easy' : 'hard'}`}>
                  <span className="badge-dot" />
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </header>

              <h3>{question.question}</h3>

              <div className="review-answers">
                <div className={`review-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <span>Your answer</span>
                  <p>
                    {chosen != null
                      ? `${LETTERS[chosen]}. ${question.options[chosen]}`
                      : 'Not answered'}
                  </p>
                </div>
                {!isCorrect && (
                  <div className="review-answer correct">
                    <span>Correct answer</span>
                    <p>
                      {LETTERS[question.answer]}. {question.options[question.answer]}
                    </p>
                  </div>
                )}
              </div>

              <div className="review-explanation">
                <strong>Explanation</strong>
                <p>{question.explanation}</p>
              </div>
            </article>
          )
        })}
      </div>

      <div className="review-foot">
        <button type="button" className="primary-btn" onClick={onRetake}>
          <Icon name="shuffle" size={14} />
          Take another quiz
        </button>
        <button type="button" className="ghost-btn" onClick={onExit}>
          Back to study
        </button>
      </div>
    </div>
  )
}
