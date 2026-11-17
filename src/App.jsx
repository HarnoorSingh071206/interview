import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { allQuestions, DIFFICULTIES, topics } from './data/questions'
import quizBank from './data/quizzes.json'
import { makeQuiz } from './lib/quiz'
import Icon from './components/Icons'
import QuestionCard from './components/QuestionCard'
import QuizResults from './components/QuizResults'
import QuizSetup from './components/QuizSetup'
import QuizView from './components/QuizView'
import Sidebar from './components/Sidebar'

const REVIEW_KEY = 'prepdeck:reviewed'
const THEME_KEY = 'prepdeck:theme'

function readReviewed() {
  try {
    const raw = localStorage.getItem(REVIEW_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

function readTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function ProgressRing({ value, size = 54, stroke = 5, color = 'var(--brand)' }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference
  return (
    <svg width={size} height={size} className="ring" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--line)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="ring-value"
      />
    </svg>
  )
}

export default function App() {
  const [theme, setTheme] = useState(readTheme)
  const [reviewed, setReviewed] = useState(readReviewed)
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id)
  const [difficulty, setDifficulty] = useState('All')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(() => new Set())
  const [hideReviewed, setHideReviewed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [quizSetupOpen, setQuizSetupOpen] = useState(false)
  const [quizTopicIds, setQuizTopicIds] = useState([])
  const [quizMode, setQuizMode] = useState('study') // study | quiz | results
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizIndex, setQuizIndex] = useState(0)
  const searchRef = useRef(null)

  const activeTopic = topics.find((t) => t.id === activeTopicId) || topics[0]
  const isSearching = query.trim().length > 0

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem(REVIEW_KEY, JSON.stringify([...reviewed]))
    } catch {
      /* ignore */
    }
  }, [reviewed])

  // Keyboard shortcuts: Cmd/Ctrl+K or "/" focus search, Escape clears.
  useEffect(() => {
    function onKeyDown(e) {
      if (!searchRef.current) return
      const tag = document.activeElement?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('')
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const baseQuestions = useMemo(() => {
    if (isSearching) {
      const needle = query.trim().toLowerCase()
      return allQuestions.filter((q) => {
        const haystack = `${q.question} ${q.answer} ${q.topicName}`.toLowerCase()
        return haystack.includes(needle)
      })
    }
    return activeTopic.questions
  }, [activeTopic, isSearching, query])

  const difficultyCounts = useMemo(() => {
    const counts = { All: baseQuestions.length }
    for (const level of DIFFICULTIES) {
      counts[level] = baseQuestions.filter((q) => q.difficulty === level).length
    }
    return counts
  }, [baseQuestions])

  const visibleQuestions = useMemo(
    () =>
      baseQuestions.filter((q) => {
        if (difficulty !== 'All' && q.difficulty !== difficulty) return false
        if (hideReviewed && reviewed.has(q.id)) return false
        return true
      }),
    [baseQuestions, difficulty, hideReviewed, reviewed],
  )

  const activeStats = useMemo(() => {
    const total = activeTopic.questions.length
    const done = activeTopic.questions.filter((q) => reviewed.has(q.id)).length
    return { total, done, percent: total ? Math.round((done / total) * 100) : 0 }
  }, [activeTopic, reviewed])

  const overallDone = reviewed.size
  const overallTotal = allQuestions.length

  const toggleQuestion = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleReviewed = useCallback((id) => {
    setReviewed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const allVisibleOpen =
    visibleQuestions.length > 0 && visibleQuestions.every((q) => expanded.has(q.id))

  function toggleExpandAll() {
    setExpanded((prev) => {
      if (allVisibleOpen) {
        const next = new Set(prev)
        visibleQuestions.forEach((q) => next.delete(q.id))
        return next
      }
      const next = new Set(prev)
      visibleQuestions.forEach((q) => next.add(q.id))
      return next
    })
  }

  function pickRandom() {
    if (!visibleQuestions.length) return
    const q = visibleQuestions[Math.floor(Math.random() * visibleQuestions.length)]
    setExpanded((prev) => new Set(prev).add(q.id))
    requestAnimationFrame(() => {
      document.getElementById(`q-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  function selectTopic(id) {
    setActiveTopicId(id)
    setQuery('')
    setDifficulty('All')
    setExpanded(new Set())
    setSidebarOpen(false)
    setQuizSetupOpen(false)
    setQuizMode('study')
    setQuizQuestions([])
    setQuizAnswers({})
    setQuizIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetProgress() {
    if (window.confirm('Reset all reviewed questions? This cannot be undone.')) {
      setReviewed(new Set())
    }
  }

  function topicNameFor(id) {
    return topics.find((topic) => topic.id === id)?.name || 'Topic'
  }

  function openQuizSetup() {
    setQuizTopicIds((prev) => (prev.length ? prev : [activeTopicId]))
    setQuizSetupOpen(true)
  }

  function toggleQuizTopic(id) {
    setQuizTopicIds((prev) =>
      prev.includes(id) ? prev.filter((topicId) => topicId !== id) : [...prev, id],
    )
  }

  function startQuiz() {
    const questions = makeQuiz(quizBank, quizTopicIds)
    if (!questions.length) return
    setQuizQuestions(questions)
    setQuizAnswers({})
    setQuizIndex(0)
    setQuizSetupOpen(false)
    setQuizMode('quiz')
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function selectQuizAnswer(questionId, optionIndex) {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function navigateQuiz(nextIndex) {
    setQuizIndex(Math.min(Math.max(nextIndex, 0), quizQuestions.length - 1))
  }

  function finishQuiz() {
    setQuizMode('results')
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function exitQuiz() {
    if (quizMode === 'quiz' && Object.keys(quizAnswers).length > 0) {
      const confirmed = window.confirm('Exit this quiz? Your answers will be lost.')
      if (!confirmed) return
    }
    setQuizMode('study')
    setQuizQuestions([])
    setQuizAnswers({})
    setQuizIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const heroQuestions = activeTopic.questions
  const difficultyBreakdown = DIFFICULTIES.map((level) => ({
    level,
    count: heroQuestions.filter((q) => q.difficulty === level).length,
  }))

  return (
    <div className="app">
      <Sidebar
        topics={topics}
        activeTopicId={isSearching ? null : activeTopicId}
        onSelectTopic={selectTopic}
        reviewedIds={reviewed}
        reviewCount={overallDone}
        totalCount={overallTotal}
        onReset={resetProgress}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenQuiz={openQuizSetup}
      />

      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open topics"
          >
            <Icon name="menu" size={20} />
          </button>

          {quizMode === 'study' ? (
            <div className={`search ${isSearching ? 'has-value' : ''}`}>
              <Icon name="search" size={17} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions, answers, topics…"
                aria-label="Search questions"
              />
              {query ? (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => {
                    setQuery('')
                    searchRef.current?.focus()
                  }}
                  aria-label="Clear search"
                >
                  <Icon name="close" size={14} />
                </button>
              ) : (
                <span className="kbd-hint">
                  <kbd>⌘</kbd>
                  <kbd>K</kbd>
                </span>
              )}
            </div>
          ) : (
            <div className="quiz-context">
              <Icon name={quizMode === 'quiz' ? 'target' : 'trophy'} size={16} />
              <span>{quizMode === 'quiz' ? 'Practice quiz' : 'Quiz results'}</span>
            </div>
          )}

          <div className="topbar-actions">
            {quizMode === 'study' ? (
              <button
                type="button"
                className="ghost-btn"
                onClick={pickRandom}
                disabled={!visibleQuestions.length}
              >
                <Icon name="shuffle" size={16} />
                <span className="btn-label">Random</span>
              </button>
            ) : (
              <button type="button" className="ghost-btn" onClick={exitQuiz}>
                <Icon name="arrowLeft" size={15} />
                <span className="btn-label">Exit quiz</span>
              </button>
            )}
            <button
              type="button"
              className="icon-btn theme-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
          </div>
        </header>

        <main className="content">
          {quizMode === 'quiz' ? (
            <QuizView
              questions={quizQuestions}
              answers={quizAnswers}
              index={quizIndex}
              topicNameFor={topicNameFor}
              onSelect={selectQuizAnswer}
              onNavigate={navigateQuiz}
              onFinish={finishQuiz}
              onExit={exitQuiz}
            />
          ) : quizMode === 'results' ? (
            <QuizResults
              questions={quizQuestions}
              answers={quizAnswers}
              topicNameFor={topicNameFor}
              onRetake={startQuiz}
              onChangeTopics={() => setQuizSetupOpen(true)}
              onExit={exitQuiz}
            />
          ) : (
            <>
          {isSearching ? (
            <section className="search-head">
              <div className="eyebrow">Search results</div>
              <h1>
                “{query.trim()}”
              </h1>
              <p>
                {difficultyCounts.All} question{difficultyCounts.All === 1 ? '' : 's'} found across all topics
              </p>
            </section>
          ) : (
            <section
              className="hero"
              style={{ '--accent': activeTopic.accent }}
            >
              <div className="hero-glow" aria-hidden="true" />
              <div className="hero-main">
                <div className="hero-icon">
                  <Icon name={activeTopic.icon} size={30} strokeWidth={1.7} />
                </div>
                <div className="hero-copy">
                  <div className="eyebrow">Topic · {String(topics.findIndex((t) => t.id === activeTopic.id) + 1).padStart(2, '0')}</div>
                  <h1>{activeTopic.name}</h1>
                  <p>{activeTopic.tagline}</p>
                  <div className="hero-tags">
                    {difficultyBreakdown.map(({ level, count }) => (
                      <span key={level} className={`badge ${level.toLowerCase()}`}>
                        <span className="badge-dot" />
                        {count} {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hero-progress">
                <ProgressRing value={activeStats.percent} color={activeTopic.accent} />
                <div>
                  <strong>{activeStats.percent}%</strong>
                  <span>
                    {activeStats.done}/{activeStats.total} reviewed
                  </span>
                </div>
              </div>
            </section>
          )}

          <div className="controls">
            <div className="filters" role="group" aria-label="Filter by difficulty">
              {['All', ...DIFFICULTIES].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`filter ${difficulty === level ? 'active' : ''} ${level !== 'All' ? level.toLowerCase() : ''}`}
                  onClick={() => setDifficulty(level)}
                  aria-pressed={difficulty === level}
                >
                  {level !== 'All' && <span className="filter-dot" />}
                  {level}
                  <span className="filter-count">{difficultyCounts[level]}</span>
                </button>
              ))}
            </div>

            <div className="control-actions">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={hideReviewed}
                  onChange={(e) => setHideReviewed(e.target.checked)}
                />
                <span className="switch-track" aria-hidden="true">
                  <span className="switch-thumb" />
                </span>
                Hide reviewed
              </label>
              <button type="button" className="link-btn" onClick={toggleExpandAll}>
                {allVisibleOpen ? 'Collapse all' : 'Expand all'}
              </button>
            </div>
          </div>

          <div className="results-meta">
            <span>
              Showing <strong>{visibleQuestions.length}</strong> of {baseQuestions.length} questions
              {difficulty !== 'All' && <> · {difficulty}</>}
            </span>
            {hideReviewed && reviewed.size > 0 && <span className="meta-pill">Hiding reviewed</span>}
          </div>

          <div className="question-list">
            {visibleQuestions.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  <Icon name="search" size={26} />
                </div>
                <h2>No questions here</h2>
                <p>
                  {isSearching
                    ? 'Try a shorter or different search term.'
                    : 'Nothing matches this filter. Try another difficulty or unhide reviewed questions.'}
                </p>
                <div className="empty-actions">
                  {(difficulty !== 'All' || hideReviewed) && (
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => {
                        setDifficulty('All')
                        setHideReviewed(false)
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                  {isSearching && (
                    <button type="button" className="ghost-btn" onClick={() => setQuery('')}>
                      <Icon name="close" size={14} />
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              visibleQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  index={index + 1}
                  isOpen={expanded.has(q.id)}
                  onToggle={() => toggleQuestion(q.id)}
                  reviewed={reviewed.has(q.id)}
                  onReview={() => toggleReviewed(q.id)}
                  accent={isSearching ? topics.find((t) => t.id === q.topicId)?.accent : activeTopic.accent}
                  showTopic={isSearching}
                />
              ))
            )}
          </div>

          <footer className="foot">
            <span>
              <Icon name="spark" size={14} />
              PrepDeck · Topic-wise web development interview practice
            </span>
            <span className="foot-meta">
              {topics.length} topics · {allQuestions.length} questions
            </span>
          </footer>
            </>
          )}
        </main>
      </div>

      {quizMode === 'study' && (
        <button
          type="button"
          className="fab"
          onClick={pickRandom}
          disabled={!visibleQuestions.length}
          aria-label="Pick a random question"
          title="Pick a random question"
        >
          <Icon name="shuffle" size={20} />
        </button>
      )}

      {quizSetupOpen && (
        <QuizSetup
          topics={topics}
          bank={quizBank}
          selected={quizTopicIds}
          onToggle={toggleQuizTopic}
          onSelectAll={() => setQuizTopicIds(topics.map((topic) => topic.id))}
          onClear={() => setQuizTopicIds([])}
          onStart={startQuiz}
          onClose={() => setQuizSetupOpen(false)}
        />
      )}
    </div>
  )
}
