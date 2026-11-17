export const QUIZ_SIZE = 5

export function makeQuiz(bank, topicIds, size = QUIZ_SIZE) {
  const pool = topicIds.flatMap((topicId) =>
    (bank[topicId] || []).map((question) => ({ ...question, topicId })),
  )

  // Fisher-Yates shuffle so every question has an equal chance.
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, Math.min(size, pool.length))
}
