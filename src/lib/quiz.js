export const QUIZ_SIZE = 5

// Every quiz is 2 easy + 2 moderate + 1 hard.
export const QUIZ_MIX = {
  Easy: 2,
  Moderate: 2,
  Hard: 1,
}

const DIFFICULTIES = Object.keys(QUIZ_MIX)

function shuffle(items) {
  const list = [...items]
  // Fisher-Yates shuffle so every question has an equal chance.
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export function makeQuiz(bank, topicIds) {
  const pool = topicIds.flatMap((topicId) =>
    (bank[topicId] || []).map((question) => ({ ...question, topicId })),
  )

  const picked = []
  const leftovers = []

  for (const difficulty of DIFFICULTIES) {
    const bucket = shuffle(pool.filter((question) => question.difficulty === difficulty))
    const wanted = QUIZ_MIX[difficulty]
    picked.push(...bucket.slice(0, wanted))
    leftovers.push(...bucket.slice(wanted))
  }

  // If a difficulty runs short, fill the remaining slots from whatever is left.
  if (picked.length < QUIZ_SIZE) {
    picked.push(...shuffle(leftovers).slice(0, QUIZ_SIZE - picked.length))
  }

  return shuffle(picked)
}
