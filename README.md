# PrepDeck — Web Dev Interview Practice

A React + Vite front-end for topic-wise web development interview practice, built around the topics from the **GR Web Dev Team** roadmap (HTML, CSS, JavaScript, React, Tailwind, Git, Node/Express, Next.js, Databases, Advanced & Deployment).

## Features

- **10 topic decks · 105 questions** with detailed answers
- **Difficulty filters** — All / Easy / Moderate / Hard, with live counts per topic
- **Dropdown answers** — click a question to expand the answer inline (smooth accordion)
- **Search** across every question, answer and topic (`⌘K` / `Ctrl+K` / `/`)
- **Reviewed tracking** saved in `localStorage`, per-topic and overall progress
- **Hide reviewed** toggle, expand/collapse all, and a random question picker
- **Quiz generator** — pick any number of topics and get a random 5-question MCQ quiz
- **Answer review** — score, your answer vs. the correct answer, and an explanation for every question
- **Light & dark themes** (remembers your choice, respects system preference by default)
- **Responsive** — collapsible sidebar and mobile layout

## Run it

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```
index.html
src/
  main.jsx                 # React entry
  App.jsx                  # state: topic, filters, search, progress, theme
  styles.css               # design system + layout + responsive styles
  components/
    Sidebar.jsx            # topic navigation + overall progress
    QuestionCard.jsx       # accordion card with difficulty + reviewed state
    Answer.jsx             # small markdown-ish renderer for answers
    QuizSetup.jsx          # multi-topic quiz setup dialog
    QuizView.jsx           # one-question-at-a-time quiz runner
    QuizResults.jsx        # score ring + answer/explanation review
    Icons.jsx              # inline SVG icon set
  data/
    questions.js           # all topics and questions
    quizzes.json           # 10 MCQs per topic (quiz bank)
  lib/
    quiz.js                # shuffled 5-question quiz builder
```

## Quiz format

`src/data/quizzes.json` is keyed by topic id. Each topic holds 10 multiple-choice questions:

```json
{
  "javascript": [
    {
      "id": "javascript-1",
      "difficulty": "Easy",
      "question": "Which declaration is block-scoped and cannot be reassigned?",
      "options": ["var", "let", "const", "function"],
      "answer": 2,
      "explanation": "const is block-scoped and prevents reassignment of the binding."
    }
  ]
}
```

`answer` is the 0-based index of the correct option. A quiz flattens the selected topics' pools and picks **2 easy, 2 moderate and 1 hard** questions at random, then shuffles their order.

## Adding questions

Edit `src/data/questions.js`. Each topic has a `questions` array:

```js
{
  id: 'js-15',              // unique
  difficulty: 'Moderate',   // 'Easy' | 'Moderate' | 'Hard'
  question: 'Your question?',
  answer: `Answer text.

- supports **bold**, [[inline code]] and bullet lists
- use ~~~ fences for code blocks, e.g.

~~~js
const hello = () => console.log('hi')
~~~
`,
}
```

Everything is front-end only — no backend or API calls. Progress and theme live in the browser.
